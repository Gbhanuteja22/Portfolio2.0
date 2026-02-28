"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ─── Dialog (minimal, for command palette only) ─── */
interface DialogProps {
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    children?: React.ReactNode;
}

const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-[70] flex items-start justify-center pt-[20vh]"
            onClick={() => onOpenChange?.(false)}
        >
            {children}
        </div>
    );
};

interface DialogContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "relative w-full rounded-xl border shadow-2xl animate-in fade-in-0 zoom-in-95",
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);
DialogContent.displayName = "DialogContent";

export { Dialog, DialogContent };
