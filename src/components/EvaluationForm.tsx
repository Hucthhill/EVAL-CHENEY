import { useState } from 'react';
import { useEvaluation } from '../store/EvaluationContext';
import type { Phase } from '../types';
import { clsx } from 'clsx';
import { ChevronDown, ChevronRight, Lock, Unlock, CheckCircle } from 'lucide-react';

interface EvaluationFormProps {
    themeId: keyof import('../types').EvaluationData['evaluations'];
    title: string;
    subThemes: readonly { id: string; label: string }[];
}

export const EvaluationForm: React.FC<EvaluationFormProps> = ({ themeId, title, subThemes }) => {
    const { data, updateScore, updateThemeObservation, validatePhase } = useEvaluation();
    const themeData = data.evaluations?.[themeId] || {};
    const themeObs = data.themeObservations?.[themeId] || {};
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

    const phases: { id: Phase; label: string }[] = [
        { id: 'phase1', label: 'Phase 1' },
        { id: 'phase2', label: 'Phase 2' },
        { id: 'phase3', label: 'Phase 3' },
    ];

    const getPhaseStatus = (phaseId: Phase) => {
        const isValidated = data.validatedPhases.includes(phaseId);
        // Phase 1 is always active initially.
        // Phase 2 is active if Phase 1 is validated.
        // Phase 3 is active if Phase 2 is validated.
        let isActive = false;
        if (phaseId === 'phase1') isActive = true;
        if (phaseId === 'phase2' && data.validatedPhases.includes('phase1')) isActive = true;
        if (phaseId === 'phase3' && data.validatedPhases.includes('phase2')) isActive = true;

        // If validated, it's completed (white bg, green text).
        // If active and not validated, it's current (green bg, white text).
        // If not active, it's disabled/hidden or greyed out? Assuming visible but maybe disabled.

        return { isValidated, isActive };
    };

    const getPhaseStyles = (phaseId: Phase) => {
        const { isValidated, isActive } = getPhaseStatus(phaseId);

        if (isValidated) {
            return "bg-white text-bottle-green border-bottle-green";
        }
        if (isActive) {
            return "bg-bottle-green text-white border-bottle-green";
        }
        return "bg-gray-50 text-gray-400 border-gray-200";
    };

    const getScoreButtonStyle = (num: number, isSelected: boolean) => {
        if (isSelected) return "ring-2 ring-offset-1 ring-bottle-green scale-110";

        if (num <= 3) return "bg-gradient-to-br from-orange-300 to-orange-500 text-white shadow-sm";
        if (num <= 6) return "bg-gradient-to-br from-yellow-300 to-yellow-500 text-white shadow-sm";
        return "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-sm";
    };

    const currentPhase = phases.find(p => {
        const { isActive, isValidated } = getPhaseStatus(p.id);
        return isActive && !isValidated;
    });

    return (
        <div className="space-y-8">
            {/* Header & Legend */}
            <div className="space-y-6">
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

                    {/* Phase Indicators */}
                    <div className="flex gap-3 text-sm">
                        {phases.map(p => {
                            const { isValidated } = getPhaseStatus(p.id);
                            return (
                                <span key={p.id} className={clsx(
                                    "flex items-center gap-2 px-3 py-1 rounded-full border transition-colors",
                                    getPhaseStyles(p.id)
                                )}>
                                    {isValidated && <CheckCircle size={14} />}
                                    {p.label}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* Scoring Legend */}
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-3 text-sm">
                    <h4 className="font-bold text-gray-800 border-b border-gray-200 pb-1 mb-2">Echelle d'évaluation :</h4>

                    <div className="grid gap-2">
                        <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-green-400 to-green-600 text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">7</span>
                            <span className="text-gray-700">Capacité maîtrisée et mise en œuvre dans le milieu ordinaire</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">6</span>
                            <span className="text-gray-700">Capacité maîtrisée et à mettre en œuvre en milieu ordinaire avec suivi ESAT</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">5</span>
                            <span className="text-gray-700">Capacité acquise et en cours de mise en œuvre</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-500 text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">4</span>
                            <span className="text-gray-700">Capacité en cours d'acquisition et non mis en œuvre seule</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">3</span>
                            <span className="text-gray-700">Capacité non acquise, a la volonté mais ne peut pas</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">2</span>
                            <span className="text-gray-700">Capacité non acquise car ne s'implique pas</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="w-6 h-6 rounded-full bg-gradient-to-br from-orange-300 to-orange-500 text-white flex items-center justify-center text-xs font-bold shadow-sm shrink-0">1</span>
                            <span className="text-gray-700">Capacité non constaté</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Sub-themes List */}
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
                                            const { isActive } = getPhaseStatus(phase.id);

                                            if (!isActive) return (
                                                <div key={phase.id} className="rounded-lg p-4 border border-gray-100 bg-gray-50 opacity-50 flex items-center justify-center">
                                                    <span className="text-gray-400 text-sm">{phase.label} - En attente</span>
                                                </div>
                                            );

                                            return (
                                                <div key={phase.id} className={clsx("rounded-lg p-4 border transition-colors", getPhaseStyles(phase.id))}>
                                                    <div className="text-xs font-bold uppercase tracking-wider mb-3 text-center">
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
                                                                    isLocked ? "cursor-not-allowed opacity-70" : "active:scale-95 hover:scale-110",
                                                                    getScoreButtonStyle(num, score === num)
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

            {/* Observations & Validation */}
            {currentPhase && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                    <h3 className="text-xl font-bold text-bottle-green border-b border-gray-100 pb-2">
                        Observations - {currentPhase.label}
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="font-semibold text-gray-700 block">Principales capacités identifiées</label>
                            <textarea
                                value={themeObs[currentPhase.id]?.capacities || ''}
                                onChange={(e) => updateThemeObservation(themeId, currentPhase.id, 'capacities', e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bottle-green outline-none h-32 resize-none"
                                placeholder="Saisir les capacités..."
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="font-semibold text-gray-700 block">Principales difficultés rencontrées</label>
                            <textarea
                                value={themeObs[currentPhase.id]?.difficulties || ''}
                                onChange={(e) => updateThemeObservation(themeId, currentPhase.id, 'difficulties', e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bottle-green outline-none h-32 resize-none"
                                placeholder="Saisir les difficultés..."
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            onClick={() => validatePhase(currentPhase.id)}
                            className="px-6 py-2 bg-bottle-green text-white rounded-lg hover:bg-green-800 transition-colors shadow-lg shadow-bottle-green/20 flex items-center gap-2"
                        >
                            <CheckCircle size={20} />
                            Valider {currentPhase.label}
                        </button>
                    </div>
                </div>
            )}

            {/* Previous Observations (Read-only) */}
            {phases.filter(p => data.validatedPhases.includes(p.id)).map(p => (
                <div key={p.id} className="bg-gray-50 rounded-xl border border-gray-200 p-6 space-y-4 opacity-80">
                    <h3 className="text-lg font-bold text-gray-700 border-b border-gray-200 pb-2 flex items-center gap-2">
                        <CheckCircle size={18} className="text-green-600" />
                        Observations - {p.label} (Validé)
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6 text-sm">
                        <div>
                            <strong className="block text-gray-600 mb-1">Capacités :</strong>
                            <p className="p-3 bg-white rounded border border-gray-200">{themeObs[p.id]?.capacities || 'Aucune observation'}</p>
                        </div>
                        <div>
                            <strong className="block text-gray-600 mb-1">Difficultés :</strong>
                            <p className="p-3 bg-white rounded border border-gray-200">{themeObs[p.id]?.difficulties || 'Aucune observation'}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
