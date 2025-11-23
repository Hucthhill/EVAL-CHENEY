import { useEvaluation } from '../store/EvaluationContext';

export const IdentityTab: React.FC = () => {
    const { data, updateProfile } = useEvaluation();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center uppercase border-b-2 border-bottle-green pb-2 mb-12 inline-block mx-auto w-full max-w-md">
                Centre d'Évaluation Professionnelle
            </h2>

            <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                    <label className="font-semibold text-gray-800">Nom :</label>
                    <input
                        type="text"
                        value={data.profile.firstName}
                        onChange={(e) => updateProfile('firstName', e.target.value)}
                        className="w-full border-b border-gray-300 focus:border-bottle-green outline-none py-1 bg-transparent transition-colors"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                    <label className="font-semibold text-gray-800">Prénom :</label>
                    <input
                        type="text"
                        value={data.profile.lastName}
                        onChange={(e) => updateProfile('lastName', e.target.value)}
                        className="w-full border-b border-gray-300 focus:border-bottle-green outline-none py-1 bg-transparent transition-colors"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                    <label className="font-semibold text-gray-800">Date de naissance :</label>
                    <input
                        type="date"
                        value={data.profile.birthDate}
                        onChange={(e) => updateProfile('birthDate', e.target.value)}
                        className="w-full border-b border-gray-300 focus:border-bottle-green outline-none py-1 bg-transparent transition-colors"
                    />
                </div>

                {/* Long Text Areas */}
                <div className="space-y-2 mt-6">
                    <label className="font-semibold text-gray-800 block">Parcours de vie :</label>
                    <textarea
                        value={data.profile.lifePath || ''}
                        onChange={(e) => updateProfile('lifePath', e.target.value)}
                        rows={4}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bottle-green outline-none resize-none"
                    />
                </div>

                <div className="space-y-2">
                    <label className="font-semibold text-gray-800 block">Projet professionnel du stagiaire :</label>
                    <textarea
                        value={data.profile.project || ''}
                        onChange={(e) => updateProfile('project', e.target.value)}
                        rows={4}
                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bottle-green outline-none resize-none"
                    />
                </div>

                {/* Dates & Referent */}
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center mt-6">
                    <label className="font-semibold text-gray-800">Date de l'évaluation finale :</label>
                    <input
                        type="date"
                        value={data.profile.finalEvalDate || ''}
                        onChange={(e) => updateProfile('finalEvalDate', e.target.value)}
                        className="w-full border-b border-gray-300 focus:border-bottle-green outline-none py-1 bg-transparent transition-colors"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center">
                    <label className="font-semibold text-gray-800">Nom du référent :</label>
                    <input
                        type="text"
                        value={data.profile.referent || ''}
                        onChange={(e) => updateProfile('referent', e.target.value)}
                        className="w-full border-b border-gray-300 focus:border-bottle-green outline-none py-1 bg-transparent transition-colors"
                    />
                </div>

                {/* Stages */}
                <div className="mt-8">
                    <label className="font-semibold text-gray-800 block mb-2">Parcours du stage :</label>
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center pl-4">
                        <label className="text-gray-700">- Stage découverte :</label>
                        <input
                            type="text"
                            value={data.profile.discoveryStage || ''}
                            onChange={(e) => updateProfile('discoveryStage', e.target.value)}
                            className="w-full border-b border-gray-300 focus:border-bottle-green outline-none py-1 bg-transparent transition-colors"
                            placeholder="Dates ou détails..."
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 items-center pl-4 mt-2">
                        <label className="text-gray-700">- Stage d'approfondissement :</label>
                        <input
                            type="text"
                            value={data.profile.deepeningStage || ''}
                            onChange={(e) => updateProfile('deepeningStage', e.target.value)}
                            className="w-full border-b border-gray-300 focus:border-bottle-green outline-none py-1 bg-transparent transition-colors"
                            placeholder="Dates ou détails..."
                        />
                    </div>
                </div>

                {/* Table */}
                <div className="mt-10 overflow-x-auto rounded-lg border border-gray-300">
                    <table className="w-full text-sm text-center border-collapse">
                        <thead>
                            <tr>
                                <th className="border-r border-b border-gray-300 bg-gray-100 p-3 w-1/3 font-bold">
                                    Stage découverte (15 jours)
                                </th>
                                <th className="border-b border-gray-300 bg-gray-100 p-3 w-2/3 font-bold">
                                    Stage d'approfondissement (4 semaines)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border-r border-gray-300 p-0 align-top">
                                    <div className="grid grid-cols-2 h-full">
                                        <div className="bg-yellow-100 p-3 border-r border-gray-300 flex flex-col justify-center h-full min-h-[100px]">
                                            <span className="font-bold block">1ère phase</span>
                                            <span>(2 jours)</span>
                                            <span className="block mt-2 font-medium">Evaluation des pré-requis</span>
                                        </div>
                                        <div className="bg-blue-100 p-3 flex flex-col justify-center h-full min-h-[100px]">
                                            <span className="font-bold block">2ème phase</span>
                                            <span>(1 semaine 1/2)</span>
                                            <span className="block mt-2 font-medium">Découverte des activités de production et mises en situations</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-0 align-top bg-green-100">
                                    <div className="p-4 flex flex-col justify-center h-full min-h-[100px]">
                                        <span className="font-bold block">3ème phase</span>
                                        <span>(4 semaines)</span>
                                        <span className="block mt-2 font-medium">Mises en situation de travail sur une activité sélectionnée par le stagiaire</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Lists */}
                <div className="mt-10 space-y-6">
                    <div>
                        <h3 className="font-bold text-lg underline mb-3">Thèmes d'évaluation abordés durant les 3 phases:</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Communication / relation ;</li>
                            <li>Savoir être / attitude ;</li>
                            <li>Respect des règles et des contraintes ;</li>
                            <li>Productivité / technicité ;</li>
                            <li>Acquis et aptitude.</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg underline mb-3">Objectifs de l'évaluation :</h3>
                        <ul className="list-disc pl-6 space-y-1 text-gray-700">
                            <li>Dresser une évaluation des compétences ;</li>
                            <li>Vérifier la cohérence entre le projet du stagiaire et ses capacités en situation de travail ;</li>
                            <li>Permettre une orientation la plus adaptée en s'appuyant sur l'évaluation de compétences du stage d'approfondissement.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};
