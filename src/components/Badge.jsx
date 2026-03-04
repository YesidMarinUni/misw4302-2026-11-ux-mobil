import { View, Text, StyleSheet } from 'react-native';
import theme from '../theme';

const t = theme;

export default function Badge({ children, color = t.colors.teal }) {
  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.label}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: t.radii.full,
    borderWidth: 2,
    borderColor: t.colors.text,
  },
  label: {
    fontFamily: t.fonts.body,
    fontSize: 11,
    fontWeight: '700',
    color: t.colors.white,
  },
});
