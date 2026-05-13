// Tipos para as avaliações
export interface PreCPREAnswers {
  isFemale: boolean;
  isYoung: boolean; // ≤ 30 anos
  hasPEPHistory: boolean;
  hasPancreatitisHistory: boolean;
  hasNonDilatedDucts: boolean; // ≤ 5mm (♀) / ≤ 7mm (♂)
  hasNormalBilirubin: boolean; // ≤ 1.2 mg/dL
}

export interface PostCPREAnswers {
  hasDifficultCannulation: boolean; // ≥ 5 min ou > 5 tentativas
  hasContrastInjection: boolean; // Injeção no ducto pancreático principal
  hasFistulotomy: boolean; // Fistulotomia suprapapilar ou esfincterotomia transpancreática
  hasSphincterDysfunction: boolean; // Disfunção esfíncter Oddi (papilite/fibrose)
}

// Tipos para os resultados
export type PreRiskLevel = 'high' | 'low';
export type PostRiskLevel = 'high' | 'none';

export interface PreCPREResult {
  riskLevel: PreRiskLevel;
  treatment: string[];
  shouldProceedToPost: boolean;
}

export interface PostCPREResult {
  riskLevel: PostRiskLevel;
  treatment: string[];
}

// Tipos para as perguntas (para facilitar renderização)
export interface Question {
  id: keyof PreCPREAnswers | keyof PostCPREAnswers;
  text: string;
  footnoteRef?: string;
}

// Login types
export interface LoginData {
  crc: string;
  password: string;
}

// Navigation types
export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  Login: undefined;
  PreAssessment: undefined;
  PreResult: {
    answers: PreCPREAnswers;
    result: PreCPREResult;
  };
  PostAssessment: undefined;
  PostResult: {
    answers: PostCPREAnswers;
    result: PostCPREResult;
  };
};