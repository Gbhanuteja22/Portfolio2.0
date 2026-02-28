"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import ContainerScroll from "@/components/ui/ContainerScroll";

/* ── Clean UI Mockup Previews (MediSync-style: pastel bg, rounded cards, soft shadows) ── */

function GeminiLensPreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-50 p-4 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-3 left-3 flex gap-1.5"><div className="w-2 h-2 rounded-full bg-red-300" /><div className="w-2 h-2 rounded-full bg-yellow-300" /><div className="w-2 h-2 rounded-full bg-green-300" /></div>
            <div className="flex gap-3 items-start">
                {/* Upload zone */}
                <div className="w-28 h-24 rounded-xl border-2 border-dashed border-blue-300 bg-white/80 flex flex-col items-center justify-center shadow-sm">
                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mb-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" /></svg>
                    </div>
                    <span className="text-[7px] text-blue-400 font-medium">Drop files here</span>
                </div>
                {/* Analysis results */}
                <div className="flex flex-col gap-1.5">
                    <div className="w-24 h-6 rounded-lg bg-white shadow-sm border border-blue-100 flex items-center px-2 gap-1.5">
                        <div className="w-3 h-3 rounded bg-blue-400" /><div className="flex-1 h-1.5 rounded bg-blue-100" />
                    </div>
                    <div className="w-24 h-6 rounded-lg bg-white shadow-sm border border-blue-100 flex items-center px-2 gap-1.5">
                        <div className="w-3 h-3 rounded bg-indigo-400" /><div className="flex-1 h-1.5 rounded bg-indigo-100" />
                    </div>
                    <div className="w-24 h-6 rounded-lg bg-white shadow-sm border border-blue-100 flex items-center px-2 gap-1.5">
                        <div className="w-3 h-3 rounded bg-violet-400" /><div className="flex-1 h-1.5 rounded bg-violet-100" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function CodeStoryPreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-violet-50 to-purple-50 p-4 flex items-center justify-center relative overflow-hidden">
            <div className="flex gap-3 items-start">
                {/* File tree sidebar */}
                <div className="w-20 bg-white/80 rounded-lg shadow-sm border border-purple-100 p-2 flex flex-col gap-1">
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-purple-300" /><div className="w-10 h-1.5 rounded bg-purple-100" /></div>
                    <div className="flex items-center gap-1 pl-2"><div className="w-1.5 h-1.5 rounded-sm bg-purple-200" /><div className="w-8 h-1 rounded bg-purple-50" /></div>
                    <div className="flex items-center gap-1 pl-2"><div className="w-1.5 h-1.5 rounded-sm bg-purple-200" /><div className="w-6 h-1 rounded bg-purple-50" /></div>
                    <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-sm bg-violet-300" /><div className="w-8 h-1.5 rounded bg-violet-100" /></div>
                    <div className="flex items-center gap-1 pl-2"><div className="w-1.5 h-1.5 rounded-sm bg-violet-200" /><div className="w-7 h-1 rounded bg-violet-50" /></div>
                </div>
                {/* Architecture diagram */}
                <div className="w-28 bg-white/80 rounded-lg shadow-sm border border-purple-100 p-2 flex flex-col items-center gap-2">
                    <div className="w-12 h-5 rounded-md bg-violet-100 border border-violet-200 flex items-center justify-center"><span className="text-[5px] text-violet-500 font-medium">App</span></div>
                    <div className="w-px h-2 bg-purple-200" />
                    <div className="flex gap-2">
                        <div className="w-9 h-4 rounded bg-purple-100 border border-purple-200 flex items-center justify-center"><span className="text-[4px] text-purple-500">API</span></div>
                        <div className="w-9 h-4 rounded bg-indigo-100 border border-indigo-200 flex items-center justify-center"><span className="text-[4px] text-indigo-500">UI</span></div>
                    </div>
                    <div className="w-px h-2 bg-purple-200" />
                    <div className="w-12 h-4 rounded bg-fuchsia-100 border border-fuchsia-200 flex items-center justify-center"><span className="text-[4px] text-fuchsia-500">Database</span></div>
                </div>
            </div>
        </div>
    );
}

function DocuMindPreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 p-3 flex items-center justify-center relative overflow-hidden">
            <div className="flex gap-2 items-start w-full max-w-[260px]">
                {/* Documents sidebar */}
                <div className="w-20 bg-white/80 rounded-lg shadow-sm border border-amber-100 p-2 flex flex-col gap-1.5">
                    <span className="text-[6px] text-amber-500 font-semibold mb-0.5">Documents</span>
                    {["report.pdf", "notes.md", "data.csv"].map((f, i) => (
                        <div key={i} className="flex items-center gap-1 p-1 rounded bg-amber-50">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><path d="M14 2v6h6" /></svg>
                            <span className="text-[5px] text-amber-600 truncate">{f}</span>
                        </div>
                    ))}
                </div>
                {/* Chat area */}
                <div className="flex-1 bg-white/80 rounded-lg shadow-sm border border-amber-100 p-2 flex flex-col gap-1.5">
                    <div className="self-end max-w-[90%] px-2 py-1 rounded-lg bg-amber-500 text-[6px] text-white">What are the key findings?</div>
                    <div className="self-start max-w-[90%] px-2 py-1 rounded-lg bg-amber-50 border border-amber-200">
                        <p className="text-[5px] text-amber-800 leading-tight">The report highlights 3 primary findings related to performance optimization...</p>
                        <span className="text-[4px] text-amber-400 italic">Source: report.pdf, p.12</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MyChemLabPreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-emerald-50 to-teal-50 relative overflow-hidden">
            <Image src="/projects/mychemlab.jpg" alt="MyChem Lab" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" loading="lazy" />
        </div>
    );
}

function VisionTrackPreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-red-50 to-rose-50 p-3 flex items-center justify-center relative overflow-hidden">
            <div className="flex gap-2 items-start w-full max-w-[260px]">
                {/* Scanning frame */}
                <div className="w-24 h-24 rounded-lg bg-white/80 shadow-sm border border-rose-100 flex items-center justify-center relative">
                    <div className="w-12 h-14 rounded-lg bg-rose-100 flex items-center justify-center">
                        <div className="w-6 h-8 rounded bg-rose-200" />
                    </div>
                    <div className="absolute top-1 left-1 w-3 h-3 border-l-2 border-t-2 border-rose-400 rounded-tl" />
                    <div className="absolute top-1 right-1 w-3 h-3 border-r-2 border-t-2 border-rose-400 rounded-tr" />
                    <div className="absolute bottom-1 left-1 w-3 h-3 border-l-2 border-b-2 border-rose-400 rounded-bl" />
                    <div className="absolute bottom-1 right-1 w-3 h-3 border-r-2 border-b-2 border-rose-400 rounded-br" />
                    <div className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 px-1.5 py-0.5 rounded bg-green-400 text-[4px] text-white font-bold">VERIFIED</div>
                </div>
                {/* Attendance log */}
                <div className="flex-1 bg-white/80 rounded-lg shadow-sm border border-rose-100 p-2 flex flex-col gap-1">
                    <span className="text-[6px] text-rose-500 font-semibold">Attendance Log</span>
                    {[["Sarah J.", "09:30", true], ["John D.", "09:45", true], ["Emily R.", "—", false]].map(([name, time, present], i) => (
                        <div key={i} className="flex items-center justify-between p-1 rounded bg-rose-50/50">
                            <span className="text-[5px] text-rose-700">{name as string}</span>
                            <span className="text-[5px] text-rose-400">{time as string}</span>
                            <div className={`w-2 h-2 rounded-full ${present ? "bg-green-400" : "bg-red-300"}`} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function WhatsAppAnalyzerPreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-green-50 to-lime-50 p-3 flex items-center justify-center relative overflow-hidden">
            <div className="flex gap-2 items-end">
                {/* Chat bubbles bg */}
                <div className="absolute top-2 left-2 w-16 h-4 rounded-lg bg-green-100/60 border border-green-200/40" />
                <div className="absolute top-7 right-4 w-12 h-3 rounded-lg bg-white/60 border border-green-200/40" />
                {/* Pie chart */}
                <div className="relative w-16 h-16">
                    <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#bbf7d0" strokeWidth="4" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="35 88" strokeLinecap="round" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#86efac" strokeWidth="4" strokeDasharray="20 88" strokeDashoffset="-35" strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-[7px] font-bold text-green-600">40%</span>
                </div>
                {/* Bar chart */}
                <div className="flex gap-1 items-end h-16 p-1 bg-white/60 rounded-lg shadow-sm border border-green-100">
                    {[30, 48, 22, 40, 35, 52, 28].map((h, i) => (
                        <div key={i} className="w-2.5 rounded-t bg-gradient-to-t from-green-400 to-emerald-300 shadow-sm" style={{ height: h * 0.9 }} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function GestureArtPreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-cyan-50 to-sky-50 p-3 flex items-center justify-center relative overflow-hidden">
            <div className="flex gap-3 items-center">
                {/* Camera feed */}
                <div className="w-28 h-20 rounded-lg bg-white/80 shadow-sm border border-cyan-100 relative flex items-center justify-center overflow-hidden">
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    {/* Hand wireframe */}
                    <svg width="50" height="55" viewBox="0 0 50 55" fill="none" className="opacity-80">
                        <path d="M25 50 L25 30 L18 16 M25 30 L32 16 M25 30 L35 20 M25 30 L15 20 M25 30 L38 28" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
                        {[[18, 14], [32, 14], [35, 18], [15, 18], [38, 26]].map(([cx, cy], i) => (
                            <circle key={i} cx={cx} cy={cy} r="2.5" fill="#06b6d4" className="animate-pulse" style={{ animationDelay: `${i * 150}ms` }} />
                        ))}
                        <circle cx="25" cy="30" r="3" fill="#0891b2" />
                    </svg>
                </div>
                {/* Tool buttons */}
                <div className="flex flex-col gap-1.5">
                    {[["Brush", "#06b6d4"], ["Color", "#8b5cf6"], ["Clear", "#ef4444"]].map(([label, color], i) => (
                        <div key={i} className="w-14 h-5 rounded-md bg-white shadow-sm border flex items-center justify-center gap-1" style={{ borderColor: `${color}40` }}>
                            <div className="w-2 h-2 rounded-sm" style={{ background: color }} />
                            <span className="text-[5px] font-medium" style={{ color }}>{label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const projects = [
    {
        title: "MyChem Lab",
        description: "AI Virtual Chemistry Laboratory — interactive 3D experiments with intelligent reaction predictions and simulated lab environment.",
        tags: ["React", "Three.js", "AI", "EdTech", "3D"],
        Preview: MyChemLabPreview,
    },
    {
        title: "GestureArt",
        description: "Hand gesture-based system using computer vision — real-time webcam gesture detection with MediaPipe for hands-free interaction.",
        tags: ["Computer Vision", "ML", "Python", "OpenCV", "MediaPipe"],
        Preview: GestureArtPreview,
    },
    {
        title: "VisionTrack: Smart Attendance",
        description: "Automated attendance system via real-time facial recognition — detect, identify, and log student presence using webcam feeds.",
        tags: ["OpenCV", "Python", "ML", "Face Recognition", "Flask"],
        Preview: VisionTrackPreview,
    },
    {
        title: "DocuMind: RAG AI Assistant",
        description: "Retrieval Augmented Generation system using vector databases for intelligent, context-aware document Q&A and knowledge retrieval.",
        tags: ["LangChain", "Pinecone", "OpenAI", "Python", "RAG"],
        Preview: DocuMindPreview,
    },
    {
        title: "CodeStory",
        description: "GitHub repository analyzer — paste any repo URL to generate architecture diagrams, codebase walkthroughs, and interactive code chat.",
        tags: ["AI", "GitHub API", "React", "NLP", "Diagrams"],
        Preview: CodeStoryPreview,
    },
    {
        title: "GeminiLens",
        description: "AI-powered file analysis platform — drag & drop any document for intelligent insights, summaries, and data extraction via Google Gemini.",
        tags: ["AI", "Gemini API", "React", "Python", "Vision"],
        Preview: GeminiLensPreview,
    },
    {
        title: "WhatsApp Chat Analyzer",
        description: "Data analysis and visualization from exported WhatsApp chats — message frequency, word clouds, activity maps, and sentiment trends.",
        tags: ["Python", "Pandas", "NLP", "Matplotlib", "Streamlit"],
        Preview: WhatsAppAnalyzerPreview,
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

export default function AiMlProjectsPage() {
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
                                <span className="text-gradient">AI & ML Projects</span>
                            </h1>
                            <p className="text-sm text-slate-400 max-w-xl">
                                Exploring the frontiers of artificial intelligence and machine learning.
                            </p>
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
