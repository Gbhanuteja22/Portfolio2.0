"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ContainerScroll from "@/components/ui/ContainerScroll";

/* ── Clean UI Mockup Previews (MediSync-style) ── */

function PlacementPreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
            <img src="/projects/placement-system.jpg" alt="Placement System" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
    );
}

function MediSyncPreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-rose-50 to-red-50 relative overflow-hidden">
            <img src="/projects/medisync.jpg" alt="MediSync" className="absolute inset-0 w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>
    );
}

function SwiftSharePreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-violet-50 to-indigo-50 p-4 flex items-center justify-center relative overflow-hidden">
            <div className="w-full max-w-[220px] bg-white/90 rounded-xl shadow-md border border-violet-100 p-3 flex flex-col gap-2">
                {/* Upload zone */}
                <div className="w-full h-16 rounded-lg border-2 border-dashed border-violet-200 bg-violet-50/50 flex flex-col items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                    <span className="text-[6px] text-violet-400 mt-1 font-medium">Drag & drop files or click to browse</span>
                </div>
                {/* Share link */}
                <div className="flex items-center gap-1.5">
                    <div className="flex-1 h-5 rounded-md bg-violet-50 border border-violet-200 flex items-center px-1.5">
                        <span className="text-[5px] text-violet-500 font-mono truncate">swiftshare.io/f/a8x2k</span>
                    </div>
                    <div className="w-5 h-5 rounded-md bg-violet-500 flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" /></svg>
                    </div>
                </div>
                <div className="flex gap-1 justify-center">
                    <span className="text-[5px] text-green-500 font-medium">✓ Encrypted</span>
                    <span className="text-[5px] text-violet-400">•</span>
                    <span className="text-[5px] text-violet-400">Expires in 24h</span>
                </div>
            </div>
        </div>
    );
}

function StudyPlannerPreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-amber-50 to-yellow-50 p-3 flex items-center justify-center relative overflow-hidden">
            <div className="flex gap-2 items-start w-full max-w-[260px]">
                {/* Calendar */}
                <div className="flex-1 bg-white/90 rounded-lg shadow-sm border border-amber-100 p-2">
                    <div className="flex items-center justify-between mb-1.5">
                        <span className="text-[6px] text-amber-600 font-semibold">June 2024</span>
                        <div className="flex gap-0.5"><div className="w-2 h-2 rounded bg-amber-100" /><div className="w-2 h-2 rounded bg-amber-100" /></div>
                    </div>
                    <div className="grid grid-cols-7 gap-0.5 mb-1">
                        {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i} className="text-[4px] text-amber-400 text-center">{d}</span>)}
                    </div>
                    <div className="grid grid-cols-7 gap-0.5">
                        {[...Array(30)].map((_, i) => (
                            <div key={i} className={`w-3 h-3 rounded-sm text-[4px] flex items-center justify-center ${i === 13 ? "bg-amber-400 text-white font-bold" : i === 7 || i === 15 || i === 22 ? "bg-amber-100 text-amber-600" : "text-amber-400"}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                    {/* Task pills */}
                    <div className="flex flex-col gap-0.5 mt-1.5">
                        <div className="px-1.5 py-0.5 rounded-full bg-blue-100 text-[4px] text-blue-600 font-medium">Math - 10:00 AM</div>
                        <div className="px-1.5 py-0.5 rounded-full bg-green-100 text-[4px] text-green-600 font-medium">Physics - 2:00 PM</div>
                    </div>
                </div>
                {/* Progress ring */}
                <div className="flex flex-col items-center gap-1">
                    <div className="relative w-16 h-16">
                        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                            <circle cx="18" cy="18" r="15" fill="none" stroke="#fde68a" strokeWidth="3" />
                            <circle cx="18" cy="18" r="15" fill="none" stroke="#f59e0b" strokeWidth="3" strokeDasharray="66 94" strokeLinecap="round" />
                        </svg>
                        <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold text-amber-600">70%</span>
                    </div>
                    <span className="text-[5px] text-amber-500 font-medium">Week Progress</span>
                </div>
            </div>
        </div>
    );
}

function VoiceSearchPreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-cyan-50 to-teal-50 p-4 flex items-center justify-center relative overflow-hidden">
            <div className="w-full max-w-[220px] bg-white/90 rounded-2xl shadow-md border border-cyan-100 p-3 flex flex-col items-center gap-2">
                {/* Microphone */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-500 flex items-center justify-center shadow-lg shadow-cyan-200/50 relative">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" /><path d="M19 10v2a7 7 0 01-14 0v-2M12 19v4M8 23h8" /></svg>
                    {/* Pulse rings */}
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-300 animate-ping opacity-20" />
                </div>
                {/* Transcription */}
                <div className="w-full px-2 py-1.5 rounded-lg bg-cyan-50 border border-cyan-100">
                    <span className="text-[7px] text-cyan-700 italic">&quot;Searching local files...&quot;</span>
                </div>
                {/* Wave bars */}
                <div className="flex gap-0.5 items-center h-4">
                    {[6, 10, 14, 8, 12, 6, 10, 14, 8].map((h, i) => (
                        <div key={i} className="w-1 rounded-full bg-gradient-to-t from-cyan-400 to-teal-300 animate-pulse" style={{ height: h, animationDelay: `${i * 100}ms` }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function EdutubePreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-slate-50 to-gray-100 p-3 flex items-center justify-center relative overflow-hidden">
            <div className="flex gap-2 items-start w-full max-w-[260px]">
                {/* Video player */}
                <div className="flex-1 bg-white/90 rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="w-full h-14 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative">
                        <div className="w-7 h-7 rounded-full bg-red-500/90 flex items-center justify-center shadow-md">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-600"><div className="h-full w-2/5 bg-red-500 rounded-r" /></div>
                    </div>
                    <div className="p-1.5">
                        <div className="w-full h-1.5 rounded bg-gray-100 mb-1" />
                        <div className="w-3/4 h-1 rounded bg-gray-100" />
                    </div>
                </div>
                {/* Sidebar courses */}
                <div className="w-20 bg-white/90 rounded-lg shadow-sm border border-gray-200 p-1.5 flex flex-col gap-1">
                    <span className="text-[5px] text-gray-500 font-semibold">Recommended</span>
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex gap-1 items-center">
                            <div className="w-6 h-4 rounded-sm bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                                <svg width="4" height="4" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
                            </div>
                            <div className="flex-1 flex flex-col gap-0.5">
                                <div className="w-full h-1 rounded bg-gray-100" />
                                <div className="w-2/3 h-0.5 rounded bg-gray-100" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const projects = [
    {
        title: "Placement Management System",
        description: "Student-company placement workflow — dashboards, company listings, interview scheduling, and real-time placement analytics.",
        tags: ["Next.js", "MongoDB", "Node.js", "Dashboard", "Analytics"],
        Preview: PlacementPreview,
    },
    {
        title: "MediSync",
        description: "Smart Doctor appointment & record system — patient scheduling, prescription management, and consultation tracking.",
        tags: ["React", "Firebase", "Node.js", "Healthcare", "Auth"],
        Preview: MediSyncPreview,
    },
    {
        title: "SwiftShare: P2P File Transfer",
        description: "Real-time file transfer platform — share via generated links or access codes with end-to-end encryption.",
        tags: ["Next.js", "S3", "WebSockets", "Encryption", "Auth"],
        Preview: SwiftSharePreview,
    },
    {
        title: "Smart Study Planner",
        description: "Task management and progress tracking web app — organize study schedules, set goals, and visualize academic progress.",
        tags: ["React", "MongoDB", "Node.js", "Calendar", "Analytics"],
        Preview: StudyPlannerPreview,
    },
    {
        title: "Voice-Based Search Engine",
        description: "PC voice command system for local file fetching — speak to search, open, and manage files using speech recognition.",
        tags: ["Python", "Speech Recognition", "NLP", "Desktop", "AI"],
        Preview: VoiceSearchPreview,
    },
    {
        title: "Edutube",
        description: "Educational content and video platform — curated courses, progress tracking, and community-driven learning resources.",
        tags: ["React", "MongoDB", "YouTube API", "EdTech", "Search"],
        Preview: EdutubePreview,
    },
];

const badgePositions = [
    { top: "14%", left: "10%" },
    { top: "20%", left: "62%" },
    { top: "50%", left: "18%" },
    { top: "55%", left: "68%" },
    { top: "75%", left: "35%" },
    { top: "38%", left: "42%" },
];

export default function FullStackProjectsPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-8 sm:px-12 md:px-20 lg:px-28">
            <div className="max-w-6xl mx-auto">
                <Link href="/#projects">
                    <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-8 cursor-pointer"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        <span>←</span><span>Back to Projects</span>
                    </motion.button>
                </Link>

                <ContainerScroll
                    titleComponent={
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                                <span className="text-gradient">Full Stack Projects</span>
                            </h1>
                            <p className="text-sm text-slate-400 max-w-xl">End-to-end applications built with modern web technologies.</p>
                        </motion.div>
                    }
                >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                        {projects.map((project, i) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: i * 0.08 }}
                                className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm w-full max-w-[400px] mx-auto"
                            >
                                <div className="group relative h-[180px] overflow-hidden">
                                    <div className="absolute inset-0 transition-all duration-500 group-hover:scale-105 origin-center">
                                        <project.Preview />
                                    </div>
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 z-[1]" />
                                    {project.tags.map((tag, tagIdx) => {
                                        const pos = badgePositions[tagIdx];
                                        if (!pos) return null;
                                        return (
                                            <motion.span
                                                key={tag}
                                                className="absolute px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[2]"
                                                style={{ top: pos.top, left: pos.left, fontFamily: "var(--font-mono)", transitionDelay: `${tagIdx * 80}ms` }}
                                                animate={{ y: [0, -5, 0] }}
                                                transition={{ y: { duration: 2.5 + tagIdx * 0.3, repeat: Infinity, ease: "easeInOut" } }}
                                            >
                                                {tag}
                                            </motion.span>
                                        );
                                    })}
                                </div>
                                <div className="p-4">
                                    <h3 className="text-base font-semibold text-slate-800 mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>{project.title}</h3>
                                    <p className="text-[12px] text-slate-400 leading-relaxed line-clamp-3">{project.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </ContainerScroll>
            </div>
        </div>
    );
}
