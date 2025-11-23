import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
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

interface SkillRadarProps {
    labels: string[];
    dataPhase1?: number[];
    dataPhase2?: number[];
    dataPhase3?: number[];
    title?: string;
}

// Custom plugin to draw background zones
const backgroundZonesPlugin = {
    id: 'backgroundZones',
    beforeDraw: (chart: any) => {
        const { ctx, scales: { r } } = chart;
        const xCenter = r.xCenter;
        const yCenter = r.yCenter;

        // Helper to draw a circle
        const drawZone = (radius: number, color: string) => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(xCenter, yCenter, radius, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.restore();
        };

        // Draw zones from outside in
        // Zone 6-7 (Green)
        drawZone(r.getDistanceFromCenterForValue(7), 'rgba(34, 197, 94, 0.1)'); // Green-500 light
        // Zone 3-6 (Yellow)
        drawZone(r.getDistanceFromCenterForValue(6), 'rgba(234, 179, 8, 0.1)'); // Yellow-500 light
        // Zone 0-3 (Orange)
        drawZone(r.getDistanceFromCenterForValue(3), 'rgba(249, 115, 22, 0.1)'); // Orange-500 light
    }
};

// Helper to wrap text
const wrapText = (str: string, maxLen: number = 20) => {
    if (str.length <= maxLen) return str;
    const words = str.split(' ');
    const lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        if (currentLine.length + 1 + words[i].length <= maxLen) {
            currentLine += ' ' + words[i];
        } else {
            lines.push(currentLine);
            currentLine = words[i];
        }
    }
    lines.push(currentLine);
    return lines;
};

export const SkillRadar: React.FC<SkillRadarProps> = ({
    labels,
    dataPhase1 = [],
    dataPhase2 = [],
    dataPhase3 = [],
    title,
}) => {
    const wrappedLabels = labels.map(l => wrapText(l));

    const data = {
        labels: wrappedLabels,
        datasets: [
            {
                label: 'Phase 1',
                data: dataPhase1,
                backgroundColor: 'rgba(234, 179, 8, 0.2)', // Yellow-500
                borderColor: 'rgba(234, 179, 8, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(234, 179, 8, 1)',
            },
            {
                label: 'Phase 2',
                data: dataPhase2,
                backgroundColor: 'rgba(34, 197, 94, 0.2)', // Green-500
                borderColor: 'rgba(34, 197, 94, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(34, 197, 94, 1)',
            },
            {
                label: 'Phase 3',
                data: dataPhase3,
                backgroundColor: 'rgba(239, 68, 68, 0.2)', // Red-500
                borderColor: 'rgba(239, 68, 68, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(239, 68, 68, 1)',
            },
        ].filter(ds => ds.data.length > 0 && ds.data.some(v => v > 0)),
    };

    const options = {
        scales: {
            r: {
                min: 0,
                max: 7,
                ticks: {
                    stepSize: 1,
                    display: true,
                    backdropColor: 'transparent',
                    font: {
                        size: 10,
                        weight: 'bold' as const
                    }
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                angleLines: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                pointLabels: {
                    font: {
                        size: 11,
                    },
                    // Ensure labels don't get cut off
                    padding: 10
                },
            },
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
            },
            title: {
                display: !!title,
                text: title,
            },
            // Register custom plugin
            backgroundZones: {},
        },
        maintainAspectRatio: false,
        layout: {
            padding: 10
        }
    };

    return (
        <div className="w-full h-[300px] md:h-[400px] flex items-center justify-center">
            <Radar data={data} options={options} plugins={[backgroundZonesPlugin]} />
        </div>
    );
};
