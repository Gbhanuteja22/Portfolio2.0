"use client";

/* GestureArt — High-contrast vibrant, wireframe hand with tracking points */
export default function GestureArtPreview() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a0a2e] via-[#0f0820] to-[#150a25] overflow-hidden relative">
            {/* Background neon glow */}
            <div className="absolute top-[40%] left-[45%] w-36 h-36 rounded-full bg-fuchsia-600/10 blur-3xl" />

            {/* Wireframe hand with tracking nodes */}
            <svg className="relative z-10" width="110" height="130" viewBox="0 0 110 130" fill="none">
                {/* Palm base */}
                <path d="M35 110 Q25 85 30 70 L50 68 L65 68 L80 70 Q85 85 75 110 Z"
                    fill="rgba(168,85,247,0.08)" stroke="rgba(192,132,252,0.35)" strokeWidth="1.5" />

                {/* Thumb */}
                <line x1="30" y1="70" x2="15" y2="55" stroke="rgba(236,72,153,0.4)" strokeWidth="1.5" />
                <line x1="15" y1="55" x2="8" y2="40" stroke="rgba(236,72,153,0.35)" strokeWidth="1.5" />

                {/* Index */}
                <line x1="42" y1="68" x2="38" y2="42" stroke="rgba(168,85,247,0.4)" strokeWidth="1.5" />
                <line x1="38" y1="42" x2="35" y2="22" stroke="rgba(168,85,247,0.35)" strokeWidth="1.5" />
                <line x1="35" y1="22" x2="33" y2="8" stroke="rgba(168,85,247,0.3)" strokeWidth="1.5" />

                {/* Middle */}
                <line x1="55" y1="68" x2="54" y2="38" stroke="rgba(139,92,246,0.4)" strokeWidth="1.5" />
                <line x1="54" y1="38" x2="53" y2="18" stroke="rgba(139,92,246,0.35)" strokeWidth="1.5" />
                <line x1="53" y1="18" x2="52" y2="4" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5" />

                {/* Ring */}
                <line x1="65" y1="68" x2="68" y2="40" stroke="rgba(124,58,237,0.4)" strokeWidth="1.5" />
                <line x1="68" y1="40" x2="70" y2="22" stroke="rgba(124,58,237,0.35)" strokeWidth="1.5" />
                <line x1="70" y1="22" x2="72" y2="10" stroke="rgba(124,58,237,0.3)" strokeWidth="1.5" />

                {/* Pinky */}
                <line x1="78" y1="70" x2="84" y2="48" stroke="rgba(109,40,217,0.4)" strokeWidth="1.5" />
                <line x1="84" y1="48" x2="88" y2="32" stroke="rgba(109,40,217,0.35)" strokeWidth="1.5" />

                {/* Joint tracking nodes — glowing dots */}
                {/* Thumb */}
                <circle cx="30" cy="70" r="3" fill="rgba(236,72,153,0.7)" />
                <circle cx="15" cy="55" r="2.5" fill="rgba(236,72,153,0.6)" />
                <circle cx="8" cy="40" r="2" fill="rgba(236,72,153,0.7)">
                    <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
                </circle>

                {/* Index */}
                <circle cx="42" cy="68" r="3" fill="rgba(168,85,247,0.7)" />
                <circle cx="38" cy="42" r="2.5" fill="rgba(168,85,247,0.6)" />
                <circle cx="35" cy="22" r="2.5" fill="rgba(168,85,247,0.6)" />
                <circle cx="33" cy="8" r="2" fill="rgba(168,85,247,0.7)">
                    <animate attributeName="r" values="2;3.5;2" dur="1.8s" repeatCount="indefinite" />
                </circle>

                {/* Middle */}
                <circle cx="55" cy="68" r="3" fill="rgba(139,92,246,0.7)" />
                <circle cx="54" cy="38" r="2.5" fill="rgba(139,92,246,0.6)" />
                <circle cx="53" cy="18" r="2.5" fill="rgba(139,92,246,0.6)" />
                <circle cx="52" cy="4" r="2" fill="rgba(139,92,246,0.7)">
                    <animate attributeName="r" values="2;3;2" dur="2.2s" repeatCount="indefinite" />
                </circle>

                {/* Ring */}
                <circle cx="65" cy="68" r="3" fill="rgba(124,58,237,0.7)" />
                <circle cx="68" cy="40" r="2.5" fill="rgba(124,58,237,0.6)" />
                <circle cx="70" cy="22" r="2.5" fill="rgba(124,58,237,0.6)" />
                <circle cx="72" cy="10" r="2" fill="rgba(124,58,237,0.7)">
                    <animate attributeName="r" values="2;3;2" dur="2.4s" repeatCount="indefinite" />
                </circle>

                {/* Pinky */}
                <circle cx="78" cy="70" r="3" fill="rgba(109,40,217,0.7)" />
                <circle cx="84" cy="48" r="2.5" fill="rgba(109,40,217,0.6)" />
                <circle cx="88" cy="32" r="2" fill="rgba(109,40,217,0.7)">
                    <animate attributeName="r" values="2;3;2" dur="1.6s" repeatCount="indefinite" />
                </circle>

                {/* Wrist */}
                <circle cx="55" cy="110" r="3.5" fill="rgba(192,132,252,0.5)" />
            </svg>

            {/* Detection label */}
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400/70 animate-pulse" />
                <span className="text-fuchsia-300/50 text-[8px] font-medium" style={{ fontFamily: "var(--font-mono)" }}>Tracking 21 keypoints</span>
            </div>
        </div>
    );
}
