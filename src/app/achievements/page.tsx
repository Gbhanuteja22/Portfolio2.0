"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ParticleBackground from "@/components/effects/ParticleBackground";

/* ── Experience Data ── */
const experiences = [
    {
        role: "IT Intern (TOC)",
        company: "Johnson Controls India Pvt. Ltd.",
        active: true,
        impact: [
            "Actively contributing to the Technical Operations Center, streamlining infrastructure, and optimizing enterprise-level technical workflows.",
        ],
    },
    {
        role: "Enterprise CRM Developer (Virtual Intern)",
        company: "Salesforce",
        active: false,
        impact: [
            "Architected 10+ scalable workflows leveraging Apex, Lightning Components, and Flow for complex enterprise CRM environments.",
            "Engineered automation for critical lifecycle tasks, significantly reducing manual overhead and boosting record-handling efficiency.",
            "Collaborated within cross-functional pods to deploy enterprise-ready solutions and master large-scale system design.",
        ],
    },
];

/* ── Education Data ── */
const education = [
    {
        degree: "Bachelor of Technology (B.Tech)",
        institution: "Mahatma Gandhi Institute of Technology (MGIT)",
        metrics: "8.93/10 CGPA",
        focus:
            "Cultivated a strong foundation in computer science, algorithms, and scalable software engineering.",
    },
    {
        degree: "Pre-University (Intermediate)",
        institution: "Narayana Junior College",
        metrics: "94.5%",
        focus:
            "Specialized in mathematics and physical sciences, building the analytical groundwork for engineering.",
    },
    {
        degree: "Secondary School Certificate (SSC)",
        institution: "Geethanjali Digi School",
        metrics: "10/10 GPA",
        focus:
            "Built a strong academic foundation with a consistent track record of excellence.",
    },
];

/* ── Achievements Data — with JSX-ready highlighted titles ── */
const achievements = [
    {
        highlight: "Silver Medalist",
        title: "Academic Silver Medalist",
        description:
            "Recognized for graduating among the top tier of the engineering cohort, reflecting sustained academic excellence.",
    },
    {
        highlight: "Head of Design",
        title: "Head of Design, Techkriti 2024",
        description:
            "Spearheaded the UI/UX strategy and visual branding for the institution's premier technical festival.",
    },
    {
        highlight: "UI/UX Designer",
        title: "UI/UX Designer, Adobe Club",
        description:
            "Dedicated 4 years to advancing campus design culture; successfully organized and hosted comprehensive UI/UX workshops for students.",
    },
    {
        highlight: "Diamond Coder",
        title: "Certified Diamond Coder",
        description:
            "Validated competitive programming and advanced algorithmic problem-solving skills through Smart Interviews.",
    },
    {
        highlight: "1st Place",
        title: "1st Place, District Quiz Competition",
        description:
            "Clinched first place in a highly competitive district-level general knowledge and aptitude competition.",
    },
    {
        highlight: "2nd Place",
        title: "2nd Place, Ramanujan Talent Test",
        description:
            "Secured second place at the district-level mathematics talent test, showcasing strong foundational quantitative skills.",
    },
];

/* ── Fade-up animation variant ── */
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            delay: i * 0.08,
            ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
    }),
};

/* ── Scroll-linked spring card animation ── */
const cardSpring = {
    hidden: { opacity: 0, y: 60, scale: 0.96 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            type: "spring" as const,
            damping: 20,
            stiffness: 120,
            delay: i * 0.12,
        },
    }),
};

/* ── Helper: highlight key phrases in the title ── */
function HighlightedTitle({ title, highlight }: { title: string; highlight: string }) {
    const idx = title.indexOf(highlight);
    if (idx === -1) return <>{title}</>;
    const before = title.slice(0, idx);
    const after = title.slice(idx + highlight.length);
    return (
        <>
            {before}
            <span className="font-semibold text-blue-600">
                {highlight}
            </span>
            {after}
        </>
    );
}

