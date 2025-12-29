// Viewport center
const cx = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
const cy = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

// Zoom logic
const transformStyle = useMemo(() => {
    if (focusedStarId !== null) {
        const targetStar = stars[focusedStarId];
        const coords = getStarCoords(targetStar, rotation);
        // Inverse translate to center the star, then scale
        return {
            transform: `translate(${cx}px, ${cy}px) scale(3) translate(${-coords.x}px, ${-coords.y}px)`,
            transition: 'transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)'
        };
    }
    return {
        transform: `translate(${cx}px, ${cy}px) scale(0.6)`, // Default view is zoomed out to see galaxy
        transition: 'transform 1.5s cubic-bezier(0.22, 1, 0.36, 1)'
    };
}, [focusedStarId, rotation, stars, cx, cy]);



{/* 5. Detail Panel (Right Side) - Slides in when focused */ }
<div
    className={`absolute top-0 right-0 h-full w-[400px] bg-black/80 backdrop-blur-md border-l border-white/10 z-50 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col
          ${focusedStarId !== null ? 'translate-x-0' : 'translate-x-full'}
          `}
>
    {focusedStarId !== null && (
        <div className="p-10 h-full flex flex-col relative">
            <button
                onClick={() => setFocusedStarId(null)}
                className="absolute top-8 right-8 text-slate-500 hover:text-white transition-colors"
            >
                <X size={24} strokeWidth={1} />
            </button>

            <div className="mt-20">
                <span className="text-xs text-cyan-400 tracking-[0.3em] uppercase border border-cyan-400/30 px-2 py-1">
                    Constellation Alpha
                </span>
                <h2 className="text-4xl font-thin text-white mt-6 mb-8 leading-tight">
                    {stars[focusedStarId].text}
                </h2>
                <div className="w-12 h-1 bg-white mb-8"></div>

                <p className="text-sm text-slate-300 leading-8 font-light tracking-wide">
                    A pivotal concept in the architecture of modern thought. Like a star pulling matter into its orbit,
                    <span className="text-white italic"> {stars[focusedStarId].text} </span>
                    influences the surrounding intellectual landscape.
                </p>

                <div className="mt-auto border-t border-white/10 pt-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-1">
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Spectral Type</div>
                            <div className="text-sm">Class O (Blue Giant)</div>
                        </div>
                        <div className="col-span-1">
                            <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Distance</div>
                            <div className="text-sm">420 Light Years</div>
                        </div>
                    </div>

                    <button className="w-full mt-8 border border-white/30 py-3 hover:bg-white hover:text-black transition-all uppercase text-xs tracking-[0.2em] flex items-center justify-center gap-2">
                        <Share2 size={14} /> Transmit Data
                    </button>
                </div>
            </div>
        </div>
    )}
</div>