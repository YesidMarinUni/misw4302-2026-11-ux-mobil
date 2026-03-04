import { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const t = theme;

export default function Field({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  placeholder = '',
}) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={t.colors.textMuted}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[styles.input, focused && styles.inputFocused]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: t.spacing.md,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    fontFamily: t.fonts.display,
    color: t.colors.text,
    marginBottom: 6,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: t.fonts.body,
    borderWidth: 3,
    borderColor: t.colors.text,
    borderRadius: t.radii.sm,
    backgroundColor: t.colors.surface,
    color: t.colors.text,
  },
  inputFocused: {
    borderColor: t.colors.accent,
  },
});
