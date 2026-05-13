import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/tokens';
import { RootStackParamList } from '../logic/types';
import { PrimaryButton, Stepper, ResultCard } from '../components';
import { AlertTriangle, CheckCircle, Flag, Bell } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'PostResult'>;

const PostResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const { answers, result } = route.params;

  const handleNewAssessment = () => {
    navigation.popToTop();
  };

  // Retorna os dados do card de resumo de forma dinâmica (incluindo o ícone!)
  const getRiskMessage = () => {
    if (result.riskLevel === 'high') {
      return {
        title: 'Fatores de risco identificados',
        message: 'Foram identificados fatores de risco intraoperatórios que requerem tratamento adicional com hidratação.',
        color: colors.alert,
        Icon: AlertTriangle,
      };
    } else {
      return {
        title: 'Nenhum fator adicional',
        message: 'Não foram identificados fatores de risco adicionais durante o procedimento. Manter apenas o protocolo pré-CPRE.',
        color: colors.safe,
        Icon: CheckCircle,
      };
    }
  };

  const riskInfo = getRiskMessage();
  const RiskIcon = riskInfo.Icon;

  return (
    <View style={styles.container}>
      <Stepper
        currentStep={4}
        totalSteps={4}
        labels={['Pré-CPRE', 'Resultado Pré', 'Pós-CPRE', 'Resultado Final']}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ResultCard
          riskLevel={result.riskLevel}
          treatment={result.treatment}
          title="Protocolo Final de Tratamento"
        />

        {/* Card de Resumo Dinâmico */}
        <View style={[styles.summaryCard, { borderLeftColor: riskInfo.color }]}>
          <View style={styles.cardHeader}>
            <RiskIcon color={riskInfo.color} size={20} />
            <Text style={[styles.summaryTitle, { color: riskInfo.color }]}>
              {riskInfo.title}
            </Text>
          </View>
          <Text style={styles.summaryText}>{riskInfo.message}</Text>
        </View>

        {/* Card de Conclusão */}
        <View style={styles.completedCard}>
          <View style={styles.cardHeader}>
            <Flag color={colors.primary} size={20} />
            <Text style={styles.completedTitle}>Avaliação Completa</Text>
          </View>
          
          <Text style={styles.completedText}>
            A estratificação de risco foi finalizada. O protocolo de tratamento
            acima deve ser seguido rigorosamente conforme as diretrizes clínicas.
          </Text>

          {/* Box de Lembretes */}
          <View style={styles.reminderBox}>
            <View style={styles.reminderHeader}>
              <Bell color={colors.primary} size={16} />
              <Text style={styles.reminderTitle}>Lembretes Clínicos:</Text>
            </View>
            
            <View style={styles.reminderList}>
              <Text style={styles.reminderText}>
                • Monitorar sinais de pancreatite pós-CPRE nas primeiras 24h
              </Text>
              <Text style={styles.reminderText}>
                • Atentar para dor abdominal, náuseas, vômitos ou elevação de enzimas
              </Text>
              <Text style={styles.reminderText}>
                • Seguir protocolos institucionais de acompanhamento pós-procedimento
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton
          title="Finalizar e Nova Avaliação"
          onPress={handleNewAssessment}
          variant="primary"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface, // Fundo Branco
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  summaryCard: {
    backgroundColor: colors.bg, // Fundo creme/cinza para destacar no fundo branco
    borderRadius: borderRadius.md,
    padding: spacing.lg,
    marginTop: spacing.xl,
    borderLeftWidth: 4,
  },
  summaryTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiExtraBold,
  },
  summaryText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  completedCard: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.line,
  },
  completedTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.uiExtraBold,
    color: colors.ink,
  },
  completedText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    marginBottom: spacing.md,
  },
  reminderBox: {
    backgroundColor: '#ECF1FF', // Azul bem clarinho para dar foco ao lembrete
    borderRadius: borderRadius.base,
    padding: spacing.md,
    marginTop: spacing.xs,
  },
  reminderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
    gap: spacing.xs,
  },
  reminderTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary,
  },
  reminderList: {
    gap: spacing.xs,
  },
  reminderText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.sm * typography.lineHeight.relaxed,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing['2xl'],
  },
});

export default PostResultScreen;