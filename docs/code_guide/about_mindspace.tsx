import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Hexagon, Shield, X, Layers, Activity } from 'lucide-react';

const MINDSPACE_TOPICS = [
    "The Thucydides Trap", "The Cantillon Effect", "Strait of Malacca", "Dutch Disease",
    "The Resource Curse", "Leveraged Buyouts", "Sovereign Wealth Funds", "Special Economic Zones",
    "O-Ring Theory", "Gresham’s Law", "The Lindy Effect", "Banana Republics", "Petrodollar System",
    "Dark Pools", "High-Frequency Trading", "Maritime Law", "Military-Industrial Complex",
    "Regulatory Capture", "Realpolitik", "Overton Window",
    "Mimetic Desire", "Dunbar’s Number", "Network Effects", "Gall's Law", "Pareto Principle",
    "Price’s Law", "The Matthew Effect", "Cargo Cults", "Groupthink", "Survivorship Bias",
    "Preference Falsification", "Creative Destruction", "Innovator's Dilemma", "Moore's Law",
    "Metcalfe's Law", "Principal-Agent Problem", "Opportunity Cost", "Sunk Cost Fallacy",
    "First Principles", "Anti-Fragility",
    "Existentialism", "Nihilism", "Absurdism", "The Sublime", "Wabi-Sabi", "Mono no aware",
    "Kintsugi", "Brutalism", "Gothic Revival", "Decadence", "Apollonian vs Dionysian",
    "Shadow Self", "Panopticon", "Simulacra", "Hauntology", "Memento Mori", "Stoicism",
    "Russian Soul", "The Flâneur", "Death of the Author",
    "Fermi Paradox", "Great Filter", "Dark Forest Theory", "Von Neumann Probes", "Dyson Spheres",
    "Kardashev Scale", "Roko’s Basilisk", "Paperclip Maximizer", "Instrumental Convergence",
    "Transhumanism", "Mind Uploading", "Hard Problem", "P-Zombies",
    "Boltzmann Brains", "Simulation Hypothesis", "Quantum Entanglement", "Entropy",
    "CRISPR-Cas9", "Epigenetics", "Terraforming",
    "Dark Triad", "Signaling Theory", "Cognitive Dissonance", "Gaslighting", "Stockholm Syndrome",
    "Nudge Theory", "Moral Hazard", "Bicameralism", "Social Proof", "Reciprocity",
    "Scarcity", "Authority", "Liking", "Consistency", "Machiavellianism", "Ben Franklin Effect",
    "Door-in-the-Face", "Foot-in-the-Door", "Halo Effect", "Spotlight Effect"
];

const VoronoiGlass = () => {
    const [d3Loaded, setD3Loaded] = useState(false);
    const [sites, setSites] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const requestRef = useRef();

    // 1. Load D3.js dynamically
    useEffect(() => {
        if (window.d3) {
            setD3Loaded(true);
            return;
        }
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js';
        script.onload = () => setD3Loaded(true);
        document.body.appendChild(script);
    }, []);

    // 2. Initialize Sites (Points) with random positions
    useEffect(() => {
        if (!d3Loaded) return;

        const width = window.innerWidth;
        const height = window.innerHeight;

        const newSites = MINDSPACE_TOPICS.map((topic, i) => ({
            id: i,
            text: topic,
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.3, // Gentle drift velocity
            vy: (Math.random() - 0.5) * 0.3,
            // Random gradient angle for the "glass" sheen
            gradientAngle: Math.floor(Math.random() * 360)
        }));
        setSites(newSites);
    }, [d3Loaded]);

    // 3. Animation Loop
    const animate = () => {
        if (selectedIndex !== null) return; // Pause dynamics when focused

        setSites(prevSites => {
            const width = window.innerWidth;
            const height = window.innerHeight;

            return prevSites.map(site => {
                let newX = site.x + site.vx;
                let newY = site.y + site.vy;

                // Mouse Repulsion (Fluid Glass Effect)
                // Shards subtly move away from cursor to create "breathing" space
                const dx = newX - mousePos.x;
                const dy = newY - mousePos.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const repulsionRadius = 200;

                if (dist < repulsionRadius) {
                    const force = (repulsionRadius - dist) / repulsionRadius; newX += (dx / dist) * force * 2;
                    newY += (dy / dist) * force * 2;
                } // Wall Bounce if (newX < 0 || newX> width) {
                site.vx *= -1;
                newX = Math.max(0, Math.min(width, newX));
            }
    if (newY < 0 || newY > height) {
                site.vy *= -1;
                newY = Math.max(0, Math.min(height, newY));
            }

            return { ...site, x: newX, y: newY };
        });
    });
    requestRef.current = requestAnimationFrame(animate);
};

useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
}, [selectedIndex, mousePos]); // Re-bind on mouse move isn't efficient, but state update needs current
mousePos.
// Optimization: Use a ref for mousePos in the loop, but this is React-state driven for simplicity.

const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
};

// 4. Compute Voronoi Diagram & Centroids
const voronoiData = useMemo(() => {
    if (!d3Loaded || sites.length === 0) return [];

    const width = window.innerWidth;
    const height = window.innerHeight;

    // D3 Delaunay -> Voronoi
    const delaunay = window.d3.Delaunay.from(sites.map(s => [s.x, s.y]));
    const voronoi = delaunay.voronoi([0, 0, width, height]);

    return sites.map((site, i) => {
        const path = voronoi.renderCell(i);

        // Calculate Centroid for text placement (better than site position)
        // D3 doesn't give centroid directly for Voronoi cells easily without polygon calc,
        // So we'll approximate with the site position but offset towards center of bounding box relative to site?
        // Actually, site position is usually visually "good enough" for Voronoi generator,
        // but let's stick to site.x/y for performance unless we parse the path.

        return {
            ...site,
            path
        };
    });
}, [sites, d3Loaded]);

if (!d3Loaded) {
    return (
        <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-slate-500 gap-4">
            <Activity className="animate-spin text-cyan-500" />
            <span className="animate-pulse tracking-widest text-xs">FRACTURING REALITY...</span>
        </div>
    );
}

