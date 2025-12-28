'use client';

import React, { useEffect, useRef } from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
    ChartConfiguration,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

interface RadarChartProps {
    stats: number[];
    color: string;
    bgHex: string;
}

export default function RadarChart({ stats, color, bgHex }: RadarChartProps) {
    const data = {
        labels: ['Power', 'Logic', 'Empathy', 'Vision', 'Influence'],
        datasets: [
            {
                label: 'Stats',
                data: stats,
                fill: true,
                backgroundColor: bgHex,
                borderColor: color,
                pointBackgroundColor: color,
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: color,
                borderWidth: 2,
            },
        ],
    };

    const options: any = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            r: {
                min: 0,
                max: 100,
                ticks: { display: false, stepSize: 20 },
                pointLabels: {
                    font: { size: 11, family: 'var(--font-inter)' },
                    color: '#94a3b8', // text-slate-400
                },
                grid: { color: 'rgba(255, 255, 255, 0.1)' },
                angleLines: { color: 'rgba(255, 255, 255, 0.1)' },
            },
        },
        plugins: {
            legend: { display: false },
        },
    };

    return (
        <div className="w-full h-[300px] flex items-center justify-center">
            <Radar data={data} options={options} />
        </div>
    );
}
