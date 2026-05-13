import { colors } from '../theme/tokens';
import {
  PreCPREAnswers,
  PostCPREAnswers,
  PreCPREResult,
  PostCPREResult,
  PreRiskLevel,
  PostRiskLevel,
  Question,
} from './types';

/**
 * LÓGICA CORRIGIDA:
 * Pré-CPRE: QUALQUER "Sim" = ALTO RISCO
 * Pós-CPRE: QUALQUER "Sim" = ALTO RISCO
 * Os critérios SÃO fatores de risco para PEP
 */

// ============= FUNÇÕES DE AVALIAÇÃO DE RISCO =============

export const isHighRiskPre = (answers: PreCPREAnswers): boolean => {
  return Object.values(answers).some(v => v === true);
};

export const isHighRiskPost = (answers: PostCPREAnswers): boolean => {
  return Object.values(answers).some(v => v === true);
};

// ============= AVALIADORES PRINCIPAIS =============

export const assessPreCPRERisk = (answers: PreCPREAnswers): PreCPREResult => {
  const isHighRisk = isHighRiskPre(answers);

  if (isHighRisk) {
    return {
      riskLevel: 'high',
      treatment: [
        'Diclofenaco 100 mg via retal 10 minutos antes da CPRE',
        'Ringer Lactato 3 mL/kg durante a CPRE',
        'Ringer Lactato 20 mL/kg até 1 hora após a CPRE',
        'Ringer Lactato 3 mL/kg/h pelas próximas 8 horas após a CPRE'
      ],
      shouldProceedToPost: false, // Alto risco pré vai direto para resultado final
    };
  } else {
    return {
      riskLevel: 'low',
      treatment: [
        'Diclofenaco 100 mg via retal 10 minutos antes da CPRE'
      ],
      shouldProceedToPost: true, // Baixo risco pré avalia fatores pós
    };
  }
};

export const assessPostCPRERisk = (answers: PostCPREAnswers): PostCPREResult => {
  const isHighRisk = isHighRiskPost(answers);

  if (isHighRisk) {
    return {
      riskLevel: 'high',
      treatment: [
        'Manter Diclofenaco 100 mg via retal',
        'Associar Ringer Lactato 20 mL/kg até 1 hora após a CPRE',
        'Ringer Lactato 3 mL/kg/h durante as próximas 8 horas após a CPRE'
      ],
    };
  } else {
    return {
      riskLevel: 'none',
      treatment: [
        'Manter somente Diclofenaco 100 mg via retal'
      ],
    };
  }
};

// ============= DADOS DAS PERGUNTAS =============

export const preAssessmentQuestions: Question[] = [
  {
    id: 'isFemale',
    text: 'Sexo feminino?',
  },
  {
    id: 'isYoung',
    text: 'Paciente jovem?',
    footnoteRef: '¹',
  },
  {
    id: 'hasPEPHistory',
    text: 'PEP prévia?',
  },
  {
    id: 'hasPancreatitisHistory',
    text: 'Pancreatite aguda prévia?',
  },
  {
    id: 'hasNonDilatedDucts',
    text: 'Ductos não dilatados?',
    footnoteRef: '²',
  },
  {
    id: 'hasNormalBilirubin',
    text: 'Nível de bilirrubina normal?',
    footnoteRef: '³',
  },
];

export const postAssessmentQuestions: Question[] = [
  {
    id: 'hasDifficultCannulation',
    text: 'Canulação difícil?',
    footnoteRef: '*',
  },
  {
    id: 'hasContrastInjection',
    text: 'Injeção de contraste no ducto pancreático principal?',
  },
  {
    id: 'hasFistulotomy',
    text: 'Fistulotomia suprapapilar ou esfincterotomia transpancreática?',
  },
  {
    id: 'hasSphincterDysfunction',
    text: 'Disfunção do esfíncter de Oddi?',
    footnoteRef: '**',
  },
];

// ============= NOTAS DE RODAPÉ =============

export const footnotes = {
  '¹': 'Paciente com idade ≤ 30 anos',
  '²': 'Ducto hepato-colédoco ≤ 5 mm (♀) / ≤ 7 mm (♂)',
  '³': 'Bilirrubina total ≤ 1,2 mg/dL',
  '*': 'Canulação difícil: ≥ 5 min para canulação ou > 5 tentativas',
  '**': 'Papilite ou fibrose de papila vistos em colangiorressonância prévia',
};

// ============= HELPERS =============

export const getRiskLevelColor = (level: PreRiskLevel | PostRiskLevel): string => {
  switch (level) {
    case 'high':
      return colors.alert; 
    case 'low':
    case 'none':
      return colors.safe; 
  }
};

export const getRiskLevelText = (level: PreRiskLevel | PostRiskLevel): string => {
  switch (level) {
    case 'high':
      return 'Alto Risco';
    case 'low':
      return 'Baixo Risco';
    case 'none':
      return 'Sem Risco Adicional';
  }
};