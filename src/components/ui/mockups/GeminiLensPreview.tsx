"use client";

/* GeminiLens — Corporate dark purple/blue, document scan + data extraction */
export default function GeminiLensPreview() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0d0a1f] via-[#12102a] to-[#0a0820] overflow-hidden relative">
            {/* Background gradient glow */}
            <div className="absolute top-[30%] left-[40%] w-32 h-32 rounded-full bg-indigo-600/10 blur-3xl" />

            {/* Document being scanned */}
            <div className="relative z-10 flex items-start gap-4">
                {/* Document icon */}
                <div className="relative">
                    <svg width="52" height="64" viewBox="0 0 52 64" fill="none">
                        {/* Page */}
                        <rect x="2" y="2" width="40" height="56" rx="4" fill="rgba(99,102,241,0.12)" stroke="rgba(129,140,248,0.4)" strokeWidth="1.5" />
                        {/* Folded corner */}
                        <path d="M30 2 L42 14 L30 14 Z" fill="rgba(99,102,241,0.2)" stroke="rgba(129,140,248,0.3)" strokeWidth="1" />
                        {/* Text lines */}
                        <rect x="8" y="20" width="26" height="2" rx="1" fill="rgba(165,180,252,0.25)" />
                        <rect x="8" y="26" width="22" height="2" rx="1" fill="rgba(165,180,252,0.18)" />
                        <rect x="8" y="32" width="28" height="2" rx="1" fill="rgba(165,180,252,0.15)" />
                        <rect x="8" y="38" width="18" height="2" rx="1" fill="rgba(165,180,252,0.12)" />
                        <rect x="8" y="44" width="24" height="2" rx="1" fill="rgba(165,180,252,0.10)" />
                    </svg>

                    {/* Scanning line — glowing bar */}
                    <div className="absolute left-1 right-3 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/80 to-transparent animate-pulse top-[45%]"
                        style={{ boxShadow: "0 0 10px rgba(129,140,248,0.5)" }} />
                </div>

                {/* Extracted data — mini charts */}
                <div className="flex flex-col gap-2 pt-2">
                    {/* Bar chart */}
                    <div className="flex items-end gap-[3px] h-8">
                        {[60, 85, 45, 72, 55, 90].map((h, i) => (
                            <div key={i} className="w-[5px] rounded-t-sm bg-gradient-to-t from-indigo-500/60 to-violet-400/40"
                                style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                        ))}
                    </div>
                    {/* Insight pill */}
                    <div className="px-2 py-0.5 rounded-full bg-violet-500/15 border border-violet-400/25 text-violet-300/60 text-[7px] text-center whitespace-nowrap">
                        AI Insights
                    </div>
                    {/* Donut chart */}
                    <svg width="28" height="28" viewBox="0 0 28 28" className="mx-auto">
                        <circle cx="14" cy="14" r="10" fill="none" stroke="rgba(99,102,241,0.15)" strokeWidth="3" />
                        <circle cx="14" cy="14" r="10" fill="none" stroke="rgba(129,140,248,0.5)" strokeWidth="3"
                            strokeDasharray="47 16" strokeLinecap="round" transform="rotate(-90 14 14)" />
                    </svg>
                </div>
            </div>

            {/* Floating data nodes */}
            <div className="absolute bottom-[12%] left-[10%] px-1.5 py-0.5 rounded bg-indigo-500/10 border border-indigo-400/20 text-indigo-300/50 text-[7px]">Summary</div>
            <div className="absolute top-[15%] right-[10%] px-1.5 py-0.5 rounded bg-violet-500/10 border border-violet-400/20 text-violet-300/50 text-[7px]">Extract</div>
        </div>
    );
}
