"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent } from "./dialog";
import { Search, Loader2 } from "lucide-react";

/* ── Context ── */
interface CommandContextType {
    inputValue: string;
    onInputChange: (value: string) => void;
    selectedIndex: number;
    setSelectedIndex: (i: number) => void;
    items: { id: string; onSelect?: () => void }[];
    registerItem: (id: string, onSelect?: () => void) => void;
    unregisterItem: (id: string) => void;
    executeSelected: () => void;
}

const CommandContext = React.createContext<CommandContextType | undefined>(undefined);

function useCommand() {
    const ctx = React.useContext(CommandContext);
    if (!ctx) throw new Error("useCommand must be used within a Command component");
    return ctx;
}

/* ── Command Root ── */
interface CommandProps extends React.HTMLAttributes<HTMLDivElement> { }

const Command = React.forwardRef<HTMLDivElement, CommandProps>(
    ({ className, children, ...props }, ref) => {
        const [inputValue, setInputValue] = React.useState("");
        const [selectedIndex, setSelectedIndex] = React.useState(0);
        const itemsRef = React.useRef<{ id: string; onSelect?: () => void }[]>([]);
        const [, forceRender] = React.useState(0);

        const registerItem = React.useCallback((id: string, onSelect?: () => void) => {
            itemsRef.current = [...itemsRef.current.filter((i) => i.id !== id), { id, onSelect }];
            forceRender((n) => n + 1);
        }, []);

        const unregisterItem = React.useCallback((id: string) => {
            itemsRef.current = itemsRef.current.filter((i) => i.id !== id);
            forceRender((n) => n + 1);
        }, []);

        const executeSelected = React.useCallback(() => {
            const item = itemsRef.current[selectedIndex];
            if (item?.onSelect) item.onSelect();
        }, [selectedIndex]);

        // Reset selected index when input changes
        React.useEffect(() => {
            setSelectedIndex(0);
        }, [inputValue]);

        return (
            <CommandContext.Provider
                value={{
                    inputValue,
                    onInputChange: setInputValue,
                    selectedIndex,
                    setSelectedIndex,
                    items: itemsRef.current,
                    registerItem,
                    unregisterItem,
                    executeSelected,
                }}
            >
                <div
                    ref={ref}
                    className={cn(
                        "flex h-full w-full flex-col overflow-hidden rounded-xl bg-white text-gray-900 border border-gray-200 shadow-xl",
                        className
                    )}
                    {...props}
                >
                    {children}
                </div>
            </CommandContext.Provider>
        );
    }
);
Command.displayName = "Command";

/* ── CommandDialog ── */
interface CommandDialogProps {
    children: React.ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    className?: string;
}

const CommandDialog: React.FC<CommandDialogProps> = ({ children, open, onOpenChange, className }) => {
    React.useEffect(() => {
        if (!open) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                onOpenChange?.(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onOpenChange]);

    return (
        <>
            {open && (
                <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm" aria-hidden="true" />
            )}
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent
                    className={cn(
                        "overflow-hidden p-0 shadow-2xl border-gray-200 bg-white backdrop-blur-xl max-w-2xl z-[70]",
                        className
                    )}
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                >
                    <Command>{children}</Command>
                </DialogContent>
            </Dialog>
        </>
    );
};

/* ── CommandInput ── */
interface CommandInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onValueChange?: (value: string) => void;
}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
    ({ className, onValueChange, ...props }, ref) => {
        const { inputValue, onInputChange, selectedIndex, setSelectedIndex, items, executeSelected } =
            useCommand();
        const internalRef = React.useRef<HTMLInputElement>(null);
        const inputRef = (ref as React.RefObject<HTMLInputElement>) || internalRef;

        // Auto-focus on mount
        React.useEffect(() => {
            const timer = setTimeout(() => {
                if (inputRef && "current" in inputRef) {
                    inputRef.current?.focus();
                }
            }, 50);
            return () => clearTimeout(timer);
        }, [inputRef]);

        const handleChange = React.useCallback(
            (e: React.ChangeEvent<HTMLInputElement>) => {
                const v = e.target.value;
                if (onValueChange) onValueChange(v);
                else onInputChange(v);
            },
            [onValueChange, onInputChange]
        );

        const handleKeyDown = React.useCallback(
            (e: React.KeyboardEvent<HTMLInputElement>) => {
                const count = items.length;
                if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setSelectedIndex(count > 0 ? (selectedIndex + 1) % count : 0);
                } else if (e.key === "ArrowUp") {
                    e.preventDefault();
                    setSelectedIndex(count > 0 ? (selectedIndex - 1 + count) % count : 0);
                } else if (e.key === "Enter") {
                    e.preventDefault();
                    executeSelected();
                }
            },
            [items.length, selectedIndex, setSelectedIndex, executeSelected]
        );

        return (
            <div className="flex items-center border-b border-gray-200 px-4">
                <Search className="mr-3 h-4 w-4 shrink-0 text-gray-400" />
                <input
                    ref={inputRef}
                    value={props.value !== undefined ? props.value : inputValue}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    className={cn(
                        "flex h-12 w-full rounded-md bg-transparent py-3 text-sm text-gray-900 border-none focus:border-none focus:ring-0 focus:outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    placeholder={props.placeholder || "Type to search..."}
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck={false}
                    {...props}
                />
            </div>
        );
    }
);
CommandInput.displayName = "CommandInput";

