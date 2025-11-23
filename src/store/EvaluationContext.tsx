import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { INITIAL_EVALUATION_DATA } from '../types';
import type { EvaluationData, Phase } from '../types';

interface EvaluationContextType {
    data: EvaluationData;
    updateProfile: (field: keyof EvaluationData['profile'], value: string) => void;
    updateScore: (theme: keyof EvaluationData['evaluations'], subTheme: string, phase: Phase, score: number) => void;
    updateObservation: (phase: Phase, text: string) => void;
    resetData: () => void;
}

const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined);

export const EvaluationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<EvaluationData>(INITIAL_EVALUATION_DATA);

    const updateProfile = (field: keyof EvaluationData['profile'], value: string) => {
        setData(prev => ({
            ...prev,
            profile: { ...prev.profile, [field]: value }
        }));
    };

    const updateScore = (theme: keyof EvaluationData['evaluations'], subTheme: string, phase: Phase, score: number) => {
        setData(prev => ({
            ...prev,
            evaluations: {
                ...prev.evaluations,
                [theme]: {
                    ...prev.evaluations[theme],
                    [subTheme]: {
                        ...prev.evaluations[theme][subTheme],
                        [phase]: { value: score }
                    }
                }
            }
        }));
    };

    const updateObservation = (phase: Phase, text: string) => {
        setData(prev => ({
            ...prev,
            observations: { ...prev.observations, [phase]: text }
        }));
    };

    const resetData = () => setData(INITIAL_EVALUATION_DATA);

    return (
        <EvaluationContext.Provider value={{ data, updateProfile, updateScore, updateObservation, resetData }}>
            {children}
        </EvaluationContext.Provider>
    );
};

export const useEvaluation = () => {
    const context = useContext(EvaluationContext);
    if (!context) {
        throw new Error('useEvaluation must be used within an EvaluationProvider');
    }
    return context;
};
