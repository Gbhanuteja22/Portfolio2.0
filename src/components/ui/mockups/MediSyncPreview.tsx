"use client";

/* Flat cartoon stethoscope + heart */
export default function MediSyncPreview() {
    return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a1628] to-[#081020] overflow-hidden relative">
            {/* Background glow */}
            <div className="absolute w-32 h-32 rounded-full bg-teal-500/10 blur-3xl" />

            <div className="relative z-10 flex flex-col items-center gap-3">
                {/* Heart with pulse */}
                <div className="relative">
                    <svg width="56" height="50" viewBox="0 0 56 50" fill="none" className="drop-shadow-lg">
                        <path d="M28 46 C14 36 2 26 2 15 C2 8 7 3 14 3 C20 3 25 7 28 12 C31 7 36 3 42 3 C49 3 54 8 54 15 C54 26 42 36 28 46Z"
                            fill="rgba(239,68,68,0.25)" stroke="rgba(248,113,113,0.6)" strokeWidth="2" />
                    </svg>
                    {/* Pulse line */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-[2px] animate-pulse">
                        <svg width="32" height="12" viewBox="0 0 32 12">
                            <polyline points="0,6 8,6 11,1 14,11 17,3 20,9 23,6 32,6" fill="none" stroke="rgba(248,113,113,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Appointment pills */}
                <div className="flex gap-1.5">
                    <div className="px-2 py-1 rounded-full bg-teal-500/15 border border-teal-400/25 text-teal-300/70 text-[9px]">Appointments</div>
                    <div className="px-2 py-1 rounded-full bg-blue-500/15 border border-blue-400/25 text-blue-300/70 text-[9px]">Prescriptions</div>
                </div>
            </div>
        </div>
    );
}