return (
    <div ref={containerRef} className="w-full h-screen bg-[#050505] overflow-hidden relative font-sans select-none"
        onMouseMove={handleMouseMove}>
        {/* Background Ambience */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0a0a] to-[#111] z-0"></div>

        {/* SVG Layer */}
        <svg className="absolute inset-0 w-full h-full z-10 filter drop-shadow-2xl">
            <defs>
                {/* Dynamic Gradients for "Glass" Sheen */}
                {voronoiData.map((cell, i) => (
                    <linearGradient key={`grad-${i}`} id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%"
                        gradientTransform={`rotate(${cell.gradientAngle})`}>
                        <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                        <stop offset="50%" stopColor="rgba(255,255,255,0)" />
                        <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                    </linearGradient>
                ))}

                {/* Selected Glow Filter */}
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            {voronoiData.map((cell, i) => {
                const isHovered = hoveredIndex === i;
                const isSelected = selectedIndex === i;

                // Style Logic
                const fill = isSelected ? 'rgba(6, 182, 212, 0.15)' : (isHovered ? 'rgba(255, 255, 255, 0.08)' :
                    `url(#grad-${i})`);
                const stroke = isSelected ? '#22d3ee' : (isHovered ? 'rgba(255,255,255,0.4)' : '#262626');
                const strokeWidth = isSelected ? 3 : (isHovered ? 1.5 : 1);

                return (
                    <g key={cell.id} onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                        onClick={() => setSelectedIndex(i === selectedIndex ? null : i)}
                        className="cursor-pointer"
                    >
                        <path d={cell.path} fill={fill} stroke={stroke} strokeWidth={strokeWidth}
                            className="transition-all duration-300 ease-out" style={{
                                filter: isSelected ? 'url(#glow)'
                                    : 'none'
                            }} />

                        {/* Text Label */}
                        <foreignObject x={cell.x - 75} y={cell.y - 25} width="150" height="50"
                            className="pointer-events-none overflow-visible">
                            <div className={`w-full h-full flex items-center justify-center text-center leading-tight
                            transition-all duration-300 ${isSelected ? 'scale-125 opacity-100 z-50' : (isHovered
                                    ? 'scale-110 opacity-100 z-40' : 'scale-90 opacity-40 grayscale')} `}>
                                <span className={`px-2 py-1 rounded backdrop-blur-sm ${isSelected
                                    ? 'bg-cyan-900/40 text-cyan-200 font-bold text-sm border border-cyan-500/30' :
                                    (isHovered ? 'bg-white/10 text-white font-medium text-xs' : 'text-slate-500 text-[10px]'
                                    )} `}>
                                    {cell.text}
                                </span>
                            </div>
                        </foreignObject>
                    </g>
                );
            })}
        </svg>

        {/* UI Overlay */}
        <div className="absolute top-8 left-8 pointer-events-none z-50">
            <h1
                className="text-4xl font-light tracking-[0.2em] text-white flex items-center gap-4 mix-blend-difference opacity-80">
                <Hexagon className="text-cyan-400 w-8 h-8" strokeWidth={1} />
                SHATTERED
            </h1>
            <p
                className="text-[10px] text-slate-500 mt-2 ml-14 uppercase tracking-widest border-l border-slate-700 pl-3">
                Voronoi Tessellation • Interactive Manifold
            </p>
        </div>

        {/* Details Modal */}
        {selectedIndex !== null && (
            <div className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none p-4">
                {/* Darken Backdrop */}
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm pointer-events-auto transition-opacity duration-500"
                    onClick={() => setSelectedIndex(null)}></div>

                {/* Content Card */}
                <div
                    className="relative w-full max-w-lg bg-[#0a0a0a] border border-slate-800 shadow-[0_0_100px_rgba(0,0,0,1)] pointer-events-auto transform animate-in fade-in zoom-in-95 duration-300 overflow-hidden">

                    {/* Top Glowing Edge */}
                    <div
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent">
                    </div>

                    <div className="p-8 md:p-12 relative">
                        <button onClick={() => setSelectedIndex(null)}
                            className="absolute top-6 right-6 text-slate-600 hover:text-white transition-colors"
                        >
                            <X size={24} />
                        </button>

                        <div
                            className="flex items-center gap-2 mb-8 text-cyan-500/50 text-[10px] uppercase tracking-[0.3em]">
                            <Shield size={12} />
                            <span>Node Fragment #{sites[selectedIndex].id}</span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-thin text-white mb-8 tracking-tight">
                            {sites[selectedIndex].text}
                        </h2>

                        <div className="h-px w-20 bg-slate-800 mb-8"></div>

                        <p className="text-slate-400 font-light leading-relaxed mb-8 text-sm md:text-base">
                            This concept forms a critical junction in the cognitive lattice.
                            Within the Voronoi model, it represents a "basin of attraction"—a region of thought where
                            all paths naturally lead to this central idea.
                        </p>

                        <div className="grid grid-cols-2 gap-px bg-slate-900 border border-slate-800">
                            <div className="bg-[#0f0f0f] p-4 text-center hover:bg-[#151515] transition-colors">
                                <span
                                    className="block text-2xl text-white font-light">{sites[selectedIndex].gradientAngle}°</span>
                                <span className="text-[9px] uppercase text-slate-600 tracking-wider">Refraction
                                    Angle</span>
                            </div>
                            <div className="bg-[#0f0f0f] p-4 text-center hover:bg-[#151515] transition-colors">
                                <span className="block text-2xl text-cyan-400 font-light">
                                    {Math.round(sites[selectedIndex].x + sites[selectedIndex].y)}
                                </span>
                                <span className="text-[9px] uppercase text-slate-600 tracking-wider">Hash Value</span>
                            </div>
                        </div>
                    </div>

                    {/* Bottom decorative bar */}
                    <div className="h-2 w-full bg-[#111] flex">
                        <div className="h-full bg-cyan-900 w-[20%]"></div>
                        <div className="h-full bg-slate-800 w-[5%] ml-auto"></div>
                    </div>
                </div>
            </div>
        )}

        {/* Helper Text */}
        {!selectedIndex && (
            <div className="absolute bottom-8 right-8 text-right pointer-events-none opacity-50">
                <div className="text-slate-500 text-[10px] tracking-[0.3em] uppercase animate-pulse">
                    Hover to fracture • Click to analyze
                </div>
            </div>
        )}

    </div>
);
        };

export default VoronoiGlass;