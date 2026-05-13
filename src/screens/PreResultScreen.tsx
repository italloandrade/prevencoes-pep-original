import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, typography, spacing, borderRadius } from '../theme/tokens';
import { RootStackParamList } from '../logic/types';
import { PrimaryButton, Stepper, ResultCard } from '../components';
import { ArrowRightCircle, Flag } from 'lucide-react-native';

type Props = NativeStackScreenProps<RootStackParamList, 'PreResult'>;

const PreResultScreen: React.FC<Props> = ({ navigation, route }) => {
  const { answers, result } = route.params;

  const handleNext = () => {
    if (result.shouldProceedToPost) {
      // Baixo risco pré -> avalia fatores pós-CPRE
      navigation.navigate('PostAssessment');
    } else {
      // Alto risco pré -> resultado final (não precisa avaliar pós)
      navigation.popToTop();
    }
  };

  const handleNewAssessment = () => {
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      {/* <Stepper
        currentStep={2}
        totalSteps={result.shouldProceedToPost ? 4 : 2}
        labels={
          result.shouldProceedToPost
            ? ['Pré-CPRE', 'Resultado Pré', 'Pós-CPRE', 'Resultado Final']
            : ['Pré-CPRE', 'Resultado Final']
        }
      /> */}

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <ResultCard
          riskLevel={result.riskLevel}
          treatment={result.treatment}
          title="Indicação"
        />


      </ScrollView>

      <View style={styles.footer}>
        {result.shouldProceedToPost ? (
          <PrimaryButton
            title="Ir para Avaliação Pós-CPRE"
            onPress={handleNext}
            variant="primary"
          />
        ) : (
          <View style={styles.finalButtons}>
            <PrimaryButton
              title="Nova Avaliação"
              onPress={handleNewAssessment}
              variant="primary"
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface, // Fundo branco padrão
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
    gap: spacing.xs,
  },
  nextStepCard: {
    backgroundColor: '#ECF1FF', // Fundo azul claro para guiar a ação
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  nextStepTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.uiExtraBold,
    color: colors.primary,
  },
  nextStepText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  finalCard: {
    backgroundColor: colors.bg, // Fundo cinza claro para diferenciar
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
    borderLeftWidth: 4,
    borderLeftColor: colors.safe, // Verde indicando conclusão
  },
  finalTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.uiExtraBold,
    color: colors.safe,
  },
  finalText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing['2xl'],
  },
  finalButtons: {
    gap: spacing.md,
  },
});

export default PreResultScreen;