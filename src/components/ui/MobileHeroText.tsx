"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MobileHeroTextProps {
    greeting?: string;
    name: string;
    lastName: string;
    subtitle: string;
}

export default function MobileHeroText({
    greeting = "Hi 👋🏻, I am",
    name = "Bhanu Teja",
    lastName = "Gummadavelli",
    subtitle = "Turning ideas into digital reality.",
}: MobileHeroTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const wordsRef = useRef<HTMLSpanElement[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Split all text into word tokens with metadata
    const allWords = [
        ...greeting.split(" ").map((w) => ({ text: w, type: "greeting" as const })),
        ...name.split(" ").map((w) => ({ text: w, type: "name" as const })),
        { text: lastName, type: "lastName" as const },
        ...subtitle.split(" ").map((w) => ({ text: w, type: "subtitle" as const })),
    ];

    useEffect(() => {
        if (!mounted || !containerRef.current) return;

        // Wait one frame for callback refs to populate
        const rafId = requestAnimationFrame(() => {
            if (wordsRef.current.length === 0) return;

            const ctx = gsap.context(() => {
                wordsRef.current.forEach((el, i) => {
                    if (!el) return;

                    // Deterministic "random" values based on index
                    const seed = ((i * 7 + 13) % 17) / 17;
                    const randomY = 60 + seed * 180;
                    const randomRotate = (seed - 0.5) * 50;
                    const randomX = (((i * 11 + 3) % 13) / 13 - 0.5) * 60;

                    gsap.fromTo(
                        el,
                        { y: 0, rotation: 0, x: 0, opacity: 1, scale: 1 },
                        {
                            y: randomY,
                            rotation: randomRotate,
                            x: randomX,
                            opacity: 0,
                            scale: 0.8,
                            ease: "power2.in",
                            scrollTrigger: {
                                trigger: containerRef.current,
                                start: "40% top",
                                end: "+=300",
                                scrub: 1,
                            },
                        }
                    );
                });
            }, containerRef);

            // Store cleanup
            return () => ctx.revert();
        });

        return () => cancelAnimationFrame(rafId);
    }, [mounted]);

    if (!mounted) return null;

    return (
        <div ref={containerRef} className="text-center px-2">
            {/* Greeting line */}
            <p
                className="text-sm font-medium mb-2 leading-relaxed"
                style={{ fontFamily: "var(--font-mono)" }}
            >
                {allWords
                    .filter((w) => w.type === "greeting")
                    .map((w, i) => (
                        <span
                            key={`g-${i}`}
                            ref={(el) => {
                                if (el) wordsRef.current.push(el);
                            }}
                            className="inline-block mr-1.5 text-blue-500"
                        >
                            {w.text}
                        </span>
                    ))}
            </p>

            {/* Name heading */}
            <h1
                className="text-3xl sm:text-4xl font-bold text-slate-800 mb-3"
                style={{ fontFamily: "var(--font-heading)" }}
            >
                {allWords
                    .filter((w) => w.type === "name")
                    .map((w, i) => (
                        <span
                            key={`n-${i}`}
                            ref={(el) => {
                                if (el) wordsRef.current.push(el);
                            }}
                            className="inline-block mr-1.5"
                        >
                            {w.text}
                        </span>
                    ))}{" "}
                <br className="block" />
                {allWords
                    .filter((w) => w.type === "lastName")
                    .map((w, i) => (
                        <span
                            key={`ln-${i}`}
                            ref={(el) => {
                                if (el) wordsRef.current.push(el);
                            }}
                            className="inline-block text-gradient"
                        >
                            {w.text}
                        </span>
                    ))}
            </h1>

            {/* Subtitle */}
            <p className="text-base text-slate-500 leading-relaxed">
                {allWords
                    .filter((w) => w.type === "subtitle")
                    .map((w, i) => (
                        <span
                            key={`s-${i}`}
                            ref={(el) => {
                                if (el) wordsRef.current.push(el);
                            }}
                            className="inline-block mr-1.5"
                        >
                            {w.text}
                        </span>
                    ))}
            </p>
        </div>
    );
}
