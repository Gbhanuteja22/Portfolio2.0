"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const PROMPT = "user@Desktop-231sw2:~$ ";
const COMMAND = "python main.py";
const OUTPUT_LINE_1 = "Hi \u{1F44B}, I am Bhanu Teja Gummadavelli";
const OUTPUT_LINE_2 = "I Turn Ideas into Designs, and Designs into Reality.";

export default function DevGreeting() {
    const [phase, setPhase] = useState(0);
    const [cmdChars, setCmdChars] = useState(0);
    const [out1Chars, setOut1Chars] = useState(0);
    const [out2Chars, setOut2Chars] = useState(0);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => { const t = setTimeout(() => setPhase(1), 600); return () => clearTimeout(t); }, []);

    useEffect(() => {
        if (phase !== 1) return;
        if (cmdChars <= COMMAND.length) { const t = setTimeout(() => setCmdChars((c) => c + 1), 55); return () => clearTimeout(t); }
        const t = setTimeout(() => setPhase(3), 500);
        return () => clearTimeout(t);
    }, [phase, cmdChars]);

    useEffect(() => {
        if (phase !== 3) return;
        if (out1Chars <= OUTPUT_LINE_1.length) { const t = setTimeout(() => setOut1Chars((c) => c + 1), 35); return () => clearTimeout(t); }
        const t = setTimeout(() => setPhase(4), 300);
        return () => clearTimeout(t);
    }, [phase, out1Chars]);

    useEffect(() => {
        if (phase !== 4) return;
        if (out2Chars <= OUTPUT_LINE_2.length) { const t = setTimeout(() => setOut2Chars((c) => c + 1), 25); return () => clearTimeout(t); }
        setPhase(5);
    }, [phase, out2Chars]);

    useEffect(() => {
        // Scroll only within the terminal container, not the page
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, []);

    const BlinkCursor = () => (
        <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            className="inline-block w-[8px] h-[14px] bg-[#4af626] ml-[2px] align-middle"
        />
    );

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
        >
            {/* macOS Terminal — moved up (no extra top margin) */}
            <div className="overflow-hidden border border-white/[0.08] shadow-2xl shadow-black/50 rounded-xl">
                <div className="flex items-center px-4 py-2.5 bg-[#1e1e1e] border-b border-white/[0.06]">
                    <div className="flex items-center gap-2 mr-4">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f57] shadow-[0_0_4px_rgba(255,95,87,0.4)]" />
                        <div className="w-3 h-3 rounded-full bg-[#febc2e] shadow-[0_0_4px_rgba(254,188,46,0.4)]" />
                        <div className="w-3 h-3 rounded-full bg-[#28c840] shadow-[0_0_4px_rgba(40,200,64,0.4)]" />
                    </div>
                    <span className="text-[11px] text-white/30 flex-1 text-center" style={{ fontFamily: "var(--font-mono)" }}>Terminal — bash</span>
                    <div className="w-[52px]" />
                </div>

                <div
                    className="bg-[#0a0a0a] px-5 py-4 overflow-y-auto"
                    style={{ fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.5, minHeight: 180, maxHeight: 240 }}
                >
                    <div>
                        <span className="text-[#4af626]">{PROMPT}</span>
                        <span className="text-[#e0e0e0]">{phase >= 1 ? COMMAND.substring(0, cmdChars) : ""}</span>
                        {phase === 1 && cmdChars <= COMMAND.length && <BlinkCursor />}
                    </div>
                    {phase >= 3 && (
                        <div className="text-[#e0e0e0] mt-2">
                            {OUTPUT_LINE_1.substring(0, out1Chars)}
                            {phase === 3 && out1Chars <= OUTPUT_LINE_1.length && <BlinkCursor />}
                        </div>
                    )}
                    {phase >= 4 && (
                        <div className="text-white/35 mt-1">
                            {OUTPUT_LINE_2.substring(0, out2Chars)}
                            {phase === 4 && out2Chars <= OUTPUT_LINE_2.length && <BlinkCursor />}
                        </div>
                    )}
                    {phase >= 5 && (
                        <div className="mt-2">
                            <span className="text-[#4af626]">{PROMPT}</span>
                            <BlinkCursor />
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
            </div>
        </motion.div>
    );
}
