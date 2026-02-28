"use client";

/* Flat cartoon vault/lock + chain links */
export default function DeFiVaultPreview() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a0618] to-[#06040f] overflow-hidden relative">
            {/* Background neon glow */}
            <div className="absolute w-40 h-40 rounded-full bg-purple-600/10 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center gap-3">
                {/* Vault / Lock */}
                <div className="relative">
                    {/* Lock body */}
                    <div className="w-14 h-12 rounded-lg bg-gradient-to-br from-purple-500/30 to-blue-600/20 border-2 border-purple-400/40 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.15)]">
                        {/* Keyhole */}
                        <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-purple-300/50 border border-purple-300/60" />
                            <div className="w-1.5 h-2 bg-purple-300/40 -mt-0.5 rounded-b-sm" />
                        </div>
                    </div>
                    {/* Lock shackle */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-6 border-[3px] border-purple-400/40 rounded-t-full border-b-0" />
                </div>

                {/* Chain links */}
                <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-3 h-5 rounded-full border-2 border-purple-400/30" style={{ marginLeft: i > 0 ? -4 : 0 }} />
                    ))}
                </div>

                {/* ETH balance */}
                <div className="text-center">
                    <div className="text-purple-300/70 font-bold text-sm">0.00 ETH</div>
                    <div className="text-white/20 text-[8px]">Decentralized Vault</div>
                </div>
            </div>
        </div>
    );
}
