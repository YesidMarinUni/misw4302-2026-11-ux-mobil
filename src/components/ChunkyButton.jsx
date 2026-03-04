import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import theme from '../theme';

const t = theme;

const variantStyles = {
  primary: {
    backgroundColor: t.colors.accent,
    borderWidth: 3,
    borderColor: t.colors.text,
  },
  secondary: {
    backgroundColor: t.colors.surface,
    borderWidth: 3,
    borderColor: t.colors.text,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  danger: {
    backgroundColor: '#FFE5E2',
    borderWidth: 3,
    borderColor: t.colors.accentDark,
  },
};

const variantTextStyles = {
  primary: { color: t.colors.white, fontWeight: '700' },
  secondary: { color: t.colors.text, fontWeight: '600' },
  ghost: { color: t.colors.textSecondary, fontWeight: '600' },
  danger: { color: t.colors.accentDark, fontWeight: '700' },
};

const variantShadowColor = {
  primary: t.colors.text,
  secondary: t.colors.text,
  ghost: 'transparent',
  danger: t.colors.accentDark,
};

export default function ChunkyButton({
  children,
  onPress,
  variant = 'primary',
  color,
  disabled = false,
  style: extraStyle = {},
}) {
  const vStyle = variantStyles[variant] ?? variantStyles.primary;
  const tStyle = variantTextStyles[variant] ?? variantTextStyles.primary;
  const shadowColor = variantShadowColor[variant] ?? t.colors.text;

  return (
    <View style={[styles.wrapper, extraStyle]}>
      {variant !== 'ghost' && (
        <View
          style={[
            styles.shadowLayer,
            { backgroundColor: color ? t.colors.text : shadowColor },
          ]}
        />
      )}
      <TouchableOpacity
        onPress={disabled ? undefined : onPress}
        activeOpacity={disabled ? 1 : 0.85}
        style={[
          styles.button,
          vStyle,
          color ? { backgroundColor: color } : null,
          disabled ? styles.disabled : null,
        ]}
      >
        <Text style={[styles.label, tStyle]}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: 4,
    marginRight: 4,
  },
  shadowLayer: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    borderRadius: t.radii.sm,
  },
  button: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: t.radii.sm,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 15,
    fontFamily: t.fonts.display,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.5,
  },
});

