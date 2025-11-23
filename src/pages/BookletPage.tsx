import { useState } from 'react';
import { useEvaluation } from '../store/EvaluationContext';
import { SkillRadar } from '../components/charts/SkillRadar';
import { ArrowLeft, Maximize2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChartModal } from '../components/ChartModal';

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
] as const;

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

export const BookletPage: React.FC = () => {
    const { data } = useEvaluation();
    const navigate = useNavigate();
    const [modalConfig, setModalConfig] = useState<{
        isOpen: boolean;
        title: string;
        labels: string[];
        dataPhase1?: number[];
        dataPhase2?: number[];
        dataPhase3?: number[];
    }>({
        isOpen: false,
        title: '',
        labels: [],
    });

    const getChartData = (themeId: string, phase: 'phase1' | 'phase2' | 'phase3') => {
        const theme = ALL_THEMES.find(t => t.id === themeId);
        if (!theme) return [];
        const themeData = data.evaluations?.[themeId as keyof typeof data.evaluations] || {};
        return theme.subThemes.map(sub => themeData[sub.id]?.[phase]?.value || 0);
    };

    const getGlobalAverageData = (phase: 'phase1' | 'phase2' | 'phase3') => {
        return ALL_THEMES.map(theme => {
            const themeData = data.evaluations?.[theme.id as keyof typeof data.evaluations] || {};
            const scores = theme.subThemes
                .map(sub => themeData[sub.id]?.[phase]?.value || 0)
                .filter(v => v > 0);

            if (scores.length === 0) return 0;
            const sum = scores.reduce((a, b) => a + b, 0);
            return Number((sum / scores.length).toFixed(1));
        });
    };

    const openModal = (title: string, labels: string[], p1?: number[], p2?: number[], p3?: number[]) => {
        setModalConfig({
            isOpen: true,
            title,
            labels,
            dataPhase1: p1,
            dataPhase2: p2,
            dataPhase3: p3
        });
    };

    return (
        <div className="max-w-[297mm] mx-auto bg-white p-8 print:p-0 min-h-screen">
            <div className="print:hidden mb-8">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Retour au tableau de bord
                </button>
            </div>

            {/* Cover Page */}
            <div className="min-h-[29.7cm] p-12 border-b-2 border-gray-100 print:border-none relative page-break-after">
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-bold uppercase border-b-2 border-black inline-block pb-2">
                        Centre d'Évaluation Professionnelle - {data.profile.firstName} {data.profile.lastName}
                    </h1>
                </div>

                <div className="space-y-8 text-lg">
                    <div className="grid grid-cols-[200px_1fr] gap-4">
                        <span className="font-semibold">Nom :</span>
                        <span className="border-b border-gray-400">{data.profile.firstName}</span>
                    </div>
                    <div className="grid grid-cols-[200px_1fr] gap-4">
                        <span className="font-semibold">Prénom :</span>
                        <span className="border-b border-gray-400">{data.profile.lastName}</span>
                    </div>
                    <div className="grid grid-cols-[200px_1fr] gap-4">
                        <span className="font-semibold">Date de naissance :</span>
                        <span className="border-b border-gray-400">{data.profile.birthDate}</span>
                    </div>

                    <div className="mt-8">
                        <span className="font-semibold block mb-2">Parcours de vie :</span>
                        <div className="w-full min-h-[100px] border border-gray-300 p-4 rounded bg-gray-50">
                            {data.profile.lifePath}
                        </div>
                    </div>

                    <div className="mt-8">
                        <span className="font-semibold block mb-2">Projet professionnel du stagiaire :</span>
                        <div className="w-full min-h-[100px] border border-gray-300 p-4 rounded bg-gray-50">
                            {data.profile.project}
                        </div>
                    </div>
                </div>
            </div>

            {/* Theme Pages */}
            {ALL_THEMES.map((theme) => (
                <div key={theme.id}>
                    {/* Page 1: Charts (Vertical Stack) */}
                    <div className="min-h-[29.7cm] p-8 border-b-2 border-gray-100 print:border-none page-break-after flex flex-col">
                        <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-800 pb-2">
                            Thème évalué: {theme.title} - Graphiques
                        </h2>

                        <div className="flex-1 flex flex-col justify-between gap-4">
                            {/* Phase 1 Radar */}
                            <div className="flex-1 border p-4 rounded flex flex-col items-center relative group min-h-[250px]">
                                <button
                                    onClick={() => openModal(`${theme.title} - Phase 1`, theme.subThemes.map(s => s.label), getChartData(theme.id, 'phase1'))}
                                    className="absolute top-2 right-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-bottle-green transition-colors print:hidden"
                                    title="Agrandir"
                                >
                                    <Maximize2 size={20} />
                                </button>
                                <h3 className="text-center font-bold mb-2 text-lg">Phase 1: Pré-requis</h3>
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-full h-[90%]">
                                        <SkillRadar
                                            labels={theme.subThemes.map(s => s.label)}
                                            dataPhase1={getChartData(theme.id, 'phase1')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Phase 2 Radar */}
                            <div className="flex-1 border p-4 rounded flex flex-col items-center relative group min-h-[250px]">
                                <button
                                    onClick={() => openModal(`${theme.title} - Phase 2`, theme.subThemes.map(s => s.label), undefined, getChartData(theme.id, 'phase2'))}
                                    className="absolute top-2 right-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-bottle-green transition-colors print:hidden"
                                    title="Agrandir"
                                >
                                    <Maximize2 size={20} />
                                </button>
                                <h3 className="text-center font-bold mb-2 text-lg">Phase 2: Découverte</h3>
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-full h-[90%]">
                                        <SkillRadar
                                            labels={theme.subThemes.map(s => s.label)}
                                            dataPhase2={getChartData(theme.id, 'phase2')}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Phase 3 Radar */}
                            <div className="flex-1 border p-4 rounded flex flex-col items-center relative group min-h-[250px]">
                                <button
                                    onClick={() => openModal(`${theme.title} - Phase 3`, theme.subThemes.map(s => s.label), undefined, undefined, getChartData(theme.id, 'phase3'))}
                                    className="absolute top-2 right-2 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-bottle-green transition-colors print:hidden"
                                    title="Agrandir"
                                >
                                    <Maximize2 size={20} />
                                </button>
                                <h3 className="text-center font-bold mb-2 text-lg">Phase 3: Approfondissement</h3>
                                <div className="w-full h-full flex items-center justify-center">
                                    <div className="w-full h-[90%]">
                                        <SkillRadar
                                            labels={theme.subThemes.map(s => s.label)}
                                            dataPhase3={getChartData(theme.id, 'phase3')}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Page 2: Details (Table & Observations) */}
                    <div className="min-h-[29.7cm] p-8 border-b-2 border-gray-100 print:border-none page-break-after">
                        <h2 className="text-2xl font-bold mb-6 border-b-2 border-gray-800 pb-2">
                            Thème évalué: {theme.title} - Détails
                        </h2>

                        {/* Scores Table */}
                        <div className="mb-8">
                            <table className="w-full border-collapse border border-gray-800 text-sm">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-800 p-2 text-left">Sous-Thèmes</th>
                                        <th className="border border-gray-800 p-2 w-20 bg-yellow-100 text-center">Ph. 1</th>
                                        <th className="border border-gray-800 p-2 w-20 bg-green-100 text-center">Ph. 2</th>
                                        <th className="border border-gray-800 p-2 w-20 bg-red-100 text-center">Ph. 3</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {theme.subThemes.map(sub => {
                                        const themeData = data.evaluations?.[theme.id as keyof typeof data.evaluations] || {};
                                        return (
                                            <tr key={sub.id}>
                                                <td className="border border-gray-800 p-2">{sub.label}</td>
                                                <td className="border border-gray-800 p-2 text-center font-medium">{themeData[sub.id]?.phase1?.value || '-'}</td>
                                                <td className="border border-gray-800 p-2 text-center font-medium">{themeData[sub.id]?.phase2?.value || '-'}</td>
                                                <td className="border border-gray-800 p-2 text-center font-medium">{themeData[sub.id]?.phase3?.value || '-'}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>

                        {/* Final Observations */}
                        <div className="border border-gray-800 p-6 rounded bg-gray-50">
                            <h3 className="font-bold border-b border-gray-800 pb-2 mb-6 text-lg">Observations Finales (Phase 3)</h3>
                            <div className="grid grid-cols-1 gap-8">
                                <div>
                                    <strong className="block mb-2 uppercase text-gray-600">Principales capacités identifiées :</strong>
                                    <div className="p-4 bg-white border border-gray-300 rounded min-h-[150px] whitespace-pre-wrap">
                                        {data.themeObservations?.[theme.id]?.phase3?.capacities || 'Aucune observation saisie.'}
                                    </div>
                                </div>
                                <div>
                                    <strong className="block mb-2 uppercase text-gray-600">Principales difficultés rencontrées :</strong>
                                    <div className="p-4 bg-white border border-gray-300 rounded min-h-[150px] whitespace-pre-wrap">
                                        {data.themeObservations?.[theme.id]?.phase3?.difficulties || 'Aucune observation saisie.'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Global Summary Page */}
            <div className="min-h-[29.7cm] p-12 border-b-2 border-gray-100 print:border-none page-break-after relative">
                <h2 className="text-2xl font-bold mb-8 border-b-2 border-gray-800 pb-2">
                    Moyenne des 5 thèmes à la fin du stage
                </h2>

                <div className="max-w-2xl mx-auto mb-12 h-[500px] relative group">
                    <button
                        onClick={() => openModal(
                            "Moyenne Globale",
                            ALL_THEMES.map(t => t.title),
                            getGlobalAverageData('phase1'),
                            getGlobalAverageData('phase2'),
                            getGlobalAverageData('phase3')
                        )}
                        className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-600 hover:text-bottle-green transition-colors print:hidden z-10"
                        title="Agrandir"
                    >
                        <Maximize2 size={24} />
                    </button>
                    <SkillRadar
                        labels={ALL_THEMES.map(t => t.title.split(' ')[0])} // Shorten labels
                        dataPhase1={getGlobalAverageData('phase1')}
                        dataPhase2={getGlobalAverageData('phase2')}
                        dataPhase3={getGlobalAverageData('phase3')}
                    />
                </div>

                <div className="mt-16 border-t pt-8 break-inside-avoid">
                    <h3 className="text-xl font-bold mb-8">Signature</h3>

                    <div className="grid grid-cols-2 gap-16">
                        <div>
                            <p className="font-semibold mb-4">Date :</p>
                            <div className="border-b border-gray-400 h-8"></div>
                        </div>
                        <div></div>

                        <div className="h-32">
                            <p className="font-semibold mb-4">Le référent CEP,</p>
                        </div>

                        <div className="h-32">
                            <p className="font-semibold mb-4">Le stagiaire,</p>
                        </div>
                    </div>
                </div>
            </div>

            <ChartModal
                isOpen={modalConfig.isOpen}
                onClose={() => setModalConfig(prev => ({ ...prev, isOpen: false }))}
                title={modalConfig.title}
                labels={modalConfig.labels}
                dataPhase1={modalConfig.dataPhase1}
                dataPhase2={modalConfig.dataPhase2}
                dataPhase3={modalConfig.dataPhase3}
            />
        </div >
    );
};
