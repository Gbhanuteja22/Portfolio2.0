"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/* ── DeFiVault Crypto Wallet Card Preview ── */
function DeFiVaultPreview() {
    return (
        <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center relative overflow-hidden p-6">
            {/* Decorative glow */}
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="relative w-full max-w-[260px] flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M12 22l10-5V7l-10 5-10-5v10l10 5z" opacity="0.6" /></svg>
                        </div>
                        <span className="text-[10px] font-semibold text-white/60" style={{ fontFamily: "var(--font-mono)" }}>DeFiVault</span>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                {/* Balance */}
                <div className="text-center py-2">
                    <p className="text-[8px] text-white/30 uppercase tracking-widest mb-1">Total Balance</p>
                    <p className="text-xl font-bold text-white tracking-tight" style={{ fontFamily: "var(--font-heading)" }}>0.00 ETH</p>
                    <p className="text-[9px] text-white/20 mt-0.5">≈ $0.00 USD</p>
                </div>

                {/* Send / Receive buttons */}
                <div className="flex gap-2">
                    <div className="flex-1 py-1.5 rounded-lg bg-emerald-500/20 border border-emerald-500/30 text-center">
                        <span className="text-[9px] font-medium text-emerald-400">↑ Send</span>
                    </div>
                    <div className="flex-1 py-1.5 rounded-lg bg-cyan-500/20 border border-cyan-500/30 text-center">
                        <span className="text-[9px] font-medium text-cyan-400">↓ Receive</span>
                    </div>
                </div>

                {/* Mini transaction list */}
                <div className="flex flex-col gap-1 mt-1">
                    {[
                        { label: "Deposit", amount: "+0.5 ETH", color: "text-emerald-400" },
                        { label: "Withdraw", amount: "-0.2 ETH", color: "text-red-400" },
                        { label: "Deposit", amount: "+1.0 ETH", color: "text-emerald-400" },
                    ].map((tx, i) => (
                        <div key={i} className="flex items-center justify-between px-2 py-1 rounded bg-white/[0.03]">
                            <span className="text-[8px] text-white/30">{tx.label}</span>
                            <span className={`text-[8px] font-medium ${tx.color}`}>{tx.amount}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

const projects = [
    {
        title: "DeFiVault",
        description: "Decentralized Banking System — connect your wallet, deposit/withdraw ETH, and interact with verified smart contracts on-chain.",
        tags: ["Solidity", "Ethers.js", "React", "MetaMask", "Web3"],
    },
];

const badgePositions = [
    { top: "14%", left: "10%" },
    { top: "20%", left: "62%" },
    { top: "50%", left: "18%" },
    { top: "55%", left: "68%" },
    { top: "75%", left: "35%" },
];

export default function BlockchainProjectsPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-8 sm:px-12 md:px-20 lg:px-28">
            <div className="max-w-5xl mx-auto">
                <Link href="/#projects">
                    <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-sm text-slate-400 hover:text-slate-700 transition-colors mb-8 cursor-pointer"
                        style={{ fontFamily: "var(--font-mono)" }}
                    >
                        <span>←</span><span>Back to Projects</span>
                    </motion.button>
                </Link>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                        <span className="text-gradient">Blockchain Projects</span>
                    </h1>
                    <p className="text-sm text-slate-400 max-w-xl">Decentralized applications built on blockchain technology.</p>
                </motion.div>

                <div className="max-w-lg mx-auto">
                    {projects.map((project) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm"
                        >
                            <div className="group relative h-[280px] overflow-hidden">
                                <div className="absolute inset-0 transition-all duration-500 group-hover:scale-105 origin-center">
                                    <DeFiVaultPreview />
                                </div>
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 z-[1]" />
                                {project.tags.map((tag, tagIdx) => {
                                    const pos = badgePositions[tagIdx];
                                    if (!pos) return null;
                                    return (
                                        <motion.span
                                            key={tag}
                                            className="absolute px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-[2]"
                                            style={{ top: pos.top, left: pos.left, fontFamily: "var(--font-mono)", transitionDelay: `${tagIdx * 80}ms` }}
                                            animate={{ y: [0, -5, 0] }}
                                            transition={{ y: { duration: 2.5 + tagIdx * 0.3, repeat: Infinity, ease: "easeInOut" } }}
                                        >
                                            {tag}
                                        </motion.span>
                                    );
                                })}
                            </div>
                            <div className="p-4">
                                <h3 className="text-base font-semibold text-slate-800 mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>{project.title}</h3>
                                <p className="text-[12px] text-slate-400 leading-relaxed line-clamp-3">{project.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
