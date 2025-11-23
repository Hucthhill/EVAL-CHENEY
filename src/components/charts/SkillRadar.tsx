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
                backgroundColor: 'rgba(255, 206, 86, 0.2)', // Yellow
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 206, 86, 1)',
            },
            {
                label: 'Phase 2',
                data: dataPhase2,
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Greenish
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(75, 192, 192, 1)',
            },
            {
                label: 'Phase 3',
                data: dataPhase3,
                backgroundColor: 'rgba(255, 99, 132, 0.2)', // Redish
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
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
