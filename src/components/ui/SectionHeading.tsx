"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center";
}

export default function SectionHeading({
    title,
    subtitle,
    align = "center",
}: SectionHeadingProps) {
    return (
        <div className={`mb-20 ${align === "center" ? "text-center" : "text-left"}`}>
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold"
                style={{ fontFamily: "var(--font-heading)" }}
            >
                <span className="text-gradient">{title}</span>
            </motion.h2>
            {subtitle && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 text-lg text-slate-400 max-w-xl mx-auto"
                    style={{ fontFamily: "var(--font-body)" }}
                >
                    {subtitle}
                </motion.p>
            )}
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`mt-6 h-[2px] w-24 rounded-full origin-left ${align === "center" ? "mx-auto" : ""
                    }`}
                style={{ background: "var(--accent-gradient)" }}
            />
        </div>
    );
}
