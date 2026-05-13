import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/tokens';
import { getRiskLevelColor, getRiskLevelText } from '../logic/riskEngine';
import { PreRiskLevel, PostRiskLevel } from '../logic/types';
import { Activity, CheckCircle2 } from 'lucide-react-native';

interface ResultCardProps {
  riskLevel: PreRiskLevel | PostRiskLevel;
  treatment: string[];
  title?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  riskLevel,
  treatment,
  title = 'Resultado da Avaliação',
}) => {
  const riskColor = getRiskLevelColor(riskLevel);
  const riskText = getRiskLevelText(riskLevel);

  return (
    <View style={styles.container}>
      {/* Título com Ícone */}
      <View style={styles.header}>
        <Activity color={colors.primary} size={20} />
        <Text style={styles.title}>{title}</Text>
      </View>

      {/* Badge de Risco com Glow (Sombra Colorida) */}
      <View 
        style={[
          styles.riskBadge, 
          { 
            backgroundColor: riskColor,
            shadowColor: riskColor, // A sombra usa a cor do risco
          }
        ]}
      >
        <Text style={styles.riskText}>{riskText.toUpperCase()}</Text>
      </View>

      <View style={styles.divider} />

      {/* Caixa de Conduta (Estilo Prescrição) */}
      <View style={styles.treatmentBox}>
        <Text style={styles.treatmentTitle}>Conduta Recomendada</Text>

        <View style={styles.treatmentList}>
          {treatment.map((item, index) => (
            <View key={index} style={styles.treatmentItem}>
              {/* Substituí a bolinha simples por um ícone de Check elegante */}
              <CheckCircle2 color={colors.primary} size={18} style={styles.bulletIcon} />
              <Text style={styles.treatmentText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface, // Branco
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    ...shadows.lg, // Sombra um pouco maior para destacar o card principal
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.base,
    gap: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.uiExtraBold,
    color: colors.ink,
  },
  riskBadge: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full, // Deixa bem arredondado (estilo pílula)
    alignSelf: 'center',
    marginBottom: spacing.lg,
    // Efeito de Glow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  riskText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiExtraBold,
    color: colors.surface, // Texto branco
    textAlign: 'center',
    letterSpacing: 0.5, // Leve espaçamento nas letras para ficar mais imponente
  },
  divider: {
    height: 1,
    backgroundColor: colors.line,
    marginBottom: spacing.lg,
  },
  treatmentBox: {
    backgroundColor: colors.bg, // Fundo levemente creme/cinza
    borderRadius: borderRadius.md,
    padding: spacing.base,
    borderWidth: 1,
    borderColor: colors.line,
  },
  treatmentTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary, // Azul para guiar o olhar
    marginBottom: spacing.md,
  },
  treatmentList: {
    gap: spacing.md, // Espaçamento maior entre os itens de tratamento
  },
  treatmentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bulletIcon: {
    marginTop: 2, // Alinha o ícone perfeitamente com a primeira linha do texto
    marginRight: spacing.sm,
  },
  treatmentText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
});