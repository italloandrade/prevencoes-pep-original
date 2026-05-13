import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../theme/tokens';
import { footnotes } from '../logic/riskEngine';
import { Info } from 'lucide-react-native';

interface FootnoteCardProps {
  references: string[];
}

export const FootnoteCard: React.FC<FootnoteCardProps> = ({ references }) => {
  if (references.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Cabeçalho com Ícone */}
      <View style={styles.header}>
        <Info size={16} color={colors.primary} />
        <Text style={styles.title}>Notas de Referência</Text>
      </View>
      
      {/* Lista de Notas */}
      <View style={styles.notesContainer}>
        {references.map((ref, index) => {
          const note = footnotes[ref as keyof typeof footnotes];
          const isLast = index === references.length - 1; // Verifica se é o último item
          
          return (
            <Text key={ref} style={[styles.note, isLast && styles.lastNote]}>
              <Text style={styles.reference}>{ref}</Text> {note}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg, // Fundo leve e neutro
    borderRadius: borderRadius.md,
    padding: spacing.base,
    marginTop: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary, // Mantém a borda azul clássica de "Citação"
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.uiBold,
    color: colors.primary, // Azul para combinar com o ícone
    marginLeft: spacing.xs,
  },
  notesContainer: {
    paddingLeft: spacing.xs, // Dá um leve respiro em relação à borda esquerda
  },
  note: {
    fontSize: typography.fontSize.xs, // Tamanho XS para não roubar a atenção
    fontFamily: typography.fontFamily.ui,
    color: colors.ink2,
    lineHeight: typography.fontSize.xs * typography.lineHeight.relaxed,
    marginBottom: spacing.sm,
  },
  lastNote: {
    marginBottom: 0, // Tira o espaçamento extra do último item
  },
  reference: {
    fontFamily: typography.fontFamily.uiExtraBold,
    color: colors.primary, // Destaca a letra/número da referência em azul
  },
});