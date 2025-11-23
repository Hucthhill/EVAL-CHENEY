import React from 'react';
import { useEvaluation } from '../store/EvaluationContext';
import type { Phase, ThemeEvaluation } from '../types';

interface EvaluationFormProps {
    themeId: keyof import('../types').EvaluationData['evaluations'];
    title: string;
    subThemes: readonly { id: string; label: string }[];
}

export const EvaluationForm: React.FC<EvaluationFormProps> = ({ themeId, title, subThemes }) => {
    const { data, updateScore } = useEvaluation();
    const themeData = data.evaluations[themeId] as ThemeEvaluation;

    const phases: { id: Phase; label: string; color: string }[] = [
        { id: 'phase1', label: 'Phase 1', color: 'bg-yellow-50 border-yellow-200' },
        { id: 'phase2', label: 'Phase 2', color: 'bg-green-50 border-green-200' },
        { id: 'phase3', label: 'Phase 3', color: 'bg-red-50 border-red-200' },
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>

            <div className="overflow-x-auto">
                <table className="w-full min-w-[800px] border-collapse">
                    <thead>
                        <tr>
                            <th className="text-left p-4 border-b-2 border-gray-200 w-1/3">Compétence</th>
                            {phases.map(phase => (
                                <th key={phase.id} className="p-4 border-b-2 border-gray-200 text-center w-1/6">
                                    {phase.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {subThemes.map((sub) => (
                            <tr key={sub.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="p-4 text-sm font-medium text-gray-700">{sub.label}</td>
                                {phases.map((phase) => {
                                    const score = themeData[sub.id]?.[phase.id]?.value || 0;
                                    return (
                                        <td key={phase.id} className="p-2 text-center">
                                            <select
                                                value={score}
                                                onChange={(e) => updateScore(themeId, sub.id, phase.id, Number(e.target.value))}
                                                className={`w-full p-2 rounded border focus:ring-2 focus:ring-blue-500 outline-none ${score > 0 ? phase.color : 'border-gray-200'
                                                    }`}
                                            >
                                                <option value="0">-</option>
                                                {[1, 2, 3, 4, 5, 6, 7].map(num => (
                                                    <option key={num} value={num}>{num}</option>
                                                ))}
                                            </select>
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
