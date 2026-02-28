"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommandPaletteTrigger } from "./CommandPalette";

const navLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("#home");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const sectionEls: HTMLElement[] = [];
        navLinks.forEach(({ href }) => {
            const el = document.getElementById(href.replace("#", ""));
            if (el) sectionEls.push(el);
        });
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio > 0.1) {
                        setActiveSection(`#${entry.target.id}`);
                    }
                });
            },
            { rootMargin: "-10% 0px -40% 0px", threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
        );
        sectionEls.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const checkBottom = () => {
            const scrollBottom = window.scrollY + window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;
            if (docHeight - scrollBottom < 120) setActiveSection("#contact");
        };
        window.addEventListener("scroll", checkBottom, { passive: true });
        return () => window.removeEventListener("scroll", checkBottom);
    }, []);

    const scrollTo = useCallback((href: string) => {
        const el = document.getElementById(href.replace("#", ""));
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: "smooth" });
        } else {
            // On a sub-page — navigate to home with hash
            window.location.href = `/${href}`;
        }
        setMobileOpen(false);
    }, []);

    return (
        <>
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-4xl select-none outline-none focus:outline-none"
                style={{ WebkitTapHighlightColor: 'transparent' }}
            >
                <div
                    className={`rounded-full px-6 py-3 flex items-center justify-between transition-all duration-500 select-none outline-none
            backdrop-blur-2xl backdrop-saturate-150 border border-black/[0.06]
            ${scrolled
                            ? "bg-white/80 shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.8)]"
                            : "bg-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.05)]"
                        }`}
                    style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                    {/* Bt. Logo — premium display font */}
                    <button onClick={() => scrollTo("#home")} className="relative group flex-shrink-0 select-none outline-none focus:outline-none focus:ring-0" style={{ WebkitTapHighlightColor: 'transparent' }}>
                        <motion.span
                            className="text-2xl font-extrabold tracking-tight"
                            style={{ fontFamily: "'Syne', 'Outfit', sans-serif" }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <span className="text-gradient">Bt</span>
                            <span className="text-slate-400">.</span>
                        </motion.span>
                    </button>

                    {/* Desktop Links + Resume INLINE */}
                    <div className="hidden md:flex items-center gap-0.5">
                        {navLinks.map((link) => {
                            const isActive = activeSection === link.href;
                            return (
                                <button
                                    key={link.href}
                                    onClick={() => scrollTo(link.href)}
                                    className="relative px-3.5 py-2 text-[12px] font-medium transition-colors duration-300 cursor-pointer select-none outline-none focus:outline-none focus:ring-0"
                                    style={{ WebkitTapHighlightColor: 'transparent' }}
                                >
                                    {/* Glassmorphic pill background — slides via layoutId */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                background: "rgba(37,99,235,0.06)",
                                                backdropFilter: "blur(8px)",
                                                WebkitBackdropFilter: "blur(8px)",
                                                border: "1px solid rgba(37,99,235,0.1)",
                                            }}
                                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        />
                                    )}

                                    <span
                                        className={`relative z-10 transition-all duration-300 ${isActive
                                            ? "text-blue-600 font-semibold"
                                            : "text-slate-500 hover:text-slate-800"
                                            }`}
                                    >
                                        {link.label}
                                    </span>

                                    {/* Sleek glowing underline — slides via layoutId */}
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-underline"
                                            className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 h-[2px] w-3/5 rounded-full"
                                            style={{
                                                background: "linear-gradient(90deg, transparent 0%, var(--accent-blue) 30%, var(--accent-indigo) 70%, transparent 100%)",
                                                boxShadow: "0 0 10px 2px rgba(59,130,246,0.45), 0 2px 16px 0 rgba(99,102,241,0.25)",
                                            }}
                                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Command Palette trigger ONLY — dialog is at layout root */}
                    <CommandPaletteTrigger />

                    {/* Mobile Hamburger */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden relative w-7 h-7 flex flex-col justify-center items-center gap-1.5"
                        aria-label="Toggle menu"
                    >
                        <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block w-5 h-[1.5px] bg-slate-600 rounded-full origin-center" />
                        <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-5 h-[1.5px] bg-slate-600 rounded-full" />
                        <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block w-5 h-[1.5px] bg-slate-600 rounded-full origin-center" />
                    </button>
                </div>
            </motion.nav>

            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-40 pt-24 px-8 bg-white/95 backdrop-blur-2xl md:hidden"
                    >
                        <div className="flex flex-col gap-3">
                            {navLinks.map((link, i) => (
                                <motion.div key={link.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}>
                                    <button
                                        onClick={() => scrollTo(link.href)}
                                        className={`block w-full text-left px-5 py-4 text-lg font-medium rounded-xl transition-colors ${activeSection === link.href ? "text-blue-600 bg-blue-50" : "text-slate-400 hover:text-slate-700"
                                            }`}
                                    >
                                        {link.label}
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
