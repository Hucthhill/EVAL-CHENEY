import { useState } from 'react';
import { EvaluationForm } from '../components/EvaluationForm';
import { SkillRadar } from '../components/charts/SkillRadar';
import { useEvaluation } from '../store/EvaluationContext';
import { IdentityTab } from '../components/IdentityTab';
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
    const [activeTheme, setActiveTheme] = useState<typeof ALL_THEMES[number]['id'] | 'identity'>('identity');

    const currentTheme = ALL_THEMES.find(t => t.id === activeTheme);
    const themeData = activeTheme !== 'identity' ? (data.evaluations[activeTheme] as ThemeEvaluation) : null;

    const getChartData = (phase: 'phase1' | 'phase2' | 'phase3') => {
        if (!currentTheme || activeTheme === 'identity') return [];
        return currentTheme.subThemes.map(sub => themeData?.[sub.id]?.[phase]?.value || 0);
    };

    return (
        <div className="space-y-8">
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                <button
                    onClick={() => setActiveTheme('identity')}
                    className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTheme === 'identity'
                        ? 'bg-bottle-green text-white shadow-md transform scale-105'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                        }`}
                >
                    Identité
                </button>
                {ALL_THEMES.map(theme => (
                    <button
                        key={theme.id}
                        onClick={() => setActiveTheme(theme.id as any)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${activeTheme === theme.id
                            ? 'bg-bottle-green text-white shadow-md transform scale-105'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                            }`}
                    >
                        {theme.title}
                    </button>
                ))}
            </div>

            {activeTheme === 'identity' ? (
                <IdentityTab />
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <EvaluationForm
                            themeId={activeTheme}
                            title={currentTheme!.title}
                            subThemes={currentTheme!.subThemes}
                        />
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
                        <h3 className="text-lg font-bold text-gray-900 mb-6">Visualisation</h3>
                        <SkillRadar
                            labels={currentTheme!.subThemes.map(s => s.label)}
                            dataPhase1={getChartData('phase1')}
                            dataPhase2={getChartData('phase2')}
                            dataPhase3={getChartData('phase3')}
                        />
                        <div className="mt-8 space-y-3">
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-yellow-50 border border-yellow-100">
                                <span className="w-3 h-3 rounded-full bg-yellow-500 shadow-sm"></span>
                                <span className="text-sm font-medium text-yellow-900">Phase 1: Stage découverte</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-green-50 border border-green-100">
                                <span className="w-3 h-3 rounded-full bg-green-500 shadow-sm"></span>
                                <span className="text-sm font-medium text-green-900">Phase 2: Approfondissement</span>
                            </div>
                            <div className="flex items-center gap-3 p-2 rounded-lg bg-red-50 border border-red-100">
                                <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm"></span>
                                <span className="text-sm font-medium text-red-900">Phase 3: Bilan final</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Observations Section - Always visible or only on theme tabs? Usually global, but maybe better inside tabs? 
                The user didn't specify, but typically observations are global per evaluation or per theme. 
                The current data model has global observations per phase. 
                I'll keep it at the bottom for now.
            */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Observations Générales (Par Phase)</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {(['phase1', 'phase2', 'phase3'] as const).map((phase) => (
                        <div key={phase} className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700 capitalize flex items-center gap-2">
                                <span className={`w-2 h-2 rounded-full ${phase === 'phase1' ? 'bg-yellow-500' : phase === 'phase2' ? 'bg-green-500' : 'bg-red-500'
                                    }`}></span>
                                {phase === 'phase1' ? 'Phase 1 (Découverte)' : phase === 'phase2' ? 'Phase 2 (Approfondissement)' : 'Phase 3 (Bilan)'}
                            </label>
                            <textarea
                                value={data.observations[phase] || ''}
                                onChange={(e) => updateObservation(phase, e.target.value)}
                                className="w-full h-40 p-4 border-0 bg-gray-50 rounded-xl focus:ring-2 focus:ring-bottle-green focus:bg-white transition-all outline-none resize-none text-sm leading-relaxed"
                                placeholder={`Saisissez vos observations pour la ${phase === 'phase1' ? 'première phase' : phase === 'phase2' ? 'deuxième phase' : 'troisième phase'}...`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
