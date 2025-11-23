import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FileText, User, Printer, LayoutDashboard, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../store/AuthContext';

export const Layout: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const navItems = [
        { path: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
        { path: '/', label: 'Informations', icon: User },
        { path: '/evaluation', label: 'Évaluation', icon: FileText },
        { path: '/booklet', label: 'Livret', icon: Printer },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-[#f9f9f9] flex font-sans">
            {/* Mobile Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white px-4 py-3 z-20 flex justify-between items-center shadow-sm">
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 hover:bg-gray-100 rounded-full">
                        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                    <div className="font-bold text-xl tracking-tight">ESAT Eval</div>
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
            <aside className={`
        fixed lg:static inset-y-0 left-0 w-64 bg-white lg:bg-transparent z-40 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full lg:translate-x-0'}
        print:hidden flex flex-col h-screen sticky top-0
      `}>
                <div className="p-4 pl-6 mb-2 hidden lg:flex items-center gap-2">
                    <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white font-bold">E</div>
                    <span className="font-bold text-xl tracking-tight">ESAT Eval</span>
                </div>

                <nav className="px-3 space-y-1 flex-1 overflow-y-auto py-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setIsSidebarOpen(false)}
                                className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                        ? 'bg-black text-white font-medium'
                                        : 'text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                                <span className="text-sm">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-3 border-t border-gray-200 mx-3 mt-auto mb-4">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-4 px-4 py-3 w-full text-left text-gray-700 hover:bg-gray-200 rounded-xl transition-colors"
                    >
                        <LogOut size={22} />
                        <span className="text-sm font-medium">Déconnexion</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 pt-20 lg:pt-8 overflow-x-hidden print:p-0 print:pt-0">
                <div className="max-w-7xl mx-auto print:max-w-none bg-white min-h-[calc(100vh-4rem)] rounded-3xl shadow-sm p-6 lg:p-10 border border-gray-100">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
