import React, { useState } from 'react';
import { useEvaluation } from '../store/EvaluationContext';
import type { Phase, ThemeEvaluation } from '../types';
import { clsx } from 'clsx';
import { ChevronDown, ChevronRight, Lock, Unlock } from 'lucide-react';

interface EvaluationFormProps {
    themeId: keyof import('../types').EvaluationData['evaluations'];
    title: string;
    subThemes: readonly { id: string; label: string }[];
}

export const EvaluationForm: React.FC<EvaluationFormProps> = ({ themeId, title, subThemes }) => {
    const { data, updateScore } = useEvaluation();
    const themeData = data.evaluations[themeId] as ThemeEvaluation;
    const [isLocked, setIsLocked] = useState(false);
    const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

    const toggleExpand = (id: string) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedItems(newExpanded);
    };

    const phases: { id: Phase; label: string; color: string; bg: string; border: string }[] = [
        { id: 'phase1', label: 'Phase 1', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' },
        { id: 'phase2', label: 'Phase 2', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' },
        { id: 'phase3', label: 'Phase 3', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-bold text-bottle-green">{title}</h2>
                    <button
                        onClick={() => setIsLocked(!isLocked)}
                        className={clsx(
                            "p-2 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium",
                            isLocked ? "bg-red-100 text-red-700 hover:bg-red-200" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                        title={isLocked ? "Déverrouiller" : "Verrouiller"}
                    >
                        {isLocked ? <Lock size={18} /> : <Unlock size={18} />}
                        {isLocked ? "Verrouillé" : "Déverrouillé"}
                    </button>
                </div>
                <div className="flex gap-3 text-sm">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span> Phase 1
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span> Phase 2
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 border border-red-200">
                        <span className="w-2 h-2 rounded-full bg-red-500"></span> Phase 3
                    </span>
                </div>
            </div>

            <div className="grid gap-4">
                {subThemes.map((sub) => {
                    const isExpanded = expandedItems.has(sub.id);
                    return (
                        <div key={sub.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
                            <button
                                onClick={() => toggleExpand(sub.id)}
                                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                            >
                                <h3 className="text-lg font-medium text-gray-800">{sub.label}</h3>
                                {isExpanded ? <ChevronDown className="text-gray-400" /> : <ChevronRight className="text-gray-400" />}
                            </button>

                            {isExpanded && (
                                <div className="p-6 pt-0 border-t border-gray-50 animate-in slide-in-from-top-2 duration-200">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                                        {phases.map((phase) => {
                                            const score = themeData[sub.id]?.[phase.id]?.value || 0;
                                            return (
                                                <div key={phase.id} className={clsx("rounded-lg p-4 border transition-colors", phase.bg, phase.border)}>
                                                    <div className={clsx("text-xs font-bold uppercase tracking-wider mb-3", phase.color)}>
                                                        {phase.label}
                                                    </div>
                                                    <div className="flex justify-between gap-1">
                                                        {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                                                            <button
                                                                key={num}
                                                                onClick={() => !isLocked && updateScore(themeId, sub.id, phase.id, num)}
                                                                disabled={isLocked}
                                                                className={clsx(
                                                                    "w-8 h-8 rounded-full text-sm font-medium transition-all transform",
                                                                    isLocked ? "cursor-not-allowed opacity-70" : "active:scale-95",
                                                                    score === num
                                                                        ? "bg-white shadow-md scale-110 ring-2 ring-offset-1 ring-blue-500 text-blue-600"
                                                                        : "bg-white/50 hover:bg-white text-gray-600 hover:shadow-sm"
                                                                )}
                                                            >
                                                                {num}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
