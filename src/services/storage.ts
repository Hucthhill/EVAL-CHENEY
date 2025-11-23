import type { EvaluationData } from '../types';

const STORAGE_KEY = 'esat_evaluations';

export const storageService = {
    getAll: (): EvaluationData[] => {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    },

    getById: (id: string): EvaluationData | undefined => {
        const evaluations = storageService.getAll();
        return evaluations.find(e => e.id === id);
    },

    save: (evaluation: EvaluationData): void => {
        const evaluations = storageService.getAll();
        const index = evaluations.findIndex(e => e.id === evaluation.id);

        if (index >= 0) {
            evaluations[index] = { ...evaluation, updatedAt: new Date().toISOString() };
        } else {
            evaluations.push({ ...evaluation, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(evaluations));
    },

    delete: (id: string): void => {
        const evaluations = storageService.getAll();
        const filtered = evaluations.filter(e => e.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    }
};
