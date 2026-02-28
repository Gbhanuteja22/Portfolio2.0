"use client";

import React, { useEffect, useRef, useCallback, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CURSOR_SIZE = 20;
const DOT_SIZE = 6;

export default function SmoothCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const [isPointer, setIsPointer] = useState(false);
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            if (!isVisible) setIsVisible(true);

            // Detect if hovering over a clickable element
            const target = e.target as HTMLElement;
            const clickable =
                target.tagName === "BUTTON" ||
                target.tagName === "A" ||
                target.closest("button") !== null ||
                target.closest("a") !== null ||
                target.closest("[role='button']") !== null ||
                window.getComputedStyle(target).cursor === "pointer";
            setIsPointer(clickable);
        },
        [cursorX, cursorY, isVisible]
    );

    const handleMouseLeave = useCallback(() => setIsVisible(false), []);
    const handleMouseEnter = useCallback(() => setIsVisible(true), []);

    useEffect(() => {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);
        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, [handleMouseMove, handleMouseLeave, handleMouseEnter]);

    // Only render on desktop
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const check = () => setIsDesktop(window.matchMedia("(min-width: 1024px)").matches);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    if (!isDesktop) return null;

    return (
        <>
            {/* Outer ring */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: smoothX,
                    y: smoothY,
                    width: CURSOR_SIZE,
                    height: CURSOR_SIZE,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        scale: isPointer ? 1.8 : 1,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="w-full h-full rounded-full border-2"
                    style={{
                        borderColor: "#60a5fa",
                    }}
                />
            </motion.div>

            {/* Inner dot */}
            <motion.div
                className="fixed top-0 left-0 z-[9999] pointer-events-none mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    width: DOT_SIZE,
                    height: DOT_SIZE,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        scale: isPointer ? 0 : 1,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.15 }}
                    className="w-full h-full rounded-full"
                    style={{
                        backgroundColor: "#60a5fa",
                    }}
                />
            </motion.div>
        </>
    );
}
