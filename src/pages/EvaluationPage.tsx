import React, { useState } from 'react';
import { EvaluationForm } from '../components/EvaluationForm';
import { SkillRadar } from '../components/charts/SkillRadar';
import { useEvaluation } from '../store/EvaluationContext';
import type { ThemeEvaluation } from '../types';

const THEMES = [
    {
        id: 'communication',
        title: 'Communication / Relations',
        subThemes: [
            { id: 'presentation', label: 'Présentation' },
            { id: 'comprehension', label: 'Compréhension' },
            { id: 'expression', label: 'Expression verbale' },
            { id: 'exchange', label: 'Echange/relations' },
            { id: 'askHelp', label: 'Capacité à demander de l\'aide' },
        ]
    },
    {
        id: 'attitude',
        title: 'Savoir-être / Attitude',
        subThemes: [
            { id: 'emotions', label: 'Contrôle des émotions et des affects' },
            { id: 'confidence', label: 'Confiance en soi/estime de soi' },
            { id: 'dynamism', label: 'Dynamisme' },
            { id: 'motivation', label: 'Motivation' },
            { id: 'reaction', label: 'Réaction face aux difficultés' },
            { id: 'adaptation', label: 'Adaptation aux changements' },
            { id: 'alone', label: 'Capacité à travailler seul' },
            { id: 'team', label: 'Capacité à travailler en équipe' },
        ]
    },
    // Add other themes as needed based on the images
] as const;

// Extended themes definition
const ALL_THEMES = [
    ...THEMES,
    {
        id: 'rules',
        title: 'Rapport aux règles et aux contraintes',
        subThemes: [
            { id: 'assiduity', label: 'Assiduité' },
            { id: 'punctuality', label: 'Ponctualité' },
            { id: 'hierarchy', label: 'Respect de la hiérarchie' },
            { id: 'ppe', label: 'Port d\'une tenue de travail (EPI)' },
            { id: 'security', label: 'Sécurité' },
            { id: 'behavior', label: 'Ajustement du comportement' },
            { id: 'rules_app', label: 'Application des règles et des contraintes' },
            { id: 'politeness', label: 'Respect des règles de politesse' },
        ]
    },
    {
        id: 'productivity',
        title: 'Productivité et technicité',
        subThemes: [
            { id: 'interest', label: 'Intérêt au travail' },
            { id: 'organization', label: 'Organisation' },
            { id: 'dexterity', label: 'Habileté et coordination gestuelle' },
            { id: 'tools', label: 'Utilisation du matériel' },
            { id: 'speed', label: 'Rapidité d\'exécution' },
            { id: 'initiative', label: 'Capacité à prendre des initiatives' },
            { id: 'endurance', label: 'Endurance' },
            { id: 'quality', label: 'Qualité du travail' },
            { id: 'autonomy', label: 'Autonomie au poste' },
            { id: 'versatility', label: 'Polyvalence' },
        ]
    },
    {
        id: 'learning',
        title: 'Acquis et aptitude',
        subThemes: [
            { id: 'attention', label: 'Attention et concentration' },
            { id: 'memory', label: 'Capacité de mémorisation' },
            { id: 'spatial', label: 'Repérage spatial' },
            { id: 'temporal', label: 'Repérage temporel' },
            { id: 'learning_cap', label: 'Capacité d\'apprentissage' },
            { id: 'transmission', label: 'Capacité à transmettre' },
            { id: 'simple_tasks', label: 'Aptitude à réaliser des tâches simples' },
            { id: 'complex_tasks', label: 'Aptitude à réaliser des tâches complexes' },
            { id: 'cognitive', label: 'Maintien et développement d\'acquis cognitifs' },
        ]
    }
] as const;

export const EvaluationPage: React.FC = () => {
    const { data, updateObservation } = useEvaluation();
    const [activeTheme, setActiveTheme] = useState<typeof ALL_THEMES[number]['id']>('communication');

    const currentTheme = ALL_THEMES.find(t => t.id === activeTheme)!;
    const themeData = data.evaluations[activeTheme] as ThemeEvaluation;

    const getChartData = (phase: 'phase1' | 'phase2' | 'phase3') => {
        return currentTheme.subThemes.map(sub => themeData[sub.id]?.[phase]?.value || 0);
    };

    return (
        <div className="space-y-8">
            <div className="flex gap-4 border-b border-gray-200 overflow-x-auto pb-1">
                {ALL_THEMES.map(theme => (
                    <button
                        key={theme.id}
                        onClick={() => setActiveTheme(theme.id as any)}
                        className={`px-4 py-2 font-medium whitespace-nowrap transition-colors ${activeTheme === theme.id
                            ? 'text-blue-600 border-b-2 border-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {theme.title}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <EvaluationForm
                        themeId={activeTheme}
                        title={currentTheme.title}
                        subThemes={currentTheme.subThemes}
                    />
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-fit">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Visualisation</h3>
                    <SkillRadar
                        labels={currentTheme.subThemes.map(s => s.label)}
                        dataPhase1={getChartData('phase1')}
                        dataPhase2={getChartData('phase2')}
                        dataPhase3={getChartData('phase3')}
                    />
                    <div className="mt-6 space-y-2 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                            Phase 1: Stage découverte
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-teal-400"></span>
                            Phase 2: Approfondissement (Mi-parcours)
                        </p>
                        <p className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-pink-400"></span>
                            Phase 3: Bilan final
                        </p>
                    </div>
                </div>
            </div>

            {/* Observations Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Observations Générales (Par Phase)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(['phase1', 'phase2', 'phase3'] as const).map((phase) => (
                        <div key={phase} className="space-y-2">
                            <label className="block text-sm font-medium text-gray-700 capitalize">
                                {phase === 'phase1' ? 'Phase 1 (Découverte)' : phase === 'phase2' ? 'Phase 2 (Approfondissement)' : 'Phase 3 (Bilan)'}
                            </label>
                            <textarea
                                value={data.observations[phase] || ''}
                                onChange={(e) => updateObservation(phase, e.target.value)}
                                // Actually I need to access updateObservation from useEvaluation
                                // Let's fix the component to use it.
                                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none text-sm"
                                placeholder={`Observations pour ${phase}...`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
