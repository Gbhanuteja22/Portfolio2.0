"use client";

import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import "./LogoLoop.css";

/* ── Default tech logos (CDN-based) ── */
const techLogos = [
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", title: "React" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original-wordmark.svg", title: "Next.js" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", title: "TypeScript" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", title: "Tailwind CSS" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original-wordmark.svg", title: "Python" },
    { src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg", title: "Figma" },
];

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.85, MIN_COPIES: 2, COPY_HEADROOM: 2 };

interface LogoItem {
    node?: React.ReactNode;
    src?: string;
    alt?: string;
    title?: string;
    href?: string;
    ariaLabel?: string;
    srcSet?: string;
    sizes?: string;
    width?: number;
    height?: number;
}

interface LogoLoopProps {
    logos?: LogoItem[];
    speed?: number;
    direction?: "left" | "right";
    logoHeight?: number;
    gap?: number;
    hoverSpeed?: number;
    fadeOut?: boolean;
    fadeOutColor?: string;
    scaleOnHover?: boolean;
}

function LogoLoopInner({
    logos = techLogos,
    speed = 100,
    direction = "left",
    logoHeight = 40,
    gap = 60,
    hoverSpeed = 0,
    fadeOut = false,
    fadeOutColor = "#000000",
    scaleOnHover = true,
}: LogoLoopProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const seqRef = useRef<HTMLUListElement>(null);

    const [seqWidth, setSeqWidth] = useState(0);
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
    const [isHovered, setIsHovered] = useState(false);

    const targetVelocity = useMemo(() => {
        const mag = Math.abs(speed);
        const dir = direction === "left" ? 1 : -1;
        const sign = speed < 0 ? -1 : 1;
        return mag * dir * sign;
    }, [speed, direction]);

    const updateDimensions = useCallback(() => {
        const containerWidth = containerRef.current?.clientWidth ?? 0;
        const sequenceRect = seqRef.current?.getBoundingClientRect();
        const sequenceWidth = sequenceRect?.width ?? 0;
        if (sequenceWidth > 0) {
            setSeqWidth(Math.ceil(sequenceWidth));
            const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
            setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
    }, []);

    // Resize observer
    useEffect(() => {
        if (!containerRef.current || !seqRef.current) return;
        const ro = new ResizeObserver(updateDimensions);
        ro.observe(containerRef.current);
        ro.observe(seqRef.current);
        updateDimensions();
        return () => ro.disconnect();
    }, [updateDimensions]);

    // Image loader
    useEffect(() => {
        const images = seqRef.current?.querySelectorAll("img") ?? [];
        if (images.length === 0) { updateDimensions(); return; }
        let remaining = images.length;
        const handleLoad = () => { remaining--; if (remaining === 0) updateDimensions(); };
        images.forEach((img) => {
            if ((img as HTMLImageElement).complete) handleLoad();
            else {
                img.addEventListener("load", handleLoad, { once: true });
                img.addEventListener("error", handleLoad, { once: true });
            }
        });
        return () => {
            images.forEach((img) => {
                img.removeEventListener("load", handleLoad);
                img.removeEventListener("error", handleLoad);
            });
        };
    }, [logos, gap, logoHeight, updateDimensions]);

    // Use a ref so the animation loop reads hover state without restarting
    const isHoveredRef = useRef(isHovered);
    useEffect(() => { isHoveredRef.current = isHovered; }, [isHovered]);

    // Animation loop
    useEffect(() => {
        const track = trackRef.current;
        if (!track || seqWidth <= 0) return;

        let offset = 0;
        let velocity = targetVelocity;
        let lastTs: number | null = null;
        let raf: number;

        const animate = (timestamp: number) => {
            if (lastTs === null) lastTs = timestamp;
            const dt = Math.max(0, timestamp - lastTs) / 1000;
            lastTs = timestamp;

            const target = isHoveredRef.current ? hoverSpeed : targetVelocity;
            const easing = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
            velocity += (target - velocity) * easing;

            offset = ((offset + velocity * dt) % seqWidth + seqWidth) % seqWidth;
            track.style.transform = `translate3d(${-offset}px, 0, 0)`;

            raf = requestAnimationFrame(animate);
        };

        raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [targetVelocity, seqWidth, hoverSpeed]);

    const cssVars = useMemo(() => ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor }),
    } as React.CSSProperties), [gap, logoHeight, fadeOutColor]);

    const rootCls = [
        "logoloop",
        "logoloop--horizontal",
        fadeOut && "logoloop--fade",
        scaleOnHover && "logoloop--scale-hover",
    ].filter(Boolean).join(" ");

    const renderItem = (item: LogoItem, key: React.Key) => {
        const isNode = "node" in item && item.node;
        const content = isNode ? (
            <span className="logoloop__node">{item.node}</span>
        ) : (
            <img src={item.src} alt={item.alt ?? ""} title={item.title} draggable={false} loading="lazy" />
        );
        const inner = item.href ? (
            <a className="logoloop__link" href={item.href} target="_blank" rel="noreferrer noopener" aria-label={item.title || "logo"}>
                {content}
            </a>
        ) : content;
        return <li className="logoloop__item" key={key} role="listitem">{inner}</li>;
    };

    const lists = useMemo(() =>
        Array.from({ length: copyCount }, (_, ci) => (
            <ul
                className="logoloop__list"
                key={`copy-${ci}`}
                role="list"
                aria-hidden={ci > 0}
                ref={ci === 0 ? seqRef : undefined}
            >
                {logos.map((item, ii) => renderItem(item, `${ci}-${ii}`))}
            </ul>
        )),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [copyCount, logos]
    );

    return (
        <div ref={containerRef} className={rootCls} style={cssVars} role="region" aria-label="Tech stack">
            <div
                className="logoloop__track"
                ref={trackRef}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {lists}
            </div>
        </div>
    );
}

const LogoLoop = memo(LogoLoopInner);
LogoLoop.displayName = "LogoLoop";
export default LogoLoop;
