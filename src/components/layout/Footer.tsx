"use client";

import { motion } from "framer-motion";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { HiOutlineMail } from "react-icons/hi";

const quickLinks = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
];

const socials = [
    { icon: <SiLinkedin />, href: "https://www.linkedin.com/in/bhanuteja-gummadevelli/", label: "LinkedIn" },
    { icon: <SiGithub />, href: "https://github.com/Gbhanuteja22", label: "GitHub" },
    { icon: <HiOutlineMail />, href: "mailto:bhanutejagummadevelli@gmail.com", label: "Email" },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="relative z-10 border-t border-white/[0.06] bg-black">
            <div className="max-w-6xl mx-auto px-8 sm:px-12 md:px-20 lg:px-28 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">

                    {/* Left — Name + Role + Socials */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h3
                            className="text-lg font-bold tracking-wide mb-1"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            <span className="text-white">BHANU TEJA </span>
                            <span className="text-gradient">GUMMADAVELLI</span>
                        </h3>
                        <p className="text-[13px] text-white/40 mb-3" style={{ fontFamily: "var(--font-mono)" }}>
                            Developer &amp; Designer
                        </p>
                        <div className="flex items-center gap-3">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    className="w-9 h-9 rounded-full border border-white/[0.1] bg-white/[0.05] flex items-center justify-center
                    text-white/40 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-200"
                                >
                                    <span className="text-sm">{s.icon}</span>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Middle — Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h4 className="text-sm font-semibold text-white/70 mb-5" style={{ fontFamily: "var(--font-heading)" }}>
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-[13px] text-white/40 hover:text-blue-600 transition-colors"
                                        style={{ fontFamily: "var(--font-mono)" }}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Right — Connect */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h4 className="text-sm font-semibold text-white/70 mb-5" style={{ fontFamily: "var(--font-heading)" }}>
                            Connect
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <a
                                    href="mailto:bhanutejagummadevelli@gmail.com"
                                    className="text-[13px] text-white/40 hover:text-blue-600 transition-colors"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    bhanutejagummadevelli@gmail.com
                                </a>
                            </div>
                            <button
                                onClick={scrollToTop}
                                className="flex items-center gap-1.5 text-[13px] text-white/40 hover:text-slate-700 transition-colors group cursor-pointer"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                <span className="group-hover:-translate-y-0.5 transition-transform">↑</span>
                                Back to top
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom divider + copyright */}
                <div className="mt-6 pt-4 border-t border-white/[0.06] text-center">
                    <p className="text-[11px] text-white/25" style={{ fontFamily: "var(--font-mono)" }}>
                        © 2026 Bhanu Teja Gummadavelli. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
