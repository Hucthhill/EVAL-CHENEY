export type Phase = 'phase1' | 'phase2' | 'phase3';

export interface Score {
    value: number; // 1-7
    comment?: string;
}

export interface ThemeEvaluation {
    [subThemeId: string]: {
        [key in Phase]?: Score;
    };
}

export interface InternProfile {
    firstName: string;
    lastName: string;
    birthDate: string;
    lifePath?: string; // Parcours de vie
    project?: string; // Projet professionnel
    finalEvalDate?: string;
    referent?: string;
    internshipPath?: string; // Parcours du stage
    discoveryStage?: string;
    deepeningStage?: string;
}

export interface EvaluationData {
    profile: InternProfile;
    evaluations: {
        communication: ThemeEvaluation;
        attitude: ThemeEvaluation;
        rules: ThemeEvaluation; // Respect des règles
        productivity: ThemeEvaluation; // Productivité/technicité
        learning: ThemeEvaluation; // Acquis et aptitude
    };
    observations: {
        [key in Phase]?: string;
    };
    orientation?: string;
}

export const INITIAL_EVALUATION_DATA: EvaluationData = {
    profile: {
        firstName: '',
        lastName: '',
        birthDate: '',
    },
    evaluations: {
        communication: {},
        attitude: {},
        rules: {},
        productivity: {},
        learning: {},
    },
    observations: {},
};
