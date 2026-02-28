"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ContainerScrollProps {
    titleComponent: React.ReactNode;
    children: React.ReactNode;
}

export default function ContainerScroll({ titleComponent, children }: ContainerScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scaleDimensions = useTransform(scrollYProgress, [0.05, 0.3], [0.85, 1]);
    const rotate = useTransform(scrollYProgress, [0.05, 0.3], [8, 0]);
    const translateY = useTransform(scrollYProgress, [0, 0.3], [80, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.15], [0.6, 1]);

    return (
        <div
            ref={containerRef}
            className="relative flex flex-col items-center justify-start py-16 md:py-32"
            style={{ perspective: "1200px" }}
        >
            {/* Title */}
            <div className="w-full max-w-5xl mx-auto mb-12 md:mb-20 px-6">
                {titleComponent}
            </div>

            {/* 3D Scrolling Container */}
            <motion.div
                style={{
                    scale: scaleDimensions,
                    rotateX: rotate,
                    translateY,
                    opacity,
                }}
                className="w-full max-w-5xl mx-auto rounded-3xl border border-gray-200 overflow-hidden shadow-lg"
            >
                <div
                    className="w-full"
                    style={{
                        background: "white",
                    }}
                >
                    {children}
                </div>
            </motion.div>
        </div>
    );
}
