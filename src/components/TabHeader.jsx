import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

const t = theme;

const SHAPE_BORDER_RADIUS = {
  circle: 999,
  square: 10,
  blob: 999,
};

export default function TabHeader({ title, subtitle, decoColor, decoShape = 'circle' }) {
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.deco,
          {
            backgroundColor: decoColor,
            borderRadius: SHAPE_BORDER_RADIUS[decoShape] ?? 999,
            transform: decoShape === 'square'
              ? [{ rotate: '12deg' }]
              : decoShape === 'blob'
              ? [{ rotate: '-8deg' }]
              : [],
          },
        ]}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: 'relative',
  },
  deco: {
    position: 'absolute',
    top: -4,
    right: 0,
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: t.colors.text,
    opacity: 0.6,
  },
  title: {
    fontFamily: t.fonts.display,
    fontSize: 28,
    fontWeight: '800',
    color: t.colors.text,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: t.fonts.body,
    fontSize: 14,
    fontWeight: '500',
    color: t.colors.textSecondary,
  },
});
