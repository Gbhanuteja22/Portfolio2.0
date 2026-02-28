"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedListProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export function AnimatedList({ children, className, delay = 1000 }: AnimatedListProps) {
    const [visibleCount, setVisibleCount] = useState(0);
    const sectionRef = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);

    // Observe when the container enters the viewport
    useEffect(() => {
        if (!sectionRef.current) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const childArray = useMemo(() => React.Children.toArray(children), [children]);
    const total = childArray.length;

    // Reveal items one by one after entering viewport
    useEffect(() => {
        if (!inView || visibleCount >= total) return;
        const timer = setTimeout(() => {
            setVisibleCount((c) => c + 1);
        }, delay);
        return () => clearTimeout(timer);
    }, [inView, visibleCount, total, delay]);

    return (
        <div ref={sectionRef} className={cn("flex flex-col gap-4", className)}>
            <AnimatePresence>
                {childArray.slice(0, visibleCount).map((child, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                    >
                        {child}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}

export default AnimatedList;
