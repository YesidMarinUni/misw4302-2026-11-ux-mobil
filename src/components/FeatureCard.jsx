import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Toggle from './Toggle';
import theme from '../theme';

const t = theme;

export default function FeatureCard({ icon, title, subtitle, color, onPress, enabled, onToggle }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.shadow} />
      <TouchableOpacity
        activeOpacity={0.75}
        onPress={onPress}
        style={styles.card}
      >
        <View style={[styles.iconBox, { backgroundColor: color || t.colors.accent }]}>
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.textBlock}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        {onToggle !== undefined ? (
          <Toggle enabled={enabled} onToggle={onToggle} size="small" />
        ) : (
          <Text style={styles.chevron}>›</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 4,
    marginRight: 4,
  },
  shadow: {
    position: 'absolute',
    top: 4,
    left: 4,
    right: -4,
    bottom: -4,
    borderRadius: t.radii.md,
    backgroundColor: t.colors.text,
  },
  card: {
    backgroundColor: t.colors.surface,
    borderRadius: t.radii.md,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 3,
    borderColor: t.colors.text,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: t.colors.text,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  icon: {
    fontSize: 22,
  },
  textBlock: {
    flex: 1,
  },
  title: {
    fontFamily: t.fonts.display,
    fontSize: 15,
    fontWeight: '700',
    color: t.colors.text,
  },
  subtitle: {
    fontFamily: t.fonts.body,
    fontSize: 12,
    fontWeight: '500',
    color: t.colors.textSecondary,
    marginTop: 1,
  },
  chevron: {
    fontFamily: t.fonts.display,
    fontSize: 16,
    color: t.colors.textMuted,
  },
});
