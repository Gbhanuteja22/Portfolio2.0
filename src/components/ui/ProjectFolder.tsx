"use client";

import Link from "next/link";
import "./Folder.css";

function darkenColor(hex: string, pct: number) {
    let c = hex.startsWith("#") ? hex.slice(1) : hex;
    if (c.length === 3) c = c.split("").map((x) => x + x).join("");
    const n = parseInt(c, 16);
    const r = Math.max(0, Math.floor(((n >> 16) & 0xff) * (1 - pct)));
    const g = Math.max(0, Math.floor(((n >> 8) & 0xff) * (1 - pct)));
    const b = Math.max(0, Math.floor((n & 0xff) * (1 - pct)));
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

interface ProjectFolderProps {
    title: string;
    count: number;
    color: string;
    href: string;
    icon: string;
    size?: number;
}

export default function ProjectFolder({ title, count, color, href, size = 1.5 }: ProjectFolderProps) {
    const folderStyle = {
        "--folder-color": color,
        "--folder-back-color": darkenColor(color, 0.15),
    } as React.CSSProperties;

    return (
        <Link href={href} className="block group cursor-pointer" style={{ textDecoration: "none" }}>
            <div className="flex flex-col items-center gap-6">
                <div style={{ transform: `scale(${size})`, transformOrigin: "bottom center" }}>
                    <div className="folder" style={folderStyle}>
                        <div className="folder__back">
                            {/* Papers / document rectangles inside folder */}
                            <div className="paper paper-1" />
                            <div className="paper paper-2" />
                            <div className="paper paper-3" />
                            <div className="folder__front" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
