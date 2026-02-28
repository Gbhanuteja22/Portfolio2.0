"use client";

import { useState, useEffect, useCallback, createContext, useContext } from "react";
import {
    CommandDialog,
    CommandInput,
    CommandList,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandShortcut,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Home,
    User,
    FolderOpen,
    Wrench,
    Mail,
    Award,
    FileDown,
    ExternalLink,
} from "lucide-react";

/* ── Global open/close context ── */
const CommandPaletteContext = createContext<{
    open: boolean;
    setOpen: (v: boolean) => void;
}>({ open: false, setOpen: () => { } });

export function useCommandPalette() {
    return useContext(CommandPaletteContext);
}

/* ── Provider — mount this ONCE at layout level ── */
export function CommandPaletteProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    return (
        <CommandPaletteContext.Provider value={{ open, setOpen }}>
            {children}
        </CommandPaletteContext.Provider>
    );
}

/* ── Trigger Button — lives inside Navbar ── */
export function CommandPaletteTrigger() {
    const { setOpen } = useCommandPalette();
    return (
        <div className="hidden lg:block">
            <button
                type="button"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true); }}
                onMouseDown={(e) => e.preventDefault()}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[11px] text-slate-400 hover:text-slate-700
                    bg-white border border-gray-200 hover:border-gray-300 transition-all cursor-pointer
                    select-none outline-none focus:outline-none focus:ring-0 active:bg-white"
                style={{ fontFamily: "var(--font-mono)", WebkitTapHighlightColor: 'transparent' }}
            >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
                <span>Search</span>
                <kbd className="ml-1 px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-[10px] text-gray-400">
                    ⌘K
                </kbd>
            </button>
        </div>
    );
}

/* ── Dialog — rendered OUTSIDE the Navbar, at layout root ── */
const navSections = [
    { label: "Home", icon: Home, href: "/#home" },
    { label: "About", icon: User, href: "/#about" },
    { label: "Projects", icon: FolderOpen, href: "/#projects" },
    { label: "Technical Arsenal", icon: Wrench, href: "/#skills" },
    { label: "Contact", icon: Mail, href: "/#contact" },
];

const pages = [
    { label: "Experience & Achievements", icon: Award, href: "/achievements" },
];

const actions = [
    { label: "Download Resume", icon: FileDown, action: "resume" },
    { label: "Open GitHub", icon: ExternalLink, action: "github" },
    { label: "Open LinkedIn", icon: ExternalLink, action: "linkedin" },
];

export function CommandPaletteDialog() {
    const { open, setOpen } = useCommandPalette();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setOpen(!open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, [open, setOpen]);

    const navigate = useCallback(
        (href: string) => {
            setOpen(false);
            if (href.startsWith("/#")) {
                const id = href.replace("/#", "");
                if (window.location.pathname === "/") {
                    const el = document.getElementById(id);
                    if (el) {
                        setTimeout(() => {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 100);
                        return;
                    }
                }
                window.location.href = href;
            } else {
                window.location.href = href;
            }
        },
        [setOpen]
    );

    const handleAction = useCallback(
        (action: string) => {
            setOpen(false);
            switch (action) {
                case "resume": {
                    const a = document.createElement("a");
                    a.href = "/Gummadavelli Bhanu Teja Resume.pdf";
                    a.download = "Gummadavelli Bhanu Teja Resume";
                    a.click();
                    break;
                }
                case "github":
                    window.open("https://github.com/Gbhanuteja22", "_blank");
                    break;
                case "linkedin":
                    window.open("https://www.linkedin.com/in/bhanuteja-gummadevelli/", "_blank");
                    break;
            }
        },
        [setOpen]
    );

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Where would you like to go?" />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>

                <CommandGroup heading="Navigation">
                    {navSections.map((item) => (
                        <CommandItem key={item.href} value={item.label} onSelect={() => navigate(item.href)}>
                            <item.icon className="mr-3 h-4 w-4 text-gray-400" />
                            <span>{item.label}</span>
                            <CommandShortcut>section</CommandShortcut>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Pages">
                    {pages.map((item) => (
                        <CommandItem key={item.href} value={item.label} onSelect={() => navigate(item.href)}>
                            <item.icon className="mr-3 h-4 w-4 text-gray-400" />
                            <span>{item.label}</span>
                            <CommandShortcut>page</CommandShortcut>
                        </CommandItem>
                    ))}
                </CommandGroup>

                <CommandSeparator />

                <CommandGroup heading="Actions">
                    {actions.map((item) => (
                        <CommandItem key={item.action} value={item.label} onSelect={() => handleAction(item.action)}>
                            <item.icon className="mr-3 h-4 w-4 text-gray-400" />
                            <span>{item.label}</span>
                            <CommandShortcut>action</CommandShortcut>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}

/* ── Default export kept for backward compat — but this is now empty ── */
export default function CommandPalette() {
    return null;
}
