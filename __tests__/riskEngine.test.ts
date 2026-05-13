import {
  isHighRiskPre,
  isHighRiskPost,
  assessPreCPRERisk,
  assessPostCPRERisk,
} from '../src/logic/riskEngine';
import { PreCPREAnswers, PostCPREAnswers } from '../src/logic/types';

describe('riskEngine', () => {
  describe('isHighRiskPre', () => {
    it('deve retornar true quando qualquer resposta for true (ALTO RISCO)', () => {
      const testCases: PreCPREAnswers[] = [
        // Apenas sexo feminino
        {
          isFemale: true,
          isYoung: false,
          hasPEPHistory: false,
          hasPancreatitisHistory: false,
          hasNonDilatedDucts: false,
          hasNormalBilirubin: false,
        },
        // Apenas idade jovem
        {
          isFemale: false,
          isYoung: true,
          hasPEPHistory: false,
          hasPancreatitisHistory: false,
          hasNonDilatedDucts: false,
          hasNormalBilirubin: false,
        },
        // Múltiplos fatores true
        {
          isFemale: true,
          isYoung: true,
          hasPEPHistory: true,
          hasPancreatitisHistory: false,
          hasNonDilatedDucts: false,
          hasNormalBilirubin: false,
        },
        // Todos true
        {
          isFemale: true,
          isYoung: true,
          hasPEPHistory: true,
          hasPancreatitisHistory: true,
          hasNonDilatedDucts: true,
          hasNormalBilirubin: true,
        },
      ];

      testCases.forEach((answers, index) => {
        expect(isHighRiskPre(answers)).toBe(true);
      });
    });

    it('deve retornar false quando todas as respostas forem false (BAIXO RISCO)', () => {
      const answers: PreCPREAnswers = {
        isFemale: false,
        isYoung: false,
        hasPEPHistory: false,
        hasPancreatitisHistory: false,
        hasNonDilatedDucts: false,
        hasNormalBilirubin: false,
      };

      expect(isHighRiskPre(answers)).toBe(false);
    });
  });

  describe('isHighRiskPost', () => {
    it('deve retornar true quando qualquer resposta for true (ALTO RISCO)', () => {
      const testCases: PostCPREAnswers[] = [
        // Apenas canulação difícil
        {
          hasDifficultCannulation: true,
          hasContrastInjection: false,
          hasFistulotomy: false,
          hasSphincterDysfunction: false,
        },
        // Apenas injeção de contraste
        {
          hasDifficultCannulation: false,
          hasContrastInjection: true,
          hasFistulotomy: false,
          hasSphincterDysfunction: false,
        },
        // Múltiplos fatores
        {
          hasDifficultCannulation: true,
          hasContrastInjection: true,
          hasFistulotomy: false,
          hasSphincterDysfunction: false,
        },
        // Todos true
        {
          hasDifficultCannulation: true,
          hasContrastInjection: true,
          hasFistulotomy: true,
          hasSphincterDysfunction: true,
        },
      ];

      testCases.forEach((answers) => {
        expect(isHighRiskPost(answers)).toBe(true);
      });
    });

    it('deve retornar false quando todas as respostas forem false (BAIXO RISCO)', () => {
      const answers: PostCPREAnswers = {
        hasDifficultCannulation: false,
        hasContrastInjection: false,
        hasFistulotomy: false,
        hasSphincterDysfunction: false,
      };

      expect(isHighRiskPost(answers)).toBe(false);
    });
  });

  describe('assessPreCPRERisk', () => {
    it('deve retornar alto risco com tratamento completo quando algum fator estiver presente', () => {
      const answers: PreCPREAnswers = {
        isFemale: true, // Fator de risco presente
        isYoung: false,
        hasPEPHistory: false,
        hasPancreatitisHistory: false,
        hasNonDilatedDucts: false,
        hasNormalBilirubin: false,
      };

      const result = assessPreCPRERisk(answers);

      expect(result.riskLevel).toBe('high');
      expect(result.shouldProceedToPost).toBe(false);
      expect(result.treatment).toHaveLength(4);
      expect(result.treatment[0]).toContain('Diclofenaco 100 mg');
      expect(result.treatment[1]).toContain('Ringer Lactato 3 mL/kg durante');
      expect(result.treatment[2]).toContain('Ringer Lactato 20 mL/kg até 1 hora');
      expect(result.treatment[3]).toContain('Ringer Lactato 3 mL/kg/h pelas próximas 8 horas');
    });

    it('deve retornar baixo risco com apenas diclofenaco quando nenhum fator estiver presente', () => {
      const answers: PreCPREAnswers = {
        isFemale: false,
        isYoung: false,
        hasPEPHistory: false,
        hasPancreatitisHistory: false,
        hasNonDilatedDucts: false,
        hasNormalBilirubin: false,
      };

      const result = assessPreCPRERisk(answers);

      expect(result.riskLevel).toBe('low');
      expect(result.shouldProceedToPost).toBe(true);
      expect(result.treatment).toHaveLength(1);
      expect(result.treatment[0]).toContain('Diclofenaco 100 mg');
    });
  });

  describe('assessPostCPRERisk', () => {
    it('deve retornar alto risco com hidratação adicional quando algum fator estiver presente', () => {
      const answers: PostCPREAnswers = {
        hasDifficultCannulation: true, // Fator presente
        hasContrastInjection: false,
        hasFistulotomy: false,
        hasSphincterDysfunction: false,
      };

      const result = assessPostCPRERisk(answers);

      expect(result.riskLevel).toBe('high');
      expect(result.treatment).toHaveLength(3);
      expect(result.treatment[0]).toContain('Manter Diclofenaco');
      expect(result.treatment[1]).toContain('Associar Ringer Lactato 20 mL/kg');
      expect(result.treatment[2]).toContain('Ringer Lactato 3 mL/kg/h durante');
    });

    it('deve retornar sem risco adicional mantendo apenas diclofenaco quando nenhum fator estiver presente', () => {
      const answers: PostCPREAnswers = {
        hasDifficultCannulation: false,
        hasContrastInjection: false,
        hasFistulotomy: false,
        hasSphincterDysfunction: false,
      };

      const result = assessPostCPRERisk(answers);

      expect(result.riskLevel).toBe('none');
      expect(result.treatment).toHaveLength(1);
      expect(result.treatment[0]).toContain('Manter somente Diclofenaco');
    });
  });

  describe('Cenários combinados do fluxograma', () => {
    it('cenário: baixo risco pré + alto risco pós', () => {
      // Pré-CPRE: sem fatores de risco
      const preAnswers: PreCPREAnswers = {
        isFemale: false,
        isYoung: false,
        hasPEPHistory: false,
        hasPancreatitisHistory: false,
        hasNonDilatedDucts: false,
        hasNormalBilirubin: false,
      };

      const preResult = assessPreCPRERisk(preAnswers);
      expect(preResult.riskLevel).toBe('low');
      expect(preResult.shouldProceedToPost).toBe(true);

      // Pós-CPRE: com canulação difícil
      const postAnswers: PostCPREAnswers = {
        hasDifficultCannulation: true,
        hasContrastInjection: false,
        hasFistulotomy: false,
        hasSphincterDysfunction: false,
      };

      const postResult = assessPostCPRERisk(postAnswers);
      expect(postResult.riskLevel).toBe('high');

      // Tratamento final = Diclofenaco + hidratação adicional
      const finalTreatment = [...preResult.treatment, ...postResult.treatment];
      expect(finalTreatment.some(t => t.includes('Diclofenaco'))).toBe(true);
      expect(finalTreatment.some(t => t.includes('Associar Ringer'))).toBe(true);
    });

    it('cenário: alto risco pré (não precisa avaliar pós)', () => {
      const preAnswers: PreCPREAnswers = {
        isFemale: true, // Fator de risco presente
        isYoung: true,  // Múltiplos fatores
        hasPEPHistory: false,
        hasPancreatitisHistory: false,
        hasNonDilatedDucts: false,
        hasNormalBilirubin: false,
      };

      const preResult = assessPreCPRERisk(preAnswers);
      expect(preResult.riskLevel).toBe('high');
      expect(preResult.shouldProceedToPost).toBe(false); // Não avalia pós
      expect(preResult.treatment).toHaveLength(4); // Protocolo completo
    });
  });
});