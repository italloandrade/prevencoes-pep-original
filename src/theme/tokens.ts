export const colors = {
  // Paleta principal
  ink: '#0F1B2D',
  ink2: '#4A5870',
  muted: '#8896A6',
  bg: '#F4F1EA',
  surface: '#FFFFFF',
  line: '#ECF1FF',
  primary: '#2260FF',
  alert: '#FF0000',
  safe: '#008A19',
} as const;

export const typography = {
  // Plus Jakarta Sans para UI
  fontFamily: {
    ui: 'PlusJakartaSans_400Regular',
    uiBold: 'PlusJakartaSans_600SemiBold',
    uiExtraBold: 'PlusJakartaSans_800ExtraBold',
    mono: 'GeistMono_400Regular',
  },

  // Tamanhos
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 32,
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
  '5xl': 64,
} as const;

export const borderRadius = {
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  base: {
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

export const hitSlop = {
  base: 44, // Tamanho mínimo de toque conforme especificado
} as const;