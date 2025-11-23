import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { EvaluationData, Phase } from '../types';
import { INITIAL_EVALUATION_DATA } from '../types';
import { storageService } from '../services/storage';

interface EvaluationContextType {
    data: EvaluationData;
    evaluationsList: EvaluationData[];
    isLoading: boolean;
    updateProfile: (field: keyof EvaluationData['profile'], value: string) => void;
    updateScore: (theme: keyof EvaluationData['evaluations'], subTheme: string, phase: Phase, score: number) => void;
    updateObservation: (phase: Phase, text: string) => void;
    updateThemeObservation: (themeId: string, phase: Phase, field: 'capacities' | 'difficulties', text: string) => void;
    validatePhase: (phase: Phase) => void;
    loadEvaluation: (id: string) => void;
    createNewEvaluation: () => void;
    deleteEvaluation: (id: string) => void;
    saveCurrentEvaluation: () => void;
}

const EvaluationContext = createContext<EvaluationContextType | undefined>(undefined);

export const EvaluationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [data, setData] = useState<EvaluationData>(INITIAL_EVALUATION_DATA);
    const [evaluationsList, setEvaluationsList] = useState<EvaluationData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load list on mount
    useEffect(() => {
        const list = storageService.getAll();
        // Ensure all items in list have the new structure
        const migratedList = list.map(item => ({ ...INITIAL_EVALUATION_DATA, ...item }));
        setEvaluationsList(migratedList);
        setIsLoading(false);
    }, []);

    // Auto-save effect (debounced could be better, but simple for now)
    useEffect(() => {
        if (data.id) {
            storageService.save(data);
            // Update list to reflect changes (e.g. name change)
            setEvaluationsList(prev => prev.map(e => e.id === data.id ? data : e));
        }
    }, [data]);

    const createNewEvaluation = () => {
        const newEval: EvaluationData = {
            ...INITIAL_EVALUATION_DATA,
            id: crypto.randomUUID(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            status: 'draft'
        };
        setData(newEval);
        setEvaluationsList(prev => [...prev, newEval]);
        storageService.save(newEval);
    };

    const loadEvaluation = (id: string) => {
        const evaluation = storageService.getById(id);
        if (evaluation) {
            // Merge with initial data to ensure new fields (like themeObservations) exist
            setData({ ...INITIAL_EVALUATION_DATA, ...evaluation });
        }
    };

    const deleteEvaluation = (id: string) => {
        storageService.delete(id);
        setEvaluationsList(prev => prev.filter(e => e.id !== id));
        if (data.id === id) {
            setData(INITIAL_EVALUATION_DATA);
        }
    };

    const saveCurrentEvaluation = () => {
        if (data.id) {
            storageService.save(data);
        }
    };

    const updateProfile = (field: keyof EvaluationData['profile'], value: string) => {
        setData(prev => ({
            ...prev,
            profile: { ...prev.profile, [field]: value },
            updatedAt: new Date().toISOString()
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
            },
            updatedAt: new Date().toISOString()
        }));
    };

    const updateObservation = (phase: Phase, text: string) => {
        setData(prev => ({
            ...prev,
            observations: { ...prev.observations, [phase]: text },
            updatedAt: new Date().toISOString()
        }));
    };

    const updateThemeObservation = (themeId: string, phase: Phase, field: 'capacities' | 'difficulties', text: string) => {
        setData(prev => ({
            ...prev,
            themeObservations: {
                ...prev.themeObservations,
                [themeId]: {
                    ...prev.themeObservations[themeId],
                    [phase]: {
                        ...prev.themeObservations[themeId]?.[phase] || { capacities: '', difficulties: '' },
                        [field]: text
                    }
                }
            },
            updatedAt: new Date().toISOString()
        }));
    };

    const validatePhase = (phase: Phase) => {
        setData(prev => {
            if (prev.validatedPhases.includes(phase)) return prev;
            return {
                ...prev,
                validatedPhases: [...prev.validatedPhases, phase],
                updatedAt: new Date().toISOString()
            };
        });
    };

    return (
        <EvaluationContext.Provider value={{
            data,
            evaluationsList,
            isLoading,
            updateProfile,
            updateScore,
            updateObservation,
            updateThemeObservation,
            validatePhase,
            loadEvaluation,
            createNewEvaluation,
            deleteEvaluation,
            saveCurrentEvaluation
        }}>
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
