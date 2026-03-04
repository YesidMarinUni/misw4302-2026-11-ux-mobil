import React from 'react';
import { Text, StyleSheet } from 'react-native';
import theme from '../theme';

const t = theme;

export default function SectionLabel({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontFamily: t.fonts.display,
    fontSize: 13,
    fontWeight: '700',
    color: t.colors.text,
    marginBottom: 6,
  },
});
