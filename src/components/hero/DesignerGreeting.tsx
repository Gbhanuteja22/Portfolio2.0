"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GREETING = "Hi \u{1F44B}, I am Bhanu Teja Gummadavelli";
const TAGLINE = "I Turn Ideas into Designs, and Designs into Reality.";

interface CanvasElement {
    id: string;
    type: "text" | "rect" | "frame";
    label: string;
    x: number; y: number; w: number; h: number;
    fontSize?: number;
    color: string;
    opacity: number;
    content?: string;
}

const defaultElements: CanvasElement[] = [
    { id: "frame-hero", type: "frame", label: "Hero Section", x: 16, y: 12, w: 340, h: 190, color: "#1e1e2e", opacity: 1 },
    { id: "text-greet", type: "text", label: "Greeting", x: 28, y: 28, w: 310, h: 26, fontSize: 14, color: "#f0f0f0", opacity: 1, content: "" },
    { id: "text-tag", type: "text", label: "Tagline", x: 28, y: 62, w: 310, h: 20, fontSize: 11, color: "#d0d0d0", opacity: 0.95, content: "" },
    { id: "rect-divider", type: "rect", label: "Accent Bar", x: 28, y: 96, w: 60, h: 3, color: "#3b82f6", opacity: 1 },
    { id: "rect-cta", type: "rect", label: "CTA Button", x: 28, y: 114, w: 100, h: 28, color: "#3b82f6", opacity: 1 },
    { id: "text-cta", type: "text", label: "Button Label", x: 38, y: 119, w: 80, h: 18, fontSize: 10, color: "#0a0a0a", opacity: 1, content: "View Work →" },
];

export default function DesignerGreeting() {
    const [phase, setPhase] = useState(0);
    const [greetText, setGreetText] = useState("");
    const [tagText, setTagText] = useState("");

    useEffect(() => {
        const timers = [
            setTimeout(() => setPhase(1), 400),
            setTimeout(() => setPhase(2), 800),
            setTimeout(() => setPhase(3), 1200),
        ];
        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (phase < 3) return;
        if (greetText.length < GREETING.length) {
            const t = setTimeout(() => setGreetText(GREETING.slice(0, greetText.length + 1)), 30);
            return () => clearTimeout(t);
        } else if (phase === 3) setTimeout(() => setPhase(4), 200);
    }, [phase, greetText]);

    useEffect(() => {
        if (phase < 4) return;
        if (tagText.length < TAGLINE.length) {
            const t = setTimeout(() => setTagText(TAGLINE.slice(0, tagText.length + 1)), 20);
            return () => clearTimeout(t);
        } else if (phase === 4) setPhase(5);
    }, [phase, tagText]);

    const [elements, setElements] = useState<CanvasElement[]>(defaultElements);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
    const isPanning = useRef(false);
    const panStart = useRef({ x: 0, y: 0 });

    const isDraggingEl = useRef(false);
    const dragElStart = useRef({ x: 0, y: 0, ex: 0, ey: 0 });

    const updateElement = useCallback((id: string, updates: Partial<CanvasElement>) => {
        setElements(prev => prev.map(el => el.id === id ? { ...el, ...updates } : el));
    }, []);

    const selected = elements.find(e => e.id === selectedId);

    const handleCanvasMouseDown = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            isPanning.current = true;
            panStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
            setSelectedId(null);
        }
    };
    const handleCanvasMouseMove = (e: React.MouseEvent) => {
        if (isPanning.current) setPanOffset({ x: e.clientX - panStart.current.x, y: e.clientY - panStart.current.y });
        if (isDraggingEl.current && selectedId) {
            const dx = e.clientX - dragElStart.current.x;
            const dy = e.clientY - dragElStart.current.y;
            updateElement(selectedId, { x: Math.round(dragElStart.current.ex + dx), y: Math.round(dragElStart.current.ey + dy) });
        }
    };
    const handleCanvasMouseUp = () => { isPanning.current = false; isDraggingEl.current = false; };
    const handleElMouseDown = (e: React.MouseEvent, el: CanvasElement) => {
        e.stopPropagation();
        setSelectedId(el.id);
        isDraggingEl.current = true;
        dragElStart.current = { x: e.clientX, y: e.clientY, ex: el.x, ey: el.y };
    };

    return (
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full">
            {/* Figma window — wider to fill space, elevated bg for contrast */}
            <div className="flex border border-white/[0.10] shadow-2xl shadow-black/40 overflow-hidden" style={{ borderRadius: 8, height: 300, width: "100%", background: "#1a1a1a" }}>
                {/* Left: Layers */}
                <div className="border-r border-white/[0.08] flex flex-col" style={{ flexShrink: 0, width: 80, background: "#1e1e1e" }}>
                    <div className="px-2 py-1 border-b border-white/[0.08]">
                        <span className="text-[7px] text-white/25 uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>Layers</span>
                    </div>
                    <div className="flex-1 overflow-y-auto py-0.5">
                        {elements.map((el) => (
                            <button
                                key={el.id}
                                onClick={() => setSelectedId(el.id)}
                                className={`w-full text-left px-1.5 py-0.5 text-[7px] transition-colors truncate ${selectedId === el.id ? "bg-[#0d99ff]/20 text-[#0d99ff]" : "text-white/35 hover:text-white/55 hover:bg-white/5"
                                    }`}
                                style={{ fontFamily: "var(--font-mono)" }}
                            >
                                <span className="mr-0.5 opacity-40" style={{ fontSize: 6 }}>
                                    {el.type === "frame" ? "▢" : el.type === "rect" ? "■" : "T"}
                                </span>
                                {el.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Center: Canvas — toolbar minimal (removed V, T, O) */}
                <div className="flex-1 flex flex-col min-w-0">
                    <div className="flex items-center justify-between px-2.5 py-1 border-b border-white/[0.08]" style={{ flexShrink: 0, background: "#222" }}>
                        <div className="flex items-center gap-1.5">
                            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                                <rect x="1" y="1" width="4" height="4" rx="0.5" fill="#a855f7" fillOpacity="0.5" />
                                <rect x="7" y="1" width="4" height="4" rx="0.5" fill="#a855f7" fillOpacity="0.3" />
                                <rect x="1" y="7" width="4" height="4" rx="0.5" fill="#a855f7" fillOpacity="0.3" />
                            </svg>
                            <span className="text-[9px] text-white/50" style={{ fontFamily: "var(--font-mono)" }}>Untitled</span>
                        </div>
                        {/* Minimal: only frame tool */}
                        <div className="flex items-center gap-0.5" />
                    </div>

                    <div
                        className="relative flex-1 overflow-hidden cursor-grab active:cursor-grabbing"
                        style={{ background: "#151515" }}
                        onMouseDown={handleCanvasMouseDown}
                        onMouseMove={handleCanvasMouseMove}
                        onMouseUp={handleCanvasMouseUp}
                        onMouseLeave={handleCanvasMouseUp}
                    >
                        <div className="absolute inset-0 opacity-[0.06]" style={{
                            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)",
                            backgroundSize: "18px 18px",
                            backgroundPosition: `${panOffset.x % 18}px ${panOffset.y % 18}px`,
                        }} />

                        <div style={{ transform: `translate(${panOffset.x}px, ${panOffset.y}px)`, position: "absolute", inset: 0 }}>
                            {elements.map((el) => {
                                const isSelected = selectedId === el.id;
                                const isHovered = hoveredId === el.id;
                                return (
                                    <div
                                        key={el.id} className="absolute"
                                        style={{ left: el.x, top: el.y, width: el.w, height: el.h, opacity: el.opacity, cursor: "move" }}
                                        onMouseDown={(e) => handleElMouseDown(e, el)}
                                        onMouseEnter={() => setHoveredId(el.id)}
                                        onMouseLeave={() => setHoveredId(null)}
                                    >
                                        {(isSelected || isHovered) && (
                                            <div className="absolute inset-[-2px] pointer-events-none" style={{
                                                border: isSelected ? "1.5px solid #0d99ff" : "1px dashed rgba(13,153,255,0.35)",
                                            }}>
                                                {isSelected && <>
                                                    {["-top-[3px] -left-[3px]", "-top-[3px] -right-[3px]", "-bottom-[3px] -left-[3px]", "-bottom-[3px] -right-[3px]"].map((pos) => (
                                                        <div key={pos} className={`absolute ${pos} w-[5px] h-[5px] bg-white border border-[#0d99ff] rounded-sm`} />
                                                    ))}
                                                </>}
                                            </div>
                                        )}
                                        {el.type === "frame" && <div className="w-full h-full rounded-lg border border-white/[0.03]" style={{ background: el.color }} />}
                                        {el.type === "rect" && <div className="w-full h-full rounded" style={{ background: el.color }} />}
                                        {el.type === "text" && (
                                            <div className="w-full h-full flex items-center select-text pointer-events-auto"
                                                style={{ fontSize: el.fontSize, color: el.color, fontFamily: "var(--font-body)", fontWeight: el.fontSize && el.fontSize >= 14 ? 600 : 400 }}
                                            >
                                                {el.id === "text-greet" ? greetText : el.id === "text-tag" ? tagText : el.content}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right: Properties */}
                <div className="border-l border-white/[0.08] flex flex-col" style={{ flexShrink: 0, width: 110, background: "#1e1e1e" }}>
                    <div className="px-2 py-1 border-b border-white/[0.08]">
                        <span className="text-[7px] text-white/25 uppercase tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>Design</span>
                    </div>
                    <div className="flex-1 p-1.5 overflow-y-auto">
                        <AnimatePresence mode="wait">
                            {selected ? (
                                <motion.div key={selected.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-2">
                                    <div>
                                        <div className="text-[6px] text-white/20 mb-0.5 uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>Layer</div>
                                        <div className="text-[8px] text-white/65 font-medium truncate">{selected.label}</div>
                                    </div>
                                    <div>
                                        <div className="text-[6px] text-white/20 mb-0.5 uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>Position</div>
                                        <div className="grid grid-cols-2 gap-1">
                                            {(["x", "y"] as const).map((axis) => (
                                                <div key={axis}>
                                                    <span className="text-[5px] text-white/20 uppercase">{axis}</span>
                                                    <input type="number" value={selected[axis]}
                                                        onChange={(e) => updateElement(selected.id, { [axis]: Number(e.target.value) })}
                                                        className="w-full bg-white/5 border border-white/[0.06] rounded px-1 py-0.5 text-[7px] text-white/55 outline-none focus:border-[#0d99ff]/50"
                                                        style={{ fontFamily: "var(--font-mono)" }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[6px] text-white/20 mb-0.5 uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>Fill</div>
                                        <div className="flex items-center gap-1">
                                            <input type="color" value={selected.color}
                                                onChange={(e) => updateElement(selected.id, { color: e.target.value })}
                                                className="w-3.5 h-3.5 rounded border border-white/10 cursor-pointer p-0"
                                            />
                                            <span className="text-[6px] text-white/30" style={{ fontFamily: "var(--font-mono)" }}>{selected.color.toUpperCase()}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[6px] text-white/20 mb-0.5 uppercase tracking-wide" style={{ fontFamily: "var(--font-mono)" }}>Opacity</div>
                                        <input type="range" min="0" max="1" step="0.05" value={selected.opacity}
                                            onChange={(e) => updateElement(selected.id, { opacity: parseFloat(e.target.value) })}
                                            className="w-full h-0.5 rounded-full appearance-none bg-white/10 cursor-pointer"
                                            style={{ accentColor: "#0d99ff" }}
                                        />
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center h-full">
                                    <p className="text-[7px] text-white/15 text-center leading-relaxed">Select a layer<br />to inspect</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
