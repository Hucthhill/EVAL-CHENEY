import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEvaluation } from '../store/EvaluationContext';
import { Plus, Search, Trash2, FileText, CheckCircle, Clock } from 'lucide-react';

export const DashboardPage: React.FC = () => {
    const { evaluationsList, createNewEvaluation, loadEvaluation, deleteEvaluation } = useEvaluation();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<'all' | 'draft' | 'completed'>('all');

    const handleCreate = () => {
        createNewEvaluation();
        navigate('/evaluation');
    };

    const handleEdit = (id: string) => {
        loadEvaluation(id);
        navigate('/evaluation');
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm('Êtes-vous sûr de vouloir supprimer cette évaluation ?')) {
            deleteEvaluation(id);
        }
    };

    const filteredList = evaluationsList.filter(ev => {
        const matchesSearch = (ev.profile.firstName + ' ' + ev.profile.lastName).toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || ev.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: evaluationsList.length,
        completed: evaluationsList.filter(e => e.status === 'completed').length,
        draft: evaluationsList.filter(e => e.status === 'draft').length,
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
                    <p className="text-gray-500">Gérez les évaluations des stagiaires</p>
                </div>
                <button
                    onClick={handleCreate}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
                >
                    <Plus size={20} />
                    Nouvelle évaluation
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
                        <FileText size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total Dossiers</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-green-50 text-green-600 rounded-lg">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Terminés</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                    <div className="p-3 bg-yellow-50 text-yellow-600 rounded-lg">
                        <Clock size={24} />
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">En cours</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
                    </div>
                </div>
            </div>

            {/* Filters & Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-4 justify-between bg-gray-50/50">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Rechercher un stagiaire..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div className="flex gap-2">
                        {(['all', 'draft', 'completed'] as const).map((status) => (
                            <button
                                key={status}
                                onClick={() => setStatusFilter(status)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${statusFilter === status
                                        ? 'bg-white text-blue-600 shadow-sm border border-gray-200'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                {status === 'all' ? 'Tous' : status === 'draft' ? 'En cours' : 'Terminés'}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-gray-50 text-gray-500 text-sm">
                                <th className="px-6 py-4 font-medium">Stagiaire</th>
                                <th className="px-6 py-4 font-medium">Date de création</th>
                                <th className="px-6 py-4 font-medium">Dernière modification</th>
                                <th className="px-6 py-4 font-medium">Statut</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredList.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        Aucune évaluation trouvée
                                    </td>
                                </tr>
                            ) : (
                                filteredList.map((ev) => (
                                    <tr
                                        key={ev.id}
                                        onClick={() => handleEdit(ev.id)}
                                        className="hover:bg-blue-50/50 cursor-pointer transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-gray-900">
                                                {ev.profile.firstName || 'Nouveau'} {ev.profile.lastName || 'Stagiaire'}
                                            </div>
                                            <div className="text-xs text-gray-500">{ev.profile.birthDate}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(ev.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {new Date(ev.updatedAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${ev.status === 'completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                {ev.status === 'completed' ? 'Terminé' : 'En cours'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={(e) => handleDelete(e, ev.id)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                title="Supprimer"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
