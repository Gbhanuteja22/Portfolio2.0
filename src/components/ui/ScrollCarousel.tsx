"use client";
import React, { useEffect, useRef, useState, useLayoutEffect, forwardRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface FeatureItem {
    icon: LucideIcon;
    title: string;
    description: string;
    image: string;
}

export interface ScrollCarouselProps {
    features: FeatureItem[];
    className?: string;
    maxScrollHeight?: number;
}

const useFeatureAnimations = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    scrollContainerRef: React.RefObject<HTMLDivElement | null>,
    scrollContainerRef2: React.RefObject<HTMLDivElement | null>,
    progressBarRef: React.RefObject<HTMLDivElement | null>,
    cardRefs: React.MutableRefObject<HTMLDivElement[]>,
    cardRefs2: React.MutableRefObject<HTMLDivElement[]>,
    isDesktop: boolean,
    maxScrollHeight?: number
) => {
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (isDesktop) {
                const scrollWidth1 = scrollContainerRef.current?.scrollWidth || 0;
                const containerWidth = containerRef.current?.offsetWidth || 0;
                const cardWidth = cardRefs.current[0]?.offsetWidth || 0;
                const viewportOffset = (containerWidth - cardWidth) / 2;
                const finalOffset1 = scrollWidth1 - containerWidth + viewportOffset;
                const scrollDistance = maxScrollHeight || finalOffset1;

                gsap
                    .timeline({
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: "top top",
                            end: () => `+=${scrollDistance}`,
                            scrub: 1,
                            pin: true,
                        },
                    })
                    .fromTo(
                        scrollContainerRef.current,
                        { x: viewportOffset },
                        { x: -finalOffset1 + viewportOffset, ease: "none" }
                    );

                gsap.to(progressBarRef.current, {
                    width: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top top",
                        end: () => `+=${scrollDistance}`,
                        scrub: true,
                    },
                });
            } else {
                const allCards = [...cardRefs.current, ...cardRefs2.current];
                allCards.forEach((card, index) => {
                    if (card) {
                        gsap.fromTo(
                            card,
                            { opacity: 0, x: index % 2 === 0 ? -200 : 200 },
                            {
                                opacity: 1,
                                x: 0,
                                duration: 1,
                                ease: "power2.out",
                                scrollTrigger: {
                                    trigger: card,
                                    start: "top 80%",
                                    toggleActions: "play none none none",
                                    once: true,
                                },
                            }
                        );
                    }
                });
            }
        }, containerRef);
        return () => ctx.revert();
    }, [isDesktop, maxScrollHeight]);
};

