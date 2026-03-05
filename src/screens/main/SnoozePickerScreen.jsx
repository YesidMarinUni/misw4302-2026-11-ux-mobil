import { View, Text, TouchableOpacity } from 'react-native';
import { useAlarm } from '../../AlarmContext';
import t from '../../theme';
import ChunkyButton from '../../components/ChunkyButton';

const SNOOZE_COLORS = [t.colors.accent, t.colors.teal, t.colors.purple];

export default function SnoozePickerScreen() {
  const { confirmSnooze, goBack, SNOOZE_OPTIONS } = useAlarm();

  return (
    <View style={{
      flex: 1,
      backgroundColor: t.colors.bg,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
    }}>
      <Text style={{
        fontFamily: t.fonts.display,
        fontSize: 24,
        fontWeight: '800',
        color: t.colors.text,
        marginBottom: 6,
      }}>
        Por cuanto tiempo ? 
      </Text>
      <Text style={{
        fontFamily: t.fonts.body,
        fontSize: 14,
        color: t.colors.textSecondary,
        marginBottom: 24,
      }}>
        Elige el tiempo de posposición
      </Text>

      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
        {SNOOZE_OPTIONS.map((mins, i) => (
          <TouchableOpacity
            key={mins}
            onPress={() => confirmSnooze(mins)}
            activeOpacity={0.75}
            style={{
              width: 80,
              height: 80,
              borderRadius: t.radii.md,
              backgroundColor: SNOOZE_COLORS[i],
              borderWidth: 3,
              borderColor: t.colors.text,
              shadowColor: t.colors.text,
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 1,
              shadowRadius: 0,
              elevation: 5,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ fontFamily: t.fonts.display, fontSize: 24, color: t.colors.white }}>{mins}</Text>
            <Text style={{ fontFamily: t.fonts.body, fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>min</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ChunkyButton variant="ghost" onPress={goBack}>Cancelar</ChunkyButton>
    </View>
  );
}
