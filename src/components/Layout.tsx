import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FileText, User, Printer } from 'lucide-react';

export const Layout: React.FC = () => {
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Informations', icon: User },
        { path: '/evaluation', label: 'Évaluation', icon: FileText },
        { path: '/booklet', label: 'Livret', icon: Printer },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 fixed h-full z-10 print:hidden">
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-xl font-bold text-blue-900">ESAT Eval</h1>
                    <p className="text-xs text-gray-500 mt-1">Centre d'Évaluation Professionnelle</p>
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                    ? 'bg-blue-50 text-blue-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon size={20} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 print:ml-0 print:p-0">
                <div className="max-w-5xl mx-auto print:max-w-none">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
