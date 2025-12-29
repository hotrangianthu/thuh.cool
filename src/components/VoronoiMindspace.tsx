'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Activity, Hexagon } from 'lucide-react';
import { MINDSPACE_TOPICS, MindspaceNode } from '@/data/mindspaceData';
import MindspaceDetailPanel from './MindspaceDetailPanel';

declare global {
    interface Window {
        d3: any;
    }
}

const VoronoiMindspace = () => {
    const [d3Loaded, setD3Loaded] = useState(false);
    const [sites, setSites] = useState<any[]>([]);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 }); // We still need state for some things, but let's use a ref for the animation loop
    const mousePosRef = useRef({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);
    const requestRef = useRef<number>();
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const isAnimatingOut = useRef(false);

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

        const handleResize = () => {
            setDimensions({ width: window.innerWidth, height: window.innerHeight });
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 2. Initialize Sites (Points) with random positions
    useEffect(() => {
        if (!d3Loaded || dimensions.width === 0) return;

        const newSites = MINDSPACE_TOPICS.map((node) => ({
            ...node,
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            vx: (Math.random() - 0.5) * 0.2,
            vy: (Math.random() - 0.5) * 0.2,
            gradientAngle: Math.floor(Math.random() * 360)
        }));
        setSites(newSites);
    }, [d3Loaded, dimensions]);

    // 3. Animation Loop
    const animate = () => {
        if (selectedIndex !== null) return; // Pause dynamics when focused

        setSites(prevSites => {
            if (prevSites.length === 0) return prevSites;

            const width = window.innerWidth;
            const height = window.innerHeight;

            return prevSites.map(site => {
                let newX = site.x + site.vx;
                let newY = site.y + site.vy;

                // Mouse Repulsion
                const dx = newX - mousePosRef.current.x;
                const dy = newY - mousePosRef.current.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const repulsionRadius = 250;

                if (dist < repulsionRadius) {
                    const force = (repulsionRadius - dist) / repulsionRadius;
                    newX += (dx / dist) * force * 1.5;
                    newY += (dy / dist) * force * 1.5;
                }

                // Wall Bounce
                if (newX < 0 || newX > width) {
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
        if (selectedIndex !== null) {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            return;
        }

        // Delay restart if we just closed the panel to let CSS transition finish
        const timeout = setTimeout(() => {
            requestRef.current = requestAnimationFrame(animate);
        }, isAnimatingOut.current ? 1200 : 0);

        isAnimatingOut.current = false;

        return () => {
            clearTimeout(timeout);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, [selectedIndex]);

    const handleClose = () => {
        isAnimatingOut.current = true;
        setSelectedIndex(null);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        const x = e.clientX;
        const y = e.clientY;
        mousePosRef.current = { x, y };
        setMousePos({ x, y });
    };

    // 4. Compute Voronoi Diagram
    const voronoiData = useMemo(() => {
        if (!d3Loaded || sites.length === 0 || dimensions.width === 0) return [];

        const delaunay = window.d3.Delaunay.from(sites.map(s => [s.x, s.y]));
        const voronoi = delaunay.voronoi([0, 0, dimensions.width, dimensions.height]);

        return sites.map((site, i) => ({
            ...site,
            path: voronoi.renderCell(i)
        }));
    }, [sites, d3Loaded, dimensions]);

    // 5. Laser Zoom Transform
    const transformStyle = useMemo(() => {
        if (selectedIndex !== null && voronoiData.length > 0) {
            const targetNode = voronoiData[selectedIndex];
            const cx = dimensions.width / 2;
            const cy = dimensions.height / 2;

            // Shift focus point slightly to the left to give space for the panel
            const focusX = dimensions.width * 0.35;
            const focusY = cy;

            const scale = 3.5;

            return {
                transform: `translate(${focusX}px, ${focusY}px) scale(${scale}) translate(${-targetNode.x}px, ${-targetNode.y}px)`,
                transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
            };
        }
        return {
            transform: 'translate(0px, 0px) scale(1)',
            transition: 'transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
        };
    }, [selectedIndex, voronoiData, dimensions]);

    if (!d3Loaded) {
        return (
            <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-slate-500 gap-4">
                <Activity className="animate-spin text-cyan-500" />
                <span className="animate-pulse tracking-[0.5em] text-[10px] text-cyan-500/50">FRACTURING REALITY...</span>
            </div>
        );
    }

    return (
        <div
            ref={containerRef}
            className="w-full h-screen bg-transparent overflow-hidden relative font-sans select-none"
            onMouseMove={handleMouseMove}
        >
            {/* Redundant background removed to avoid 'shades' and double layering */}

            {/* Interactive Layer */}
            <div style={transformStyle} className="w-full h-full origin-top-left">
                <svg className="absolute inset-0 w-full h-full z-10">
                    <defs>
                        {/* Glass Clip Paths */}
                        {voronoiData.map((cell, i) => (
                            <clipPath key={`clip-${i}`} id={`clip-${i}`}>
                                <path d={cell.path} />
                            </clipPath>
                        ))}

                        {/* Gradients for sheen */}
                        {voronoiData.map((cell, i) => (
                            <linearGradient key={`grad-${i}`} id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%"
                                gradientTransform={`rotate(${cell.gradientAngle})`}>
                                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                                <stop offset="50%" stopColor="rgba(255,255,255,0.02)" />
                                <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                            </linearGradient>
                        ))}

                        <filter id="glow-selected">
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {voronoiData.map((cell, i) => {
                        const isHovered = hoveredIndex === i;
                        const isSelected = selectedIndex === i;

                        return (
                            <g
                                key={cell.id}
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => {
                                    if (i === selectedIndex) {
                                        handleClose();
                                    } else {
                                        setSelectedIndex(i);
                                    }
                                }}
                                className="cursor-pointer group"
                            >
                                {/* The Shard Content */}
                                <g clipPath={`url(#clip-${i})`}>
                                    {/* Background Image inside shard */}
                                    <image
                                        href="/bg.png"
                                        x="0" y="0"
                                        width={dimensions.width}
                                        height={dimensions.height}
                                        className="transition-transform duration-700"
                                        style={{
                                            filter: isHovered || isSelected ? 'blur(1px) brightness(1.2)' : 'blur(4px) brightness(0.85)',
                                            transform: isHovered || isSelected ? 'scale(1.05)' : 'scale(1)',
                                            transformOrigin: `${cell.x}px ${cell.y}px`
                                        }}
                                    />

                                    {/* Glass Sheen Overlay */}
                                    <path
                                        d={cell.path}
                                        fill={isSelected ? 'rgba(34, 211, 238, 0.15)' : (isHovered ? 'rgba(255, 255, 255, 0.1)' : `url(#grad-${i})`)}
                                        className="transition-colors duration-300"
                                    />
                                </g>

                                {/* Shard Borders */}
                                <path
                                    d={cell.path}
                                    fill="none"
                                    stroke={isSelected ? '#22d3ee' : (isHovered ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.05)')}
                                    strokeWidth={isSelected ? 2 : (isHovered ? 1 : 0.5)}
                                    className="transition-all duration-300"
                                    style={{ filter: isSelected ? 'url(#glow-selected)' : 'none' }}
                                />

                                {/* Node Label */}
                                <foreignObject x={cell.x - 80} y={cell.y - 40} width="160" height="80" className="pointer-events-none">
                                    <div className={`w-full h-full flex flex-col items-center justify-center text-center transition-all duration-500
                    ${isSelected ? 'scale-110 opacity-100 z-50' : (isHovered ? 'scale-105 opacity-100 z-40' : 'scale-90 opacity-40 grayscale')}
                  `}>
                                        <div className={`px-3 py-1.5 rounded-sm backdrop-blur-md border transition-colors shadow-xl
                      ${isSelected ? 'bg-cyan-950/90 border-cyan-400 text-cyan-100' : 'bg-black/40 border-white/10 text-white/70'}
                    `}>
                                            <span className={`block tracking-[0.05em] font-medium leading-tight
                         ${isSelected ? 'text-[14px]' : 'text-[10px]'}
                       `}>
                                                {cell.topic}
                                            </span>
                                        </div>
                                    </div>
                                </foreignObject>
                            </g>
                        );
                    })}
                </svg>
            </div>

            {/* UI Overlay */}
            <div className={`absolute top-12 left-12 z-50 transition-all duration-1000 ${selectedIndex !== null ? 'opacity-20 blur-sm pointer-events-none' : 'opacity-100'}`}>
                <h1 className="text-3xl font-extralight tracking-[0.2em] text-white flex items-center gap-3 mix-blend-difference">
                    <img
                        src="/favicon.png"
                        alt="THUH Logo"
                        className="w-8 h-8 object-contain brightness-100 contrast-125 select-none"
                    />
                    THUH MINDSPACE
                </h1>
                <div className="w-48 h-px bg-white/20 mt-4 mb-2"></div>
                <p className="text-[9px] text-slate-500 uppercase tracking-[0.5em] font-light mb-6">
                    Cognitive Architecture • v2.0.4
                </p>

                <a
                    href="/"
                    className="text-[10px] text-cyan-400/60 hover:text-cyan-400 tracking-[0.3em] uppercase transition-colors flex items-center gap-2 group pointer-events-auto"
                >
                    <div className="w-4 h-px bg-cyan-400/30 group-hover:w-8 transition-all"></div>
                    Return to Reality
                </a>
            </div>

            {/* Side Panel */}
            <MindspaceDetailPanel
                node={selectedIndex !== null ? voronoiData[selectedIndex] : null}
                isOpen={selectedIndex !== null}
                onClose={handleClose}
            />

            {/* Instructions */}
            <div className={`absolute bottom-12 right-12 z-40 transition-opacity duration-1000 ${selectedIndex !== null ? 'opacity-0' : 'opacity-60'}`}>
                <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-4 text-[9px] text-slate-400 tracking-[0.4em] uppercase">
                        <span>Hover to Resonate</span>
                        <div className="w-8 h-px bg-slate-700"></div>
                        <span>Click to Analyze</span>
                    </div>
                    <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-1 h-1 bg-cyan-500/50 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.5}s` }}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Background Blur Overlay when panel is open */}
            {selectedIndex !== null && (
                <div
                    className="absolute inset-0 bg-black/40 backdrop-blur-[2px] z-30 transition-opacity duration-700"
                    onClick={handleClose}
                />
            )}
        </div>
    );
};

export default VoronoiMindspace;