export const ScrollCarousel = forwardRef<HTMLDivElement, ScrollCarouselProps>(
    ({ features, className, maxScrollHeight }, ref) => {
        const containerRef = useRef<HTMLDivElement>(null);
        const scrollContainerRef = useRef<HTMLDivElement>(null);
        const scrollContainerRef2 = useRef<HTMLDivElement>(null);
        const progressBarRef = useRef<HTMLDivElement>(null);
        const cardRefs = useRef<HTMLDivElement[]>([]);
        const cardRefs2 = useRef<HTMLDivElement[]>([]);
        const [isDesktop, setIsDesktop] = useState(false);

        useEffect(() => {
            const checkDesktop = () =>
                setIsDesktop(window.matchMedia("(min-width: 768px)").matches);
            checkDesktop();
            window.addEventListener("resize", checkDesktop);
            return () => window.removeEventListener("resize", checkDesktop);
        }, []);

        useFeatureAnimations(
            containerRef,
            scrollContainerRef,
            scrollContainerRef2,
            progressBarRef,
            cardRefs,
            cardRefs2,
            isDesktop,
            maxScrollHeight
        );

        const renderFeatureCards = (
            featureSet: FeatureItem[],
            refs: React.MutableRefObject<HTMLDivElement[]>
        ) =>
            featureSet.map((feature, index) => (
                <div
                    key={index}
                    ref={(el: HTMLDivElement | null) => {
                        if (el) refs.current[index] = el;
                    }}
                    className="feature-card flex-shrink-0 w-[85vw] md:w-[45vw] lg:w-[28vw] xl:w-[22vw] h-[400px] z-10 gap-4 group relative transition-all duration-300 ease-in-out"
                >
                    <div
                        className={cn(
                            "relative h-full p-6 lg:p-8 rounded-3xl flex flex-col z-10 transition-all duration-300 my-4 overflow-hidden",
                            "border border-white/[0.08] text-white",
                            feature.image
                                ? "backdrop-blur-lg bg-white/5 justify-end"
                                : "justify-between",
                            "group-hover:scale-105 group-hover:border-white/[0.15]"
                        )}
                        style={
                            !feature.image
                                ? {
                                    backdropFilter: "blur(16px)",
                                    background:
                                        "linear-gradient(145deg, rgba(30,30,42,0.95) 0%, rgba(18,18,24,0.95) 100%)",
                                }
                                : undefined
                        }
                    >
                        {/* Accent glow on hover */}
                        {!feature.image && (
                            <div
                                className="absolute -top-10 -left-10 w-32 h-32 rounded-full group-hover:opacity-[0.08] opacity-0 transition-opacity duration-500"
                                style={{ background: "var(--accent-blue)", filter: "blur(40px)" }}
                            />
                        )}

                        {feature.image && (
                            <img
                                src={feature.image}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover z-[-1] rounded-3xl opacity-40"
                            />
                        )}

                        {/* Decorative index badge for text-only cards */}
                        {!feature.image && (
                            <div className="flex items-center justify-between">
                                <span
                                    className="text-[11px] px-2.5 py-1 rounded-full border border-white/[0.06] text-white/25"
                                    style={{ fontFamily: "var(--font-mono)" }}
                                >
                                    0{index + 1}
                                </span>
                                <span className="text-3xl text-white/[0.04] font-serif">
                                    &ldquo;
                                </span>
                            </div>
                        )}

                        <div className="z-10 w-full mt-auto">
                            <div
                                className={cn(
                                    "flex flex-col justify-end h-full",
                                    feature.image ? "text-center" : "text-left"
                                )}
                            >
                                <h3
                                    className="text-lg mb-3 font-bold text-white/90 transition-all duration-300 group-hover:text-white"
                                    style={{ fontFamily: "var(--font-heading)" }}
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-white/40 text-[13px] leading-relaxed group-hover:text-white/55 transition-colors">
                                    {feature.description}
                                </p>
                            </div>
                        </div>

                        {/* Accent bottom line on hover */}
                        {!feature.image && (
                            <div
                                className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{
                                    background:
                                        "linear-gradient(90deg, transparent 0%, var(--accent-blue) 30%, var(--accent-indigo) 70%, transparent 100%)",
                                }}
                            />
                        )}
                    </div>
                </div>
            ));

        return (
            <section
                className={cn(
                    "bg-transparent text-foreground relative overflow-hidden",
                    className
                )}
                ref={ref}
            >
                <div
                    ref={containerRef}
                    className="relative overflow-hidden md:h-screen md:py-20 flex flex-col gap-0 z-10 lg:[mask-image:_linear-gradient(to_right,transparent_0,_black_5%,_black_95%,transparent_100%)]"
                >
                    <div
                        ref={scrollContainerRef}
                        className="flex flex-col md:flex-row gap-8 items-center h-full px-6 md:px-0"
                    >
                        {renderFeatureCards(features, cardRefs)}
                    </div>
                    {isDesktop && (
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-2 bg-white/10 z-50 overflow-hidden rounded-full">
                            <div
                                ref={progressBarRef}
                                className="h-full rounded-full relative overflow-hidden transition-all duration-100"
                                style={{
                                    width: "0%",
                                    background:
                                        "linear-gradient(90deg, var(--accent-blue), var(--accent-indigo))",
                                }}
                            />
                        </div>
                    )}
                </div>
            </section>
        );
    }
);
ScrollCarousel.displayName = "ScrollCarousel";
export default ScrollCarousel;
