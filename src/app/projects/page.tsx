"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";

const projects = [
    {
        title: "GestureArt",
        description:
            "An innovative gesture-based art creation tool that transforms hand movements into digital artwork using computer vision and machine learning.",
        tags: ["Computer Vision", "ML", "Interactive"],
        color: "from-emerald-500/20 to-teal-500/20",
        border: "hover:border-emerald-500/30",
        icon: "🎨",
    },
    {
        title: "GeminiLens",
        description:
            "AI-powered visual analysis application leveraging Google's Gemini API for intelligent image understanding and real-time insights.",
        tags: ["AI", "Gemini API", "Vision"],
        color: "from-blue-500/20 to-cyan-500/20",
        border: "hover:border-blue-500/30",
        icon: "🔍",
    },
    {
        title: "Placement Management System",
        description:
            "A comprehensive full-stack platform streamlining campus placement processes with real-time tracking, analytics, and automated workflows.",
        tags: ["Full Stack", "Dashboard", "Analytics"],
        color: "from-purple-500/20 to-pink-500/20",
        border: "hover:border-purple-500/30",
        icon: "📊",
    },
    {
        title: "MyChem Lab",
        description:
            "Interactive virtual chemistry laboratory enabling students to perform experiments safely with realistic simulations and educational guidance.",
        tags: ["EdTech", "Simulation", "3D"],
        color: "from-amber-500/20 to-orange-500/20",
        border: "hover:border-amber-500/30",
        icon: "⚗️",
    },
];

export default function ProjectsPage() {
    return (
        <section className="relative z-10 section-padding pt-36 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-8">
                <SectionHeading
                    title="Projects"
                    subtitle="A collection of work that pushes the boundaries of what's possible"
                />

                <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.1,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                        >
                            <motion.div
                                whileHover={{ y: -4, scale: 1.01 }}
                                transition={{ duration: 0.3 }}
                                className={`group relative p-10 rounded-2xl border border-gray-200 ${project.border} transition-all duration-500 overflow-hidden h-full bg-white shadow-sm`}
                            >
                                {/* Gradient overlay */}
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                />

                                {/* Content */}
                                <div className="relative z-10">
                                    <div className="flex items-start justify-between mb-8">
                                        <span className="text-3xl">{project.icon}</span>
                                        <motion.div
                                            className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-300 group-hover:text-[var(--accent-blue)] group-hover:border-[var(--accent-blue)]/30 transition-all duration-300"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <line x1="7" y1="17" x2="17" y2="7" />
                                                <polyline points="7 7 17 7 17 17" />
                                            </svg>
                                        </motion.div>
                                    </div>

                                    <h3
                                        className="text-xl font-bold text-slate-800 mb-3 group-hover:text-gradient transition-all"
                                        style={{ fontFamily: "var(--font-heading)" }}
                                    >
                                        {project.title}
                                    </h3>

                                    <p className="text-sm text-slate-400 leading-relaxed mb-8">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 text-[11px] font-medium rounded-full border border-gray-200 text-slate-400 group-hover:border-[var(--accent-blue)]/20 group-hover:text-slate-600 transition-all"
                                                style={{ fontFamily: "var(--font-mono)" }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Corner glow */}
                                <div className="absolute -bottom-12 -right-12 w-32 h-32 rounded-full bg-[var(--accent-blue)] opacity-0 group-hover:opacity-5 blur-3xl transition-opacity duration-500" />
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
