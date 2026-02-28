"use client";

import { motion } from "framer-motion";

export default function ResumeButton() {
    return (
        <motion.a
            href="/Gummadavelli Bhanu Teja Resume.pdf"
            download="Gummadavelli Bhanu Teja Resume"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm overflow-hidden"
            style={{ fontFamily: "var(--font-heading)" }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
        >
            {/* Gradient border */}
            <span className="absolute inset-0 rounded-2xl p-[1px] bg-gradient-to-r from-[var(--accent-blue)] via-[var(--accent-indigo)] to-[var(--accent-purple)]">
                <span className="absolute inset-[1px] rounded-2xl bg-[var(--bg-primary)]" />
            </span>

            {/* Shimmer effect */}
            <span className="absolute inset-0 rounded-2xl overflow-hidden">
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </span>

            {/* Glow on hover */}
            <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]" />

            <span className="relative z-10 text-gradient">Download Resume</span>
            <span className="relative z-10 text-[var(--accent-blue)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
            </span>
        </motion.a>
    );
}
