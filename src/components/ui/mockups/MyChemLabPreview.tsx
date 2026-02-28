"use client";

/* MyChem Lab — Light/Glassmorphic theme with rich lab elements */
export default function MyChemLabPreview() {
    return (
        <div className="w-full h-full flex items-center justify-center overflow-hidden relative"
            style={{ background: "linear-gradient(135deg, #e8f4f8 0%, #dce8f0 30%, #f0f4f8 60%, #e4ecf4 100%)" }}>
            {/* Glassmorphic glow */}
            <div className="absolute top-[20%] left-[30%] w-28 h-28 rounded-full bg-cyan-300/30 blur-2xl" />
            <div className="absolute bottom-[25%] right-[20%] w-20 h-20 rounded-full bg-emerald-300/25 blur-2xl" />

            {/* Molecular structure — node diagram top-right */}
            <svg className="absolute top-[10%] right-[8%] opacity-60" width="60" height="50" viewBox="0 0 60 50">
                <circle cx="10" cy="15" r="5" fill="#06b6d4" fillOpacity="0.4" stroke="#06b6d4" strokeWidth="1.5" />
                <circle cx="35" cy="8" r="4" fill="#059669" fillOpacity="0.35" stroke="#059669" strokeWidth="1.5" />
                <circle cx="50" cy="30" r="5" fill="#06b6d4" fillOpacity="0.4" stroke="#06b6d4" strokeWidth="1.5" />
                <circle cx="25" cy="40" r="4" fill="#d97706" fillOpacity="0.35" stroke="#d97706" strokeWidth="1.5" />
                <line x1="10" y1="15" x2="35" y2="8" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="35" y1="8" x2="50" y2="30" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="50" y1="30" x2="25" y2="40" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
                <line x1="25" y1="40" x2="10" y2="15" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
            </svg>

            {/* Center flask */}
            <div className="relative z-10" style={{ width: "30%", maxWidth: 90 }}>
                {/* Flask neck */}
                <div className="w-[30%] h-4 mx-auto border-x-2 border-t-2 border-slate-400/50 rounded-t-sm bg-white/40 backdrop-blur-sm" />
                {/* Flask body */}
                <div className="relative w-full aspect-square border-2 border-slate-400/40 rounded-b-[35%] overflow-hidden bg-white/30 backdrop-blur-sm mt-[-1px]">
                    {/* Liquid */}
                    <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-emerald-400/60 via-cyan-300/40 to-transparent rounded-b-[30%]" />
                    {/* Bubbles */}
                    <div className="absolute bottom-[12%] left-[28%] w-2 h-2 rounded-full bg-white/60 animate-bounce" style={{ animationDuration: "1.4s" }} />
                    <div className="absolute bottom-[22%] left-[55%] w-1.5 h-1.5 rounded-full bg-white/50 animate-bounce" style={{ animationDuration: "1.8s", animationDelay: "0.3s" }} />
                    <div className="absolute bottom-[8%] left-[68%] w-2.5 h-2.5 rounded-full bg-white/45 animate-bounce" style={{ animationDuration: "2s", animationDelay: "0.6s" }} />
                </div>
            </div>

            {/* Bunsen burner base */}
            <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 z-10">
                <div className="w-8 h-1.5 bg-slate-500/30 rounded-sm mx-auto" />
                <div className="w-12 h-1 bg-slate-500/20 rounded-b-sm mx-auto" />
            </div>

            {/* Periodic table element blocks — scattered */}
            {[
                { sym: "H", x: "8%", y: "65%", bg: "bg-sky-400/20", border: "border-sky-400/40", text: "text-sky-700/70" },
                { sym: "O", x: "82%", y: "60%", bg: "bg-red-400/15", border: "border-red-400/35", text: "text-red-600/60" },
                { sym: "Na", x: "12%", y: "20%", bg: "bg-amber-400/15", border: "border-amber-400/35", text: "text-amber-700/60" },
                { sym: "Fe", x: "75%", y: "75%", bg: "bg-slate-400/15", border: "border-slate-400/35", text: "text-slate-600/60" },
            ].map((el) => (
                <div key={el.sym}
                    className={`absolute ${el.bg} ${el.border} ${el.text} border rounded-md px-1.5 py-0.5 text-[10px] font-bold backdrop-blur-sm`}
                    style={{ left: el.x, top: el.y }}>
                    {el.sym}
                </div>
            ))}
        </div>
    );
}
