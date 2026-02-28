"use client";

/* CodeStory — Hacker/Terminal theme (dark slate + green) */
export default function CodeStoryPreview() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a1210] via-[#0d1a15] to-[#081210] overflow-hidden relative font-mono">
            {/* Green terminal glow */}
            <div className="absolute top-[35%] left-[45%] w-28 h-28 rounded-full bg-emerald-600/8 blur-3xl" />

            {/* Folder tree on the left */}
            <div className="relative z-10 flex items-start gap-5">
                <div className="flex flex-col gap-[2px] text-[8px]">
                    {/* Root */}
                    <div className="text-emerald-400/80 font-bold">📂 repo/</div>
                    {/* Tree branches */}
                    {[
                        { indent: 1, name: "src/", color: "text-emerald-300/60" },
                        { indent: 2, name: "index.ts", color: "text-green-400/45" },
                        { indent: 2, name: "utils.ts", color: "text-green-400/45" },
                        { indent: 1, name: "lib/", color: "text-emerald-300/60" },
                        { indent: 2, name: "api.ts", color: "text-green-400/45" },
                        { indent: 1, name: "README", color: "text-slate-400/50" },
                    ].map((f, i) => (
                        <div key={i} className={`${f.color} whitespace-nowrap`} style={{ paddingLeft: f.indent * 8 }}>
                            {f.name.endsWith("/") ? "├─ 📁 " : "├─ "}{f.name}
                        </div>
                    ))}
                </div>

                {/* Arrow connecting tree to nodes */}
                <svg width="24" height="60" viewBox="0 0 24 60" className="mt-4 opacity-40">
                    <path d="M2 30 C12 30 12 15 22 15" stroke="#34d399" strokeWidth="1" fill="none" strokeDasharray="3,2" />
                    <path d="M2 30 C12 30 12 30 22 30" stroke="#34d399" strokeWidth="1" fill="none" strokeDasharray="3,2" />
                    <path d="M2 30 C12 30 12 45 22 45" stroke="#34d399" strokeWidth="1" fill="none" strokeDasharray="3,2" />
                </svg>

                {/* Interconnected code nodes */}
                <div className="flex flex-col gap-2 mt-1">
                    {[
                        { label: "Auth", color: "border-emerald-500/40 bg-emerald-500/10" },
                        { label: "API", color: "border-green-500/35 bg-green-500/8" },
                        { label: "DB", color: "border-teal-500/35 bg-teal-500/8" },
                    ].map((node) => (
                        <div key={node.label} className={`px-2.5 py-1 rounded border ${node.color} text-emerald-300/60 text-[8px] text-center`}>
                            {node.label}
                        </div>
                    ))}
                </div>
            </div>

            {/* Terminal prompt at bottom */}
            <div className="absolute bottom-[8%] left-[8%] right-[8%] flex items-center gap-1 text-[7px]">
                <span className="text-emerald-400/50">$</span>
                <span className="text-green-300/35">codestory analyze https://github.com/...</span>
                <span className="w-1 h-3 bg-emerald-400/50 animate-pulse" />
            </div>
        </div>
    );
}