/* ── CommandList ── */
const CommandList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div
            ref={ref}
            className={cn("max-h-[320px] overflow-y-auto overflow-x-hidden py-1", className)}
            {...props}
        />
    )
);
CommandList.displayName = "CommandList";

/* ── CommandEmpty ── */
const CommandEmpty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    (props, ref) => {
        const { inputValue, items } = useCommand();

        // Only show "No results" when user has typed something AND no items are visible
        const hasVisibleItems = React.useMemo(() => {
            if (!inputValue) return true;
            return items.some((item) =>
                item.id.toLowerCase().includes(inputValue.toLowerCase())
            );
        }, [inputValue, items]);

        if (!inputValue || hasVisibleItems) return null;

        return (
            <div ref={ref} className="py-6 text-center text-sm text-gray-400" {...props}>
                {props.children || "No results found."}
            </div>
        );
    }
);
CommandEmpty.displayName = "CommandEmpty";

/* ── CommandGroup ── */
interface CommandGroupProps extends React.HTMLAttributes<HTMLDivElement> {
    heading?: string;
}

const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
    ({ className, heading, children, ...props }, ref) => {
        const { inputValue } = useCommand();

        // Filter children based on inputValue — match against data-value or text content
        const filteredChildren = React.useMemo(() => {
            if (!inputValue) return children;
            return React.Children.toArray(children).filter((child) => {
                if (!React.isValidElement(child)) return true;
                const childProps = child.props as { "data-filter-value"?: string; value?: string; children?: React.ReactNode };
                const filterValue = childProps["data-filter-value"] || childProps.value || "";
                return filterValue.toLowerCase().includes(inputValue.toLowerCase());
            });
        }, [children, inputValue]);

        const hasVisible = React.Children.count(filteredChildren) > 0;

        if (!hasVisible) return null;

        return (
            <div ref={ref} className={cn("overflow-hidden p-1 text-gray-900", className)} {...props}>
                {heading && (
                    <div
                        className="px-3 py-2 text-[11px] font-medium text-gray-400 uppercase tracking-wider"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        {heading}
                    </div>
                )}
                {filteredChildren}
            </div>
        );
    }
);
CommandGroup.displayName = "CommandGroup";

/* ── CommandSeparator ── */
const CommandSeparator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn("-mx-1 h-px bg-gray-200", className)} {...props} />
    )
);
CommandSeparator.displayName = "CommandSeparator";

/* ── CommandItem ── */
interface CommandItemProps extends React.HTMLAttributes<HTMLDivElement> {
    disabled?: boolean;
    onSelect?: () => void;
    value?: string;
}

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
    ({ className, disabled, onSelect, value, children, ...props }, ref) => {
        const { registerItem, unregisterItem, selectedIndex, setSelectedIndex, items, inputValue } = useCommand();
        const idRef = React.useRef(value || Math.random().toString(36).slice(2));

        React.useEffect(() => {
            registerItem(idRef.current, onSelect);
            return () => unregisterItem(idRef.current);
        }, [onSelect, registerItem, unregisterItem]);

        // Filter: hide if inputValue doesn't match the value
        const isHidden = React.useMemo(() => {
            if (!inputValue || !value) return false;
            return !value.toLowerCase().includes(inputValue.toLowerCase());
        }, [inputValue, value]);

        const myIndex = items.findIndex((i) => i.id === idRef.current);
        const isSelected = myIndex === selectedIndex;

        if (isHidden) return null;

        return (
            <div
                ref={ref}
                className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm outline-none transition-colors text-gray-600",
                    isSelected && "bg-blue-50 text-blue-700",
                    !isSelected && "hover:bg-gray-50",
                    disabled && "pointer-events-none opacity-40",
                    className
                )}
                data-disabled={disabled ? "true" : undefined}
                data-value={value}
                data-filter-value={value}
                data-selected={isSelected ? "true" : undefined}
                onClick={() => !disabled && onSelect?.()}
                onMouseEnter={() => {
                    if (myIndex >= 0) {
                        setSelectedIndex(myIndex);
                    }
                }}
                {...props}
            >
                {children}
            </div>
        );
    }
);
CommandItem.displayName = "CommandItem";

/* ── CommandShortcut ── */
const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span
        className={cn("ml-auto text-[11px] tracking-widest text-gray-300", className)}
        style={{ fontFamily: "var(--font-mono)" }}
        {...props}
    />
);
CommandShortcut.displayName = "CommandShortcut";

export {
    Command,
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
};