export default function AchievementsPage() {
    return (
        <>
            <ParticleBackground />

            {/* ── Hero Header ── */}
            <section className="relative z-10 pt-32 pb-12 px-8 sm:px-12 md:px-20 lg:px-28">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-[13px] text-slate-400 hover:text-slate-700 transition-colors mb-8 cursor-pointer"
                            style={{ fontFamily: "var(--font-mono)" }}
                        >
                            <span>←</span> Back to Home
                        </Link>
                        <h1
                            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-4"
                            style={{ fontFamily: "var(--font-heading)" }}
                        >
                            <span className="text-slate-800">My </span>
                            <span className="text-gradient">Journey</span>
                        </h1>
                        <p className="text-[15px] text-slate-400 max-w-xl leading-relaxed">
                            Experience, education, and milestones that have shaped my path as
                            a developer and designer.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════
          EXPERIENCE — Vertical Timeline
      ════════════════════════════════════════════════ */}
            <section className="relative z-10 px-8 sm:px-12 md:px-20 lg:px-28 pb-28">
                <div className="max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl font-bold mb-14"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        <span className="text-gradient">Experience</span>
                    </motion.h2>

                    <div className="relative">
                        {/* Timeline spine */}
                        <div className="absolute left-[11px] md:left-[15px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[var(--accent-blue)] via-[var(--accent-indigo)] to-transparent opacity-25" />

                        <div className="space-y-10">
                            {experiences.map((exp, i) => (
                                <motion.div
                                    key={exp.role}
                                    custom={i}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    variants={fadeUp}
                                    className="relative pl-10 md:pl-14"
                                >
                                    {/* Dot */}
                                    <span
                                        className="absolute left-0 md:left-1 top-2 w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center"
                                        style={{
                                            borderColor: exp.active
                                                ? "var(--accent-blue)"
                                                : "rgba(255,255,255,0.12)",
                                            background: "var(--bg-primary)",
                                        }}
                                    >
                                        <span
                                            className="block w-2.5 h-2.5 rounded-full"
                                            style={{
                                                background: exp.active
                                                    ? "var(--accent-gradient)"
                                                    : "rgba(255,255,255,0.15)",
                                                boxShadow: exp.active
                                                    ? "0 0 10px rgba(59,130,246,0.5)"
                                                    : "none",
                                            }}
                                        />
                                    </span>

                                    {/* Card */}
                                    <div
                                        className="rounded-2xl p-6 md:p-8 border border-black/[0.06] hover:border-blue-200 transition-all duration-300"
                                        style={{
                                            backgroundColor: "white",
                                            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                        }}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                                            <div>
                                                <h3
                                                    className="text-[17px] font-semibold text-slate-800"
                                                    style={{ fontFamily: "var(--font-heading)" }}
                                                >
                                                    {exp.role}
                                                </h3>
                                                <p
                                                    className="text-[14px] text-gradient font-bold mt-1"
                                                    style={{ fontFamily: "var(--font-heading)" }}
                                                >
                                                    {exp.company}
                                                </p>
                                            </div>
                                            {exp.active && (
                                                <span
                                                    className="flex-shrink-0 self-start text-[11px] px-3 py-1 rounded-full border border-[var(--accent-blue)]/30 text-[var(--accent-blue)] bg-[var(--accent-blue)]/[0.08]"
                                                    style={{ fontFamily: "var(--font-mono)" }}
                                                >
                                                    Active
                                                </span>
                                            )}
                                        </div>

                                        <ul className="space-y-2">
                                            {exp.impact.map((line) => (
                                                <li
                                                    key={line}
                                                    className="text-[13px] text-slate-400 leading-relaxed flex items-start gap-2 text-justify md:text-left"
                                                >
                                                    <span className="text-[var(--accent-blue)] mt-0.5 text-[10px]">
                                                        ▸
                                                    </span>
                                                    {line}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════
          EDUCATION — Stacked Minimal Text Cards
      ════════════════════════════════════════════════ */}
            <section className="relative z-10 px-8 sm:px-12 md:px-20 lg:px-28 pb-28">
                <div className="max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl font-bold mb-14"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        <span className="text-gradient">Education</span>
                    </motion.h2>

                    <div className="space-y-5">
                        {education.map((edu, i) => (
                            <motion.div
                                key={edu.degree}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeUp}
                                className="rounded-2xl p-6 md:p-8 border border-black/[0.06] hover:border-blue-200 transition-all duration-300"
                                style={{
                                    backgroundColor: "white",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                }}
                            >
                                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-3">
                                    <div>
                                        <h3
                                            className="text-[17px] font-semibold text-slate-800"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            {edu.degree}
                                        </h3>
                                        <p
                                            className="text-[13px] text-slate-400 mt-1"
                                            style={{ fontFamily: "var(--font-mono)" }}
                                        >
                                            {edu.institution}
                                        </p>
                                    </div>
                                    <span className="flex-shrink-0 self-start text-[12px] font-semibold text-gradient">
                                        {edu.metrics}
                                    </span>
                                </div>
                                <p className="text-[13px] text-slate-400 leading-relaxed">
                                    {edu.focus}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════════════════
          ACHIEVEMENTS — Scroll-Linked Spring Cards
      ════════════════════════════════════════════════ */}
            <section className="relative z-10 px-8 sm:px-12 md:px-20 lg:px-28 pb-28">
                <div className="max-w-5xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl md:text-3xl font-bold mb-14"
                        style={{ fontFamily: "var(--font-heading)" }}
                    >
                        <span className="text-gradient">Achievements</span>
                    </motion.h2>

                    <div className="flex flex-col gap-5">
                        {achievements.map((ach, i) => (
                            <motion.div
                                key={ach.title}
                                custom={i}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={cardSpring}
                                className="group rounded-2xl p-6 md:p-8 border border-black/[0.06] hover:border-blue-200 transition-all duration-300 overflow-hidden relative"
                                style={{
                                    background: "white",
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                                }}
                            >
                                {/* Accent glow on hover */}
                                <div
                                    className="absolute -top-8 -left-8 w-28 h-28 rounded-full opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500"
                                    style={{
                                        background: "var(--accent-blue)",
                                        filter: "blur(30px)",
                                    }}
                                />

                                <div className="flex items-start gap-4">
                                    {/* Number badge */}
                                    <span
                                        className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full border border-black/[0.06] text-slate-300 mt-0.5"
                                        style={{ fontFamily: "var(--font-mono)" }}
                                    >
                                        0{i + 1}
                                    </span>

                                    <div className="flex-1">
                                        <h3
                                            className="text-[16px] font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors"
                                            style={{ fontFamily: "var(--font-heading)" }}
                                        >
                                            <HighlightedTitle
                                                title={ach.title}
                                                highlight={ach.highlight}
                                            />
                                        </h3>
                                        <p className="text-[13px] text-slate-400 leading-relaxed group-hover:text-slate-500 transition-colors text-justify md:text-left">
                                            {ach.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Accent bottom line on hover */}
                                <div
                                    className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background:
                                            "linear-gradient(90deg, transparent 0%, var(--accent-blue) 30%, var(--accent-indigo) 70%, transparent 100%)",
                                    }}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
