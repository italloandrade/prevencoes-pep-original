import React, { useRef } from 'react';
import { Text, StyleSheet, ActivityIndicator, Animated, Pressable, StyleProp, ViewStyle } from 'react-native';
import { colors, typography, spacing, borderRadius, shadows } from '../theme/tokens';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: 'primary' | 'safe' | 'alert';
  style?: StyleProp<ViewStyle>;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  variant = 'primary',
  style,
}) => {
  // Controle da animação de escala (zoom)
  const scale = useRef(new Animated.Value(1)).current;

  const animatePressIn = () => {
    if (disabled || loading) return;
    Animated.spring(scale, {
      toValue: 0.95, // Encolhe levemente para 95%
      useNativeDriver: true,
      speed: 20,
    }).start();
  };

  const animatePressOut = () => {
    if (disabled || loading) return;
    Animated.spring(scale, {
      toValue: 1, // Volta ao tamanho original
      useNativeDriver: true,
      friction: 4,
      tension: 50,
    }).start();
  };

  const getBackgroundColor = () => {
    if (disabled) return colors.muted; // Cor cinza quando inativo
    switch (variant) {
      case 'safe':
        return colors.safe;
      case 'alert':
        return colors.alert;
      default:
        return colors.primary;
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        style={[
          styles.button,
          { backgroundColor: getBackgroundColor() },
          style,
          disabled && styles.buttonDisabled, // Aplica estilo extra se desativado
        ]}
        onPressIn={animatePressIn}
        onPressOut={animatePressOut}
        onPress={onPress}
        disabled={disabled || loading}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityState={{ disabled: disabled || loading }}
      >
        {loading ? (
          <ActivityIndicator color={colors.surface} size="small" />
        ) : (
          <Text style={styles.text}>{title}</Text>
        )}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: spacing.base,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52, // Aumentei levemente a altura para ficar mais ergonômico
    ...shadows.base, // Sombra padrão
  },
  buttonDisabled: {
    ...shadows.sm,
    shadowOpacity: 0, // Remove a sombra
    elevation: 0, // Remove elevação no Android
    opacity: 0.7, // Deixa levemente transparente
  },
  text: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.surface,
    lineHeight: typography.fontSize.base * typography.lineHeight.tight,
  },
});