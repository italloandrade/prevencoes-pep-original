import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, UIManager, LayoutAnimation } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/tokens';

// Habilita a animação nativa de layout para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

export const Stepper: React.FC<StepperProps> = ({
  currentStep,
  totalSteps,
  labels,
}) => {

  // Dispara uma animação suave sempre que o passo atual mudar
  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [currentStep]);

  return (
    <View 
      style={styles.container}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: totalSteps, now: currentStep }}
    >
      <View style={styles.progressContainer}>
        {Array.from({ length: totalSteps }, (_, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <React.Fragment key={index}>
              {/* Círculo do Passo */}
              <View
                style={[
                  styles.step,
                  isActive && styles.stepActive,
                  isCompleted && styles.stepCompleted,
                ]}
              >
                <Text
                  style={[
                    styles.stepText,
                    isActive && styles.stepTextActive,
                    isCompleted && styles.stepTextCompleted,
                  ]}
                >
                  {stepNumber}
                </Text>
              </View>

              {/* Linha Conectora (não renderiza no último passo) */}
              {index < totalSteps - 1 && (
                <View style={styles.connectorContainer}>
                  <View
                    style={[
                      styles.connector,
                      isCompleted && styles.connectorCompleted,
                    ]}
                  />
                </View>
              )}
            </React.Fragment>
          );
        })}
      </View>

      {/* Label do Passo */}
      {labels && (
        <View style={styles.labelContainer}>
          <Text style={styles.labelTitle}>
            {labels[currentStep - 1]}
          </Text>
          <Text style={styles.labelCount}>
            Passo {currentStep} de {totalSteps}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.base,
    width: '100%',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md, // Aumentei o espaçamento para a label respirar
  },
  step: {
    width: 34, // Levemente maior para melhor área de toque e visualização
    height: 34,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface, // Fundo branco
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.line,
  },
  stepActive: {
    backgroundColor: colors.primary, // Azul
    borderColor: colors.primary,
    ...shadows.sm, // Adiciona um brilho/sombra no passo atual
    transform: [{ scale: 1.1 }], // Dá um leve zoom no passo ativo
  },
  stepCompleted: {
    backgroundColor: colors.safe, // Verde
    borderColor: colors.safe,
  },
  connectorContainer: {
    width: 32, // Tamanho fixo do conector
    height: 2,
    backgroundColor: colors.line, // Fundo cinza base
    marginHorizontal: spacing.xs,
  },
  connector: {
    height: '100%',
    width: '0%', // Por padrão é 0
    backgroundColor: colors.line,
  },
  connectorCompleted: {
    width: '100%', // Preenche toda a barra quando completo
    backgroundColor: colors.safe, // Fica verde
  },
  stepText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.muted,
  },
  stepTextActive: {
    color: colors.surface, // Branco
  },
  stepTextCompleted: {
    color: colors.surface, // Branco
  },
  labelContainer: {
    alignItems: 'center',
  },
  labelTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary, // Título principal em azul
    marginBottom: 2,
  },
  labelCount: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.mono,
    color: colors.ink2,
  },
});