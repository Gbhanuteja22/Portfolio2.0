/* eslint-disable @next/next/no-img-element */
"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef } from "react";

interface SkillPill {
    label: string;
    logo: string;
    color: string;
}

interface ToolboxCard {
    title: string;
    logo: string;
    logoColor: string;
    gradient: string;
    borderGlow: string;
    skills: SkillPill[];
}

const cards: ToolboxCard[] = [
    {
        title: "Intelligence & Data Systems",
        logo: "/logos/ai.svg",
        logoColor: "brightness(0) saturate(100%) invert(45%) sepia(90%) saturate(1500%) hue-rotate(220deg)",
        gradient: "linear-gradient(135deg, rgba(99,102,241,0.10) 0%, rgba(139,92,246,0.05) 100%)",
        borderGlow: "rgba(99,102,241,0.35)",
        skills: [
            { label: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg", color: "#FF6F00" },
            { label: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original-wordmark.svg", color: "#5C3D6E" },
            { label: "MediaPipe", logo: "https://logo.svgcdn.com/simple-icons/mediapipe-dark.svg", color: "#0097A7" },
            { label: "Pandas", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/pandas/pandas-original-wordmark.svg", color: "#150458" },
            { label: "Scikit-learn", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg", color: "#F7931E" },
            { label: "Matplotlib", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matplotlib/matplotlib-original-wordmark.svg", color: "#11557C" },
            { label: "Streamlit", logo: "https://cdn.simpleicons.org/streamlit/FF4B4B", color: "#FF4B4B" },
        ],
    },
    {
        title: "Full-Stack Architecture",
        logo: "/logos/react.svg",
        logoColor: "brightness(0) saturate(100%) invert(60%) sepia(80%) saturate(2000%) hue-rotate(175deg)",
        gradient: "linear-gradient(135deg, rgba(59,130,246,0.10) 0%, rgba(99,102,241,0.05) 100%)",
        borderGlow: "rgba(59,130,246,0.35)",
        skills: [
            { label: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", color: "#61DAFB" },
            { label: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", color: "#339933" },
            { label: "Express.js", logo: "/logos/express.svg", color: "#ffffff" },
            { label: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original-wordmark.svg", color: "#47A248" },
            { label: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg", color: "#E34F26" },
            { label: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg", color: "#F7DF1E" },
        ],
    },
    {
        title: "Systems & Infrastructure",
        logo: "__INLINE_SERVER_SVG__",
        logoColor: "",
        gradient: "linear-gradient(135deg, rgba(16,185,129,0.10) 0%, rgba(52,211,153,0.05) 100%)",
        borderGlow: "rgba(16,185,129,0.35)",
        skills: [
            { label: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg", color: "#3776AB" },
            { label: "Java", logo: "/logos/java.svg", color: "#ED8B00" },
            { label: "SQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg", color: "#4479A1" },
            { label: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg", color: "#0089D6" },
            { label: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", color: "#FF9900" },
            { label: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg", color: "#FCC624" },
            { label: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", color: "#2496ED" },
        ],
    },
    {
        title: "Creative Prototyping",
        logo: "/logos/design.svg",
        logoColor: "brightness(0) saturate(100%) invert(50%) sepia(90%) saturate(2000%) hue-rotate(320deg)",
        gradient: "linear-gradient(135deg, rgba(244,63,94,0.10) 0%, rgba(251,146,60,0.05) 100%)",
        borderGlow: "rgba(244,63,94,0.35)",
        skills: [
            { label: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", color: "#F24E1E" },
            { label: "Canva", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg", color: "#00C4CC" },
            { label: "Photoshop", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg", color: "#31A8FF" },
            { label: "Inkscape", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/inkscape/inkscape-original.svg", color: "#000000" },
            { label: "Notion", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/notion/notion-original.svg", color: "#ffffff" },
        ],
    },
];

/* ── Magic Bento Card with mouse-tracking glow ── */
function BentoCard({ card, index }: { card: ToolboxCard; index: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const glowBg = useMotionTemplate`radial-gradient(320px circle at ${mouseX}px ${mouseY}px, ${card.borderGlow}, transparent 70%)`;

    return (
        <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            className="group relative rounded-2xl p-[1px] overflow-hidden"
            style={{
                background: `linear-gradient(135deg, ${card.borderGlow}, transparent 60%)`,
            }}
        >
            {/* Mouse-tracking glow overlay */}
            <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
                style={{ background: glowBg }}
            />

            <div
                className="relative rounded-2xl p-6 h-full flex flex-col border border-white/[0.06] transition-all duration-300
                    group-hover:border-white/[0.15] group-hover:shadow-xl"
                style={{
                    background: card.gradient,
                    backgroundColor: "rgba(38, 38, 48, 0.92)",
                    backdropFilter: "blur(16px) saturate(1.4)",
                    WebkitBackdropFilter: "blur(16px) saturate(1.4)",
                }}
            >
                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                    {card.logo === "__INLINE_SERVER_SVG__" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-400 opacity-80" aria-hidden="true">
                            <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
                            <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
                            <line x1="6" x2="6.01" y1="6" y2="6" />
                            <line x1="6" x2="6.01" y1="18" y2="18" />
                        </svg>
                    ) : (
                        <img src={card.logo} alt="" width={22} height={22} className="opacity-80" style={card.logoColor ? { filter: card.logoColor } : undefined} />
                    )}
                    <h3 className="text-[15px] font-semibold text-white/85" style={{ fontFamily: "var(--font-heading)" }}>
                        {card.title}
                    </h3>
                </div>

                {/* Skill Icon Grid */}
                <div className="flex flex-wrap gap-3 mt-auto">
                    {card.skills.map((skill) => (
                        <div
                            key={skill.label}
                            className="group/pill relative flex items-center justify-center w-11 h-11 rounded-lg transition-all duration-200
                                bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.10] hover:border-white/[0.18] hover:scale-110 cursor-default"
                            style={{ boxShadow: `0 0 0 0 ${skill.color}00`, transition: 'all 0.2s ease' }}
                            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 14px 0 ${skill.color}35`; }}
                            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${skill.color}00`; }}
                        >
                            <img src={skill.logo} alt={skill.label} width={24} height={24} className="flex-shrink-0" />

                            {/* Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded-md bg-[#1a1a1a] border border-white/10
                                text-[9px] text-white/70 whitespace-nowrap opacity-0 group-hover/pill:opacity-100 transition-opacity duration-200 pointer-events-none z-50 shadow-lg shadow-black/40"
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                {skill.label}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-r-[4px] border-t-[4px] border-transparent border-t-white/10" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

export default function SkillsBento() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 max-w-4xl mx-auto auto-rows-fr">
            {cards.map((card, ci) => (
                <BentoCard key={card.title} card={card} index={ci} />
            ))}
        </div>
    );
}
