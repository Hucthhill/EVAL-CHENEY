import React from 'react';
import { X } from 'lucide-react';
import { SkillRadar } from './charts/SkillRadar';

interface ChartModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    labels: string[];
    dataPhase1?: number[];
    dataPhase2?: number[];
    dataPhase3?: number[];
}

export const ChartModal: React.FC<ChartModalProps> = ({
    isOpen,
    onClose,
    title,
    labels,
    dataPhase1,
    dataPhase2,
    dataPhase3
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 p-6 flex items-center justify-center bg-gray-50/50">
                    <div className="w-full h-full">
                        <SkillRadar
                            labels={labels}
                            dataPhase1={dataPhase1}
                            dataPhase2={dataPhase2}
                            dataPhase3={dataPhase3}
                            title=""
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
