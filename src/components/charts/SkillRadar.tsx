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

export const SkillRadar: React.FC<SkillRadarProps> = ({
    labels,
    dataPhase1 = [],
    dataPhase2 = [],
    dataPhase3 = [],
    title,
}) => {
    const data = {
        labels,
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
                    display: true, // Show numbers
                    backdropColor: 'transparent',
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
        },
        maintainAspectRatio: false,
    };

    return (
        <div className="w-full h-[300px] md:h-[400px]">
            <Radar data={data} options={options} />
        </div>
    );
};
