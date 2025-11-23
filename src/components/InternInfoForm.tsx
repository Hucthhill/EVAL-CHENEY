import React from 'react';
import { useEvaluation } from '../store/EvaluationContext';

export const InternInfoForm: React.FC = () => {
    const { data, updateProfile } = useEvaluation();

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 print:shadow-none print:border-none">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Informations du Stagiaire</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Nom</label>
                    <input
                        type="text"
                        value={data.profile.firstName}
                        onChange={(e) => updateProfile('firstName', e.target.value)}
                        className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all placeholder:text-gray-400"
                        placeholder="Nom du stagiaire"
                    />
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Prénom</label>
                    <input
                        type="text"
                        value={data.profile.lastName}
                        onChange={(e) => updateProfile('lastName', e.target.value)}
                        className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all placeholder:text-gray-400"
                        placeholder="Prénom du stagiaire"
                    />
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Date de naissance</label>
                    <input
                        type="date"
                        value={data.profile.birthDate}
                        onChange={(e) => updateProfile('birthDate', e.target.value)}
                        className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all"
                    />
                </div>

                <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Nom du référent</label>
                    <input
                        type="text"
                        value={data.profile.referent || ''}
                        onChange={(e) => updateProfile('referent', e.target.value)}
                        className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all placeholder:text-gray-400"
                        placeholder="Nom du référent"
                    />
                </div>

                <div className="md:col-span-2 space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Parcours de vie</label>
                    <textarea
                        value={data.profile.lifePath || ''}
                        onChange={(e) => updateProfile('lifePath', e.target.value)}
                        rows={3}
                        className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all resize-none placeholder:text-gray-400 leading-relaxed"
                        placeholder="Brève description du parcours..."
                    />
                </div>

                <div className="md:col-span-2 space-y-3">
                    <label className="block text-sm font-medium text-gray-700">Projet professionnel du stagiaire</label>
                    <textarea
                        value={data.profile.project || ''}
                        onChange={(e) => updateProfile('project', e.target.value)}
                        rows={3}
                        className="w-full px-5 py-3 bg-gray-50 border-0 rounded-xl focus:ring-2 focus:ring-black focus:bg-white outline-none transition-all resize-none placeholder:text-gray-400 leading-relaxed"
                        placeholder="Description du projet professionnel..."
                    />
                </div>
            </div>
        </div>
    );
};
