'use client';

import React from 'react';
import { X, Share2, Shield, Activity, Fingerprint } from 'lucide-react';
import { MindspaceNode } from '@/data/mindspaceData';

interface MindspaceDetailPanelProps {
    node: MindspaceNode | null;
    isOpen: boolean;
    onClose: () => void;
}

const MindspaceDetailPanel: React.FC<MindspaceDetailPanelProps> = ({ node, isOpen, onClose }) => {
    if (!node) return null;

    return (
        <div
            className={`absolute top-0 right-0 h-full w-full md:w-[450px] bg-black/80 backdrop-blur-xl border-l border-white/10 z-50 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col shadow-2xl
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
            <div className="p-8 md:p-12 h-full flex flex-col relative overflow-y-auto scrollbar-hide">
                <button
                    onClick={onClose}
                    className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors group p-2"
                >
                    <X size={24} strokeWidth={1} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                <div className="mt-16">
                    <div className="flex items-center gap-2 mb-6">
                        <span className="text-[10px] text-cyan-400 tracking-[0.3em] uppercase border border-cyan-400/30 px-3 py-1 bg-cyan-950/20">
                            {node.category}
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-5xl font-extralight text-white mb-8 leading-tight tracking-tight">
                        {node.topic}
                    </h2>

                    <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent mb-10"></div>

                    <div className="space-y-8">
                        <p className="text-base text-slate-300 leading-relaxed font-light tracking-wide">
                            {node.content}
                        </p>

                        <div className="grid grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-sm overflow-hidden">
                            <div className="p-4 bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Shield size={10} className="text-cyan-500/50" />
                                    Status
                                </div>
                                <div className="text-sm font-light text-cyan-100">Synchronized</div>
                            </div>
                            <div className="p-4 bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Activity size={10} className="text-cyan-500/50" />
                                    Entropy
                                </div>
                                <div className="text-sm font-light text-cyan-100">Stable</div>
                            </div>
                            <div className="p-4 bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                                    <Fingerprint size={10} className="text-cyan-500/50" />
                                    Node ID
                                </div>
                                <div className="text-sm font-light text-cyan-100">0x{node.id.toString(16).padStart(4, '0')}</div>
                            </div>
                            <div className="p-4 bg-white/5 hover:bg-white/10 transition-colors">
                                <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-2">Resonance</div>
                                <div className="text-sm font-light text-cyan-100">98.4%</div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 space-y-4">
                        <button className="w-full border border-white/10 py-4 hover:bg-white hover:text-black transition-all uppercase text-[10px] tracking-[0.4em] flex items-center justify-center gap-3 group">
                            <Share2 size={14} className="group-hover:scale-110 transition-transform" />
                            Transmit Intelligence
                        </button>
                        <p className="text-center text-[9px] text-slate-600 uppercase tracking-widest">
                            Secured Connection • End-to-End Encryption
                        </p>
                    </div>
                </div>
            </div>

            {/* Decorative pulse at bottom */}
            <div className="h-1 w-full bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/30 animate-pulse"></div>
                <div className="absolute top-0 left-0 h-full w-1/3 bg-cyan-400 shadow-[0_0_10px_#22d3ee] animate-[scan_3s_linear_infinite]"></div>
            </div>

            <style jsx>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
        </div>
    );
};

export default MindspaceDetailPanel;
