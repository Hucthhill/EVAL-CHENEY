import React from 'react';
import { useAccessibility } from '../store/AccessibilityContext';
import { Settings, Type, Moon, Sun, X } from 'lucide-react';

interface AccessibilityModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const AccessibilityModal: React.FC<AccessibilityModalProps> = ({ isOpen, onClose }) => {
    const { theme, toggleTheme, textSize, setTextSize, font, setFont } = useAccessibility();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
                >
                    <X size={24} />
                </button>

                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Settings className="text-bottle-green" /> Accessibilité
                </h3>

                <div className="space-y-6">
                    {/* Theme */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="font-medium text-gray-700">Thème</span>
                        <button
                            onClick={toggleTheme}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition-colors text-bottle-green font-medium"
                        >
                            {theme === 'light' ? (
                                <>
                                    <Moon size={18} /> Mode Sombre
                                </>
                            ) : (
                                <>
                                    <Sun size={18} /> Mode Clair
                                </>
                            )}
                        </button>
                    </div>

                    {/* Text Size */}
                    <div className="space-y-3">
                        <span className="font-medium text-gray-700 flex items-center gap-2">
                            <Type size={18} /> Taille du texte
                        </span>
                        <div className="flex justify-between gap-2 bg-gray-50 p-2 rounded-xl border border-gray-100">
                            {[1, 2, 3, 4, 5, 6].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setTextSize(size)}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${textSize === size
                                        ? 'bg-bottle-green text-white shadow-md scale-110'
                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    A{size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Font */}
                    <div className="space-y-3">
                        <span className="font-medium text-gray-700">Police d'écriture</span>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setFont('standard')}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border ${font === 'standard'
                                    ? 'bg-bottle-green text-white border-bottle-green shadow-md'
                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                Standard
                            </button>
                            <button
                                onClick={() => setFont('opendyslexic')}
                                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all border font-dyslexic ${font === 'opendyslexic'
                                    ? 'bg-bottle-green text-white border-bottle-green shadow-md'
                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                    }`}
                            >
                                OpenDyslexic
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-8">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-bottle-green text-white rounded-lg hover:bg-green-800 transition-colors shadow-lg shadow-bottle-green/20"
                    >
                        Fermer
                    </button>
                </div>
            </div>
        </div>
    );
};
