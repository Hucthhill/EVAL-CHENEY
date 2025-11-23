import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';
import { Lock } from 'lucide-react';

export const LoginPage: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (login(password)) {
            navigate('/');
        } else {
            setError('Mot de passe incorrect');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/20">
                <div className="text-center mb-8">
                    <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-400/30">
                        <Lock className="text-blue-400" size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-white">E-VAL</h1>
                    <p className="text-blue-200 mt-2">outil d'évaluation professionnelle EPNAK</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-blue-200 mb-2">
                            Mot de passe
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-white/5 border border-blue-300/20 rounded-xl text-white placeholder-blue-300/30 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Entrez votre mot de passe"
                        />
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                        Se connecter
                    </button>
                </form>

                <div className="mt-8 bg-white rounded-xl p-4 text-center">
                    <p className="text-sm font-medium text-gray-600 mb-2">propulsé par CAMPUS EPNAK</p>
                    <img src="/logo_campus_epnak.png" alt="Campus EPNAK" className="h-12 mx-auto mb-2 object-contain" />
                    <p className="text-xs text-gray-400">version Alpha test 0.1.251123</p>
                </div>
            </div>
        </div>
    );
};
