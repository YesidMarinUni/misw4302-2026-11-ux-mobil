import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../theme';

const t = theme;

export default function ScreenHeader({ title, subtitle, onBack }) {
  return (
    <View>
      <View style={styles.container}>
        {onBack && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onBack}
            style={styles.backBtn}
          >
            <Text style={styles.backLabel}>← Atrás</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: t.spacing.lg,
    marginBottom: 16,
  },
  backBtn: {
    alignSelf: 'flex-start',
    backgroundColor: t.colors.surfaceAlt,
    borderWidth: 2,
    borderColor: t.colors.text,
    borderRadius: t.radii.sm,
    paddingVertical: 6,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  backLabel: {
    fontFamily: t.fonts.display,
    fontSize: 13,
    fontWeight: '600',
    color: t.colors.text,
  },
  title: {
    fontFamily: t.fonts.display,
    fontSize: 24,
    fontWeight: '800',
    color: t.colors.text,
    marginBottom: 2,
  },
  subtitle: {
    fontFamily: t.fonts.body,
    fontSize: 13,
    fontWeight: '500',
    color: t.colors.textSecondary,
  },
});
