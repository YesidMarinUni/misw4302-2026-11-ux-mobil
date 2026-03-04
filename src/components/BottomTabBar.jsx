import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import theme from '../theme';

const t = theme;

const TABS = [
  { id: 'alarms', label: 'Alarmas', icon: '⏰', color: t.colors.accent },
  { id: 'sleep', label: 'Sueño', icon: '🌙', color: t.colors.purple },
  { id: 'morning', label: 'Mañana', icon: '☀️', color: t.colors.yellow },
  { id: 'tools', label: 'Herramientas', icon: '🛠️', color: t.colors.teal },
];

export default function BottomTabBar({ activeTab, onTabChange }) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const active = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            activeOpacity={0.7}
            onPress={() => onTabChange(tab.id)}
            style={styles.tab}
          >
            {active && (
              <View style={[styles.indicator, { backgroundColor: tab.color }]} />
            )}
            <Text style={styles.icon}>{tab.icon}</Text>
            <Text
              style={[
                styles.label,
                { color: active ? tab.color : t.colors.textMuted, fontWeight: active ? '800' : '600' },
              ]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 3,
    borderTopColor: t.colors.text,
    backgroundColor: t.colors.surface,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 28,
    position: 'relative',
  },
  indicator: {
    position: 'absolute',
    top: -3,
    left: '15%',
    right: '15%',
    height: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
  icon: {
    fontSize: 18,
    marginBottom: 2,
  },
  label: {
    fontFamily: t.fonts.display,
    fontSize: 10,
  },
});
