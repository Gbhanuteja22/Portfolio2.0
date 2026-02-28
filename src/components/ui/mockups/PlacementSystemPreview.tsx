"use client";

/* Flat cartoon graduation cap + progress card */
export default function PlacementSystemPreview() {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0a1628] to-[#081020] overflow-hidden relative gap-3 p-4">
            {/* Background glow */}
            <div className="absolute w-36 h-36 rounded-full bg-blue-500/10 blur-3xl" />

            {/* Graduation cap icon */}
            <div className="relative z-10">
                {/* Cap top (diamond) */}
                <div className="w-16 h-4 bg-blue-500/60 transform rotate-0 mx-auto rounded-sm" style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
                {/* Cap board */}
                <div className="w-20 h-3 bg-blue-400/50 rounded-sm mx-auto -mt-1" />
                {/* Tassel */}
                <div className="absolute right-2 top-1/2 w-0.5 h-5 bg-amber-400/70 rounded-full" />
                <div className="absolute right-1 top-[calc(50%+18px)] w-2 h-2 rounded-full bg-amber-400/60" />
            </div>

            {/* Stat cards */}
            <div className="relative z-10 flex gap-2 mt-2">
                {[
                    { label: "Placed", value: "86%", color: "text-emerald-300/80 border-emerald-500/20" },
                    { label: "Companies", value: "42", color: "text-blue-300/80 border-blue-500/20" },
                    { label: "Offers", value: "128", color: "text-purple-300/80 border-purple-500/20" },
                ].map((s) => (
                    <div key={s.label} className={`text-center px-2.5 py-1.5 rounded-lg bg-white/[0.04] border ${s.color}`}>
                        <div className={`font-bold text-sm ${s.color.split(" ")[0]}`}>{s.value}</div>
                        <div className="text-[8px] text-white/30">{s.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
