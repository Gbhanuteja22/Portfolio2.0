"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./FallingText.css";

gsap.registerPlugin(ScrollTrigger);

const FallingText = ({
    className = "",
    text = "",
    highlightWords = /** @type {string[]} */ ([]),
    highlightClass = "highlighted",
    fontSize = "1rem",
}) => {
    const containerRef = useRef(null);
    const wordsRef = useRef([]);

    // Split text into word spans
    const words = text.split(" ");

    useEffect(() => {
        if (!containerRef.current || wordsRef.current.length === 0) return;

        const ctx = gsap.context(() => {
            // Generate random fall values for each word
            wordsRef.current.forEach((wordEl) => {
                if (!wordEl) return;
                const randomY = 80 + Math.random() * 200;     // fall 80–280px
                const randomRotate = (Math.random() - 0.5) * 60; // rotate ±30deg
                const randomX = (Math.random() - 0.5) * 40;   // drift ±20px

                gsap.fromTo(
                    wordEl,
                    { y: 0, rotation: 0, x: 0, opacity: 1 },
                    {
                        y: randomY,
                        rotation: randomRotate,
                        x: randomX,
                        opacity: 0.3,
                        ease: "power2.in",
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top 80%",
                            end: "bottom 20%",
                            scrub: 1,
                        },
                    }
                );
            });
        }, containerRef);

        return () => ctx.revert();
    }, [text]);

    return (
        <div
            ref={containerRef}
            className={`falling-text-container ${className}`}
            style={{ position: "relative", overflow: "hidden", pointerEvents: "none" }}
        >
            <div
                className="falling-text-target"
                style={{ fontSize, lineHeight: 1.5 }}
            >
                {words.map((word, i) => {
                    const isHighlighted = highlightWords.some((hw) => word.startsWith(hw));
                    return (
                        <span
                            key={`${word}-${i}`}
                            ref={(el) => { wordsRef.current[i] = el; }}
                            className={`word ${isHighlighted ? highlightClass : ""}`}
                            style={{ display: "inline-block", margin: "0 4px" }}
                        >
                            {word}
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default FallingText;
