"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import SocialLinks from "@/components/ui/SocialLinks";

export default function ContactPage() {
    return (
        <section className="relative z-10 section-padding pt-36 pb-20">
            <div className="max-w-3xl mx-auto text-center px-6 md:px-8">
                <SectionHeading
                    title="Reach Out"
                    subtitle="Got a project in mind? Let's build something incredible together."
                />

                {/* Main CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-20"
                >
                    <motion.a
                        href="mailto:bhanutejagummadevelli@gmail.com"
                        className="group relative inline-flex items-center gap-5 px-12 py-6 rounded-2xl font-semibold text-lg overflow-hidden"
                        style={{ fontFamily: "var(--font-heading)" }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        {/* Animated gradient border */}
                        <span className="absolute inset-0 rounded-2xl p-[2px]" style={{ background: "var(--accent-gradient)" }}>
                            <span className="absolute inset-[2px] rounded-2xl bg-[var(--bg-primary)]" />
                        </span>

                        {/* Shimmer */}
                        <span className="absolute inset-0 rounded-2xl overflow-hidden">
                            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                        </span>

                        {/* Glow */}
                        <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_40px_rgba(59,130,246,0.2)]" />

                        <span className="relative z-10 text-gradient">Say Hello</span>
                        <span className="relative z-10 text-[var(--accent-blue)] text-2xl">
                            →
                        </span>
                    </motion.a>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="mt-6 text-sm text-white/25"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        bhanutejagummadevelli@gmail.com
                    </motion.p>
                </motion.div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    className="w-24 h-px mx-auto mb-16"
                    style={{ background: "var(--accent-gradient)" }}
                />

                {/* Social Links */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="flex flex-col items-center gap-6"
                >
                    <p className="text-sm text-white/30">Find me on</p>
                    <SocialLinks />
                </motion.div>

                {/* Ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[var(--accent-blue)] opacity-[0.02] blur-[100px] pointer-events-none" />
            </div>
        </section>
    );
}
