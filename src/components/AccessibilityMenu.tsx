import React, { useState } from 'react';
import { useAccessibility } from '../store/AccessibilityContext';
import { Settings, Type, Moon, Sun, Eye } from 'lucide-react';

export const AccessibilityMenu: React.FC = () => {
    const { theme, toggleTheme, textSize, setTextSize, font, setFont } = useAccessibility();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-bottle-green"
                title="Accessibilité"
            >
                <Eye size={24} />
            </button>

            {isOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Settings size={16} /> Accessibilité
                    </h3>

                    <div className="space-y-4">
                        {/* Theme */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-700">Thème</span>
                            <button
                                onClick={toggleTheme}
                                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                            </button>
                        </div>

                        {/* Text Size */}
                        <div className="space-y-2">
                            <span className="text-sm text-gray-700 flex items-center gap-2">
                                <Type size={16} /> Taille du texte
                            </span>
                            <div className="flex justify-between gap-1">
                                {[1, 2, 3, 4, 5, 6].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setTextSize(size)}
                                        className={`w-8 h-8 rounded-md flex items-center justify-center text-sm font-medium transition-colors ${textSize === size
                                                ? 'bg-bottle-green text-white'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        A{size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Font */}
                        <div className="space-y-2">
                            <span className="text-sm text-gray-700">Police</span>
                            <div className="grid grid-cols-2 gap-2">
                                <button
                                    onClick={() => setFont('standard')}
                                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${font === 'standard'
                                            ? 'bg-bottle-green text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    Standard
                                </button>
                                <button
                                    onClick={() => setFont('opendyslexic')}
                                    className={`px-3 py-2 rounded-lg text-sm transition-colors font-dyslexic ${font === 'opendyslexic'
                                            ? 'bg-bottle-green text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    OpenDys
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
