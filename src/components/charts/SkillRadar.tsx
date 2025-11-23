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
        drawZone(r.getDistanceFromCenterForValue(7), 'rgba(74, 222, 128, 0.2)'); // Green-400 with opacity
        // Zone 3-6 (Yellow)
        drawZone(r.getDistanceFromCenterForValue(6), 'rgba(250, 204, 21, 0.2)'); // Yellow-400 with opacity
        // Zone 0-3 (Orange)
        drawZone(r.getDistanceFromCenterForValue(3), 'rgba(251, 146, 60, 0.2)'); // Orange-400 with opacity
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
                backgroundColor: 'rgba(251, 146, 60, 0.6)', // Orange for Phase 1 (matching low scores?) - Actually usually Phase 1 is just time.
                // Let's keep distinct colors for phases but maybe match the "theme"?
                // User said "Corriger le système de couleur... qui ne correspond pas aux couleurs de l'échelle".
                // If they mean the lines should match the score they have... that's hard.
                // If they mean the background zones, I fixed that above.
                // Let's stick to distinct phase colors but maybe more vibrant.
                borderColor: 'rgba(251, 146, 60, 1)', // Orange
                borderWidth: 3,
                pointBackgroundColor: 'rgba(251, 146, 60, 1)',
            },
            {
                label: 'Phase 2',
                data: dataPhase2,
                backgroundColor: 'rgba(250, 204, 21, 0.6)', // Yellow
                borderColor: 'rgba(250, 204, 21, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(250, 204, 21, 1)',
            },
            {
                label: 'Phase 3',
                data: dataPhase3,
                backgroundColor: 'rgba(74, 222, 128, 0.6)', // Green
                borderColor: 'rgba(74, 222, 128, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(74, 222, 128, 1)',
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
                    },
                    z: 10 // Ensure ticks are on top
                },
                grid: {
                    color: 'rgba(0, 0, 0, 0.1)',
                    lineWidth: 1,
                },
                angleLines: {
                    color: 'rgba(0, 0, 0, 0.1)',
                },
                pointLabels: {
                    font: {
                        size: 12, // Larger font
                        weight: 'bold' as const,
                    },
                    padding: 20, // More padding
                    color: '#374151' // Gray-700
                },
            },
        },
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: {
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            },
            title: {
                display: !!title,
                text: title,
                font: {
                    size: 16,
                    weight: 'bold' as const
                },
                padding: {
                    bottom: 20
                }
            },
            backgroundZones: {},
        },
        maintainAspectRatio: false,
        layout: {
            padding: 20
        }
    };

    return (
        <div className="w-full h-[400px] md:h-[500px] flex items-center justify-center p-4">
            <Radar data={data} options={options} plugins={[backgroundZonesPlugin]} />
        </div>
    );
};
