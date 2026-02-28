"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const experiences = [
    {
        title: "Salesforce Virtual Internship",
        role: "Virtual Intern",
        period: "2024",
        description:
            "Gained hands-on experience with Salesforce platform development, including Apex programming, Lightning Web Components, and CRM customization. Completed real-world projects involving workflow automation and data management.",
        skills: ["Salesforce", "Apex", "LWC", "CRM"],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
        ),
    },
    {
        title: "Head of Design — Techkriti",
        role: "Design Lead",
        period: "2023 – 2024",
        description:
            "Led the design vertical for Techkriti, overseeing visual identity, event branding, and digital media. Managed a team of designers to create cohesive design systems and compelling visual narratives for one of the largest technical festivals.",
        skills: ["UI/UX", "Branding", "Leadership", "Design Systems"],
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
            </svg>
        ),
    },
];

export default function ExperiencePage() {
    return (
        <section className="relative z-10 section-padding pt-36 pb-20">
            <div className="max-w-4xl mx-auto px-6 md:px-8">
                <SectionHeading
                    title="Experience"
                    subtitle="Professional journey and leadership roles"
                />

                <div className="relative">
                    {/* Timeline line */}
                    <motion.div
                        initial={{ scaleY: 0 }}
                        whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px origin-top"
                        style={{ background: "var(--accent-gradient)" }}
                    />

                    {experiences.map((exp, i) => (
                        <motion.div
                            key={exp.title}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.7,
                                delay: i * 0.2,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            className={`relative flex items-start gap-10 mb-20 ${i % 2 === 0
                                ? "md:flex-row"
                                : "md:flex-row-reverse md:text-right"
                                }`}
                        >
                            {/* Timeline node */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + i * 0.2 }}
                                className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10"
                                style={{
                                    background: "var(--bg-primary)",
                                    border: "2px solid var(--accent-blue)",
                                    boxShadow: "var(--glow-blue)",
                                }}
                            >
                                <span className="text-[var(--accent-blue)]">{exp.icon}</span>
                            </motion.div>

                            {/* Content card */}
                            <div
                                className={`ml-20 md:ml-0 md:w-[calc(50%-40px)] ${i % 2 === 0 ? "" : "md:mr-0"
                                    }`}
                            >
                                <motion.div
                                    whileHover={{ y: -3 }}
                                    className="glass p-8 rounded-2xl group hover:border-[var(--accent-blue)]/20 transition-all duration-300"
                                >
                                    <div className={`flex items-center gap-3 mb-3 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                                        <span
                                            className="text-[11px] font-medium px-3 py-1 rounded-full border border-[var(--accent-blue)]/20 text-[var(--accent-blue)]"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            {exp.period}
                                        </span>
                                        <span className="text-xs text-white/30">{exp.role}</span>
                                    </div>

                                    <h3
                                        className="text-lg font-bold text-white mb-3"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {exp.title}
                                    </h3>

                                    <p className="text-sm text-white/40 leading-relaxed mb-4">
                                        {exp.description}
                                    </p>

                                    <div className={`flex flex-wrap gap-2 ${i % 2 !== 0 ? "md:justify-end" : ""}`}>
                                        {exp.skills.map((skill) => (
                                            <span
                                                key={skill}
                                                className="px-2 py-0.5 text-[10px] font-medium rounded border border-white/5 text-white/30"
                                                style={{ fontFamily: "var(--font-mono)" }}
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
