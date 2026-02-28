"use client";

import { CommandPaletteProvider, CommandPaletteDialog } from "@/components/layout/CommandPalette";

/**
 * Client wrapper that provides the Command Palette context + dialog
 * at the root level, completely decoupled from the Navbar DOM tree.
 */
export default function CommandPaletteRoot({ children }: { children: React.ReactNode }) {
    return (
        <CommandPaletteProvider>
            {children}
            {/* Dialog renders here — OUTSIDE the Navbar, at layout body level */}
            <CommandPaletteDialog />
        </CommandPaletteProvider>
    );
}
