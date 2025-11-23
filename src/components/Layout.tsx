import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FileText, User, Printer, LayoutDashboard, LogOut, Menu, X, Lock, Eye } from 'lucide-react';
import { useAuth } from '../store/AuthContext';
import { AccessibilityModal } from './AccessibilityMenu';

export const Layout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isAccessibilityModalOpen, setIsAccessibilityModalOpen] = useState(false);

    const navItems = [
        { path: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
        { path: '/evaluation', label: 'Évaluation', icon: FileText },
        { path: '/booklet', label: 'Livret', icon: Printer },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const sidebarWidth = isHovered ? 'w-64' : 'w-20';

    return (
        <div className="min-h-screen bg-[#f9f9f9] dark:bg-gray-900 flex font-sans transition-colors duration-300">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 px-4 py-3 z-20 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full text-bottle-green dark:text-green-400">
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <div className="font-bold text-xl tracking-tight text-bottle-green dark:text-green-400">E-VAL</div>
                </div>
            </div>

            {/* Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`
                    fixed lg:static inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0 w-64 bg-white dark:bg-gray-800 shadow-xl' : '-translate-x-full lg:translate-x-0 lg:bg-transparent lg:shadow-none'}
                    ${sidebarWidth}
                    print:hidden flex flex-col h-screen sticky top-0
                `}
            >
                <div className="h-20 flex items-center justify-center">
                    <div className={`flex items-center gap-3 transition-all duration-300 ${isHovered ? 'px-6 w-full justify-start' : 'justify-center'}`}>
                        <div className="w-10 h-10 bg-bottle-green rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-bottle-green/20 shrink-0">
                            E
                        </div>
                        <span className={`font-bold text-xl tracking-tight text-bottle-green dark:text-green-400 whitespace-nowrap overflow-hidden transition-all duration-300 ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                            E-VAL
                        </span>
                    </div>
                </div>

                <nav className="px-3 space-y-2 flex-1 overflow-y-auto py-6">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 group relative ${isActive
                                    ? 'bg-bottle-green text-white shadow-lg shadow-bottle-green/30 translate-y-[-2px]'
                                    : 'text-bottle-green dark:text-green-400 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:translate-y-[-2px]'
                                    }`}
                            >
                                <div className="shrink-0">
                                    <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                                </div>
                                <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                                    {item.label}
                                </span>
                                {!isHovered && (
                                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        );
                    })}

                    <div className="pt-4 mt-4 border-t border-gray-200/50 dark:border-gray-700/50">
                        <button
                            onClick={() => setIsAccessibilityModalOpen(true)}
                            className={`flex items-center gap-4 px-3 py-3 w-full text-left text-bottle-green dark:text-green-400 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:translate-y-[-2px] rounded-xl transition-all duration-200 ${!isHovered && 'justify-center'}`}
                            title="Accessibilité"
                        >
                            <Eye size={24} />
                            <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                                Accessibilité
                            </span>
                        </button>

                        <button
                            onClick={() => setIsPasswordModalOpen(true)}
                            className={`flex items-center gap-4 px-3 py-3 w-full text-left text-bottle-green dark:text-green-400 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:translate-y-[-2px] rounded-xl transition-all duration-200 ${!isHovered && 'justify-center'}`}
                            title="Profil"
                        >
                            <User size={24} />
                            <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                                Profil
                            </span>
                        </button>

                        <button
                            onClick={handleLogout}
                            className={`flex items-center gap-4 px-3 py-3 w-full text-left text-red-600 hover:bg-white dark:hover:bg-gray-800 hover:shadow-md hover:translate-y-[-2px] rounded-xl transition-all duration-200 ${!isHovered && 'justify-center'}`}
                            title="Déconnexion"
                        >
                            <LogOut size={24} />
                            <span className={`text-sm font-medium whitespace-nowrap overflow-hidden transition-all duration-300 ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
                                Déconnexion
                            </span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-x-hidden print:p-0 print:pt-0 transition-all duration-300">
                <div className="max-w-7xl mx-auto print:max-w-none bg-white dark:bg-gray-800 min-h-[calc(100vh-4rem)] rounded-[2rem] shadow-sm p-6 lg:p-10 border border-gray-100 dark:border-gray-700 relative">
                    <Outlet />
                </div>
            </main>

            {/* Password Modal */}
            {isPasswordModalOpen && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <Lock className="text-bottle-green" /> Modifier le mot de passe
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ancien mot de passe</label>
                                <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bottle-green outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                                <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bottle-green outline-none" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer le mot de passe</label>
                                <input type="password" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-bottle-green outline-none" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 mt-8">
                            <button
                                onClick={() => setIsPasswordModalOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                Annuler
                            </button>
                            <button
                                onClick={() => setIsPasswordModalOpen(false)}
                                className="px-4 py-2 bg-bottle-green text-white rounded-lg hover:bg-green-800 transition-colors shadow-lg shadow-bottle-green/20"
                            >
                                Enregistrer
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Accessibility Modal */}
            <AccessibilityModal
                isOpen={isAccessibilityModalOpen}
                onClose={() => setIsAccessibilityModalOpen(false)}
            />
        </div>
    );
};
