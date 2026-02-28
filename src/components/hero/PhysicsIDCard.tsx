"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useDrag } from "@use-gesture/react";
import CardFront from "./CardFront";
import CardBack from "./CardBack";

const CARD_WIDTH = 260;
const CARD_HEIGHT = 340;
const ROPE_LENGTH = 70;
const PIN_H = 18; // total pin visual height (circle 14 + stem overlap)

interface PhysicsIDCardProps {
    onFlipChange?: (flipped: boolean) => void;
}

export default function PhysicsIDCard({ onFlipChange }: PhysicsIDCardProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [flipped, setFlipped] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [containerW, setContainerW] = useState(0);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => { onFlipChange?.(flipped); }, [flipped, onFlipChange]);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Maximum stiffness — rigid, unbreakable connection
    const springConfig = { stiffness: 1200, damping: 50, mass: 0.8 };

    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);
    const rotateZ = useTransform(springX, [-300, 0, 300], [-12, 0, 12]);

    // ResizeObserver for accurate container width tracking
    useEffect(() => {
        const update = () => {
            if (!containerRef.current) return;
            setContainerW(containerRef.current.offsetWidth);
            setMounted(true);
        };
        update();
        const ro = new ResizeObserver(update);
        if (containerRef.current) ro.observe(containerRef.current);
        window.addEventListener("resize", update);
        return () => { ro.disconnect(); window.removeEventListener("resize", update); };
    }, []);

    // All positions relative to container top-left
    const anchorX = containerW / 2;                     // rope top anchor = center
    const anchorY = 0;                                  // rope starts at container top
    const cardX = containerW / 2;                       // card center X
    const cardTopY = ROPE_LENGTH;                       // card assembly starts here
    const pinHoleY = cardTopY + PIN_H + 7;              // pin hole is 7px from card body top

    const dragOffset = useRef({ x: 0, y: 0 });

    const bind = useDrag(
        ({ xy: [px, py], first, down, event }) => {
            if (event) { event.preventDefault(); event.stopPropagation(); }
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();

            const centerX = cardX;
            const centerY = cardTopY + PIN_H + CARD_HEIGHT / 2;

            if (first) {
                dragOffset.current = {
                    x: px - (rect.left + centerX + springX.get()),
                    y: py - (rect.top + centerY + springY.get()),
                };
            }

            if (down) {
                const rawX = px - rect.left - centerX - dragOffset.current.x;
                const rawY = py - rect.top - centerY - dragOffset.current.y;
                const leftBound = -(centerX - CARD_WIDTH / 2 - 10);
                const rightBound = window.innerWidth - rect.left - centerX - CARD_WIDTH / 2 + 60;
                x.set(Math.max(leftBound, Math.min(rightBound, rawX)));
                y.set(Math.max(-ROPE_LENGTH * 0.3, Math.min(250, rawY)));
            } else {
                x.set(0);
                y.set(0);
            }
        },
        { pointer: { touch: true }, preventDefault: true, eventOptions: { passive: false } }
    );

    // ── Double-click to flip ──
    const handleDoubleClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setFlipped(f => !f);
    }, []);

    // ── Double-tap to flip (mobile) ──
    const lastTapRef = useRef(0);
    const handleTouchEnd = useCallback((e: React.TouchEvent) => {
        const now = Date.now();
        if (now - lastTapRef.current < 300) {
            e.preventDefault();
            setFlipped(f => !f);
            lastTapRef.current = 0;
        } else {
            lastTapRef.current = now;
        }
    }, []);

    /* ── Rope SVG path ── */
    const [stringPath, setStringPath] = useState("");

    useEffect(() => {
        if (!mounted) return;
        const unsX = springX.on("change", updateString);
        const unsY = springY.on("change", updateString);
        updateString();
        return () => { unsX(); unsY(); };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mounted, containerW]);

    function updateString() {
        const ax = anchorX;
        const ay = anchorY;
        // Rope end = pin hole position, offset by current spring displacement
        const cx = anchorX + springX.get();
        const cy = pinHoleY + springY.get();

        const dx = cx - ax;
        const dy = cy - ay;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Minimal sag for rigid rope feel
        const slack = Math.max(0, 1 - dist / (ROPE_LENGTH * 1.1));
        const sagAmount = slack * 5;

        const midX = (ax + cx) / 2;
        const midY = (ay + cy) / 2 + sagAmount;

        setStringPath(`M ${ax} ${ay} Q ${midX} ${midY} ${cx} ${cy}`);
    }

    const totalHeight = ROPE_LENGTH + PIN_H + CARD_HEIGHT + 20;

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: totalHeight }}
        >
            {/* Rope SVG — same coordinate space as the positioned children */}
            <svg
                className="absolute top-0 left-0 pointer-events-none z-10"
                width={containerW || "100%"}
                height={totalHeight}
                style={{ overflow: "visible" }}
            >
                <path d={stringPath} fill="none" stroke="#1a1a1a" strokeWidth="3" strokeLinecap="round" />
                <path d={stringPath} fill="none" stroke="rgba(80,80,80,0.3)" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 3" />
            </svg>

            {/* Card assembly: pin + card, all positioned with pixel offsets from container */}
            <motion.div
                style={{
                    x: springX,
                    y: springY,
                    rotateZ,
                    position: "absolute",
                    left: cardX - CARD_WIDTH / 2,
                    top: cardTopY,
                    width: CARD_WIDTH,
                    height: PIN_H + CARD_HEIGHT,
                    zIndex: 20,
                }}
            >
                {/* Metallic clip/pin — zero gap to card */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center z-30">
                    <div style={{
                        width: 14, height: 14, borderRadius: "50%",
                        background: "linear-gradient(145deg, #555 0%, #333 50%, #1a1a1a 100%)",
                        border: "2px solid #444",
                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.7), 0 1px 2px rgba(255,255,255,0.1)",
                    }} />
                    <div style={{
                        width: 6, height: 4, marginTop: -1,
                        background: "linear-gradient(180deg, #444 0%, #1a1a1a 100%)",
                        borderRadius: "0 0 3px 3px",
                        boxShadow: "0 2px 3px rgba(0,0,0,0.5)",
                        border: "1px solid #333", borderTop: "none",
                    }} />
                </div>

                {/* Card body — starts exactly below pin */}
                <div
                    {...bind()}
                    onDoubleClick={handleDoubleClick}
                    onTouchEnd={handleTouchEnd}
                    className="absolute cursor-grab active:cursor-grabbing touch-none select-none"
                    style={{ width: CARD_WIDTH, height: CARD_HEIGHT, top: PIN_H, left: 0, perspective: 1200 }}
                >
                    {/* Punched hole — aligned with pin stem */}
                    <div
                        className="absolute top-[5px] left-1/2 -translate-x-1/2 rounded-full z-50"
                        style={{
                            width: 10, height: 10,
                            background: "radial-gradient(circle, rgba(0,0,0,0.95) 40%, rgba(15,15,15,0.8) 100%)",
                            border: "1.5px solid rgba(70,70,70,0.4)",
                            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.8)",
                        }}
                    />

                    <motion.div
                        animate={{ rotateY: flipped ? 180 : 0 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                        style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
                    >
                        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
                            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
                            <CardFront />
                        </div>
                        <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
                            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                            <CardBack />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}
