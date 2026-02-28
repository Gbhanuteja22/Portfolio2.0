"use client";

import { useEffect, useRef } from "react";

interface SquaresProps {
    speed?: number;
    squareSize?: number;
    direction?: "up" | "down" | "left" | "right" | "diagonal";
    borderColor?: string;
    hoverFillColor?: string;
}

export default function Squares({
    speed = 0.35,
    squareSize = 30,
    direction = "down",
    borderColor = "#e5e7eb",
    hoverFillColor = "#f3f4f6",
}: SquaresProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });
    const offsetRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        const handleLeave = () => {
            mouseRef.current = { x: -1000, y: -1000 };
        };

        window.addEventListener("mousemove", handleMouse);
        window.addEventListener("mouseleave", handleLeave);
        window.addEventListener("resize", resize);

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            offsetRef.current += speed;
            const offset = offsetRef.current % squareSize;

            const cols = Math.ceil(canvas.width / squareSize) + 1;
            const rows = Math.ceil(canvas.height / squareSize) + 1;

            for (let row = -1; row < rows; row++) {
                for (let col = -1; col < cols; col++) {
                    let x = col * squareSize;
                    let y = row * squareSize;

                    // Apply directional offset
                    switch (direction) {
                        case "down":
                            y += offset;
                            break;
                        case "up":
                            y -= offset;
                            break;
                        case "right":
                            x += offset;
                            break;
                        case "left":
                            x -= offset;
                            break;
                        case "diagonal":
                            x += offset * 0.7;
                            y += offset * 0.7;
                            break;
                    }

                    // Check proximity to mouse for hover effect
                    const cx = x + squareSize / 2;
                    const cy = y + squareSize / 2;
                    const dx = cx - mouseRef.current.x;
                    const dy = cy - mouseRef.current.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    const hoverRadius = squareSize * 3.5;

                    if (dist < hoverRadius) {
                        const alpha = 1 - dist / hoverRadius;
                        ctx.fillStyle = hoverFillColor;
                        ctx.globalAlpha = alpha * 0.6;
                        ctx.fillRect(x, y, squareSize, squareSize);
                        ctx.globalAlpha = 1;
                    }

                    // Draw grid lines
                    ctx.strokeStyle = borderColor;
                    ctx.lineWidth = 0.5;
                    ctx.strokeRect(x, y, squareSize, squareSize);
                }
            }

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("mousemove", handleMouse);
            window.removeEventListener("mouseleave", handleLeave);
            window.removeEventListener("resize", resize);
        };
    }, [speed, squareSize, direction, borderColor, hoverFillColor]);

    return (
        <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ display: "block" }}
        />
    );
}
