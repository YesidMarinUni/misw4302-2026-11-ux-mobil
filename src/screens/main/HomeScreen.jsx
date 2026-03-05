import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAlarm } from '../../AlarmContext';
import t from '../../theme';
import Badge from '../../components/Badge';
import Toggle from '../../components/Toggle';
import ChunkyButton from '../../components/ChunkyButton';

export default function HomeScreen() {
  const { alarms, toggleAlarm, editAlarm, createNewAlarm } = useAlarm();

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <ScrollView
        contentContainerStyle={{ padding: t.spacing.lg, paddingBottom: 16 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: 24 }}>
          <View style={{
            position: 'absolute', top: -8, right: 0,
            width: 50, height: 50, borderRadius: 25,
            backgroundColor: t.colors.yellow, borderWidth: 3,
            borderColor: t.colors.text, opacity: 0.7,
          }} />
          <View style={{
            position: 'absolute', top: 15, right: 35,
            width: 30, height: 30, borderRadius: 6,
            backgroundColor: t.colors.teal, borderWidth: 3,
            borderColor: t.colors.text, opacity: 0.5,
            transform: [{ rotate: '15deg' }],
          }} />
          <Text style={{ fontFamily: t.fonts.display, fontSize: 28, color: t.colors.text, marginBottom: 2 }}>
            Alarmas
          </Text>
          <Text style={{ fontFamily: t.fonts.body, fontSize: 14, color: t.colors.textSecondary }}>
            Despierta en tus términos
          </Text>
        </View>
        <View style={{ gap: 12, marginBottom: 20 }}>
          {alarms.map((alarm) => (
            <TouchableOpacity
              key={alarm.id}
              onPress={() => editAlarm(alarm)}
              activeOpacity={0.85}
              style={{
                backgroundColor: t.colors.surface,
                borderRadius: t.radii.md,
                padding: 16,
                paddingHorizontal: 18,
                borderWidth: 3,
                borderColor: t.colors.text,
                borderLeftWidth: 6,
                borderLeftColor: alarm.color || t.colors.accent,
                opacity: alarm.enabled ? 1 : 0.5,
                shadowColor: alarm.enabled ? t.colors.text : 'transparent',
                shadowOffset: { width: 5, height: 5 },
                shadowOpacity: alarm.enabled ? 1 : 0,
                shadowRadius: 0,
                elevation: alarm.enabled ? 5 : 0,
              }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <Text style={{ fontFamily: t.fonts.display, fontSize: 26, color: t.colors.text, lineHeight: 30 }}>
                      {alarm.time}
                    </Text>
                    {alarm.progressive && (
                      <View style={{ backgroundColor: '#F0EEFF', paddingHorizontal: 7, paddingVertical: 2, borderRadius: t.radii.full, borderWidth: 1.5, borderColor: t.colors.purple }}>
                        <Text style={{ fontFamily: t.fonts.display, fontSize: 10, color: t.colors.purple }}>GRADUAL</Text>
                      </View>
                    )}
                    {alarm.priority === 'high' && (
                      <View style={{ backgroundColor: '#FFE5E2', paddingHorizontal: 7, paddingVertical: 2, borderRadius: t.radii.full, borderWidth: 1.5, borderColor: t.colors.accent }}>
                        <Text style={{ fontFamily: t.fonts.display, fontSize: 10, color: t.colors.accent }}>ALTA</Text>
                      </View>
                    )}
                    {alarm.priority === 'critical' && (
                      <View style={{ backgroundColor: t.colors.accentDark, paddingHorizontal: 7, paddingVertical: 2, borderRadius: t.radii.full, borderWidth: 1.5, borderColor: t.colors.accentDark }}>
                        <Text style={{ fontFamily: t.fonts.display, fontSize: 10, color: '#fff' }}>CRÍTICA</Text>
                      </View>
                    )}
                  </View>

                  <Text style={{ fontFamily: t.fonts.body, fontSize: 14, color: t.colors.textSecondary }}>
                    {alarm.label || 'Alarma sin título'}
                  </Text>

                  <View style={{ flexDirection: 'row', gap: 4, marginTop: 6, flexWrap: 'wrap' }}>
                    {alarm.days.map(d => (
                      <Badge key={d} color={['Sat', 'Sun'].includes(d) ? t.colors.purple : t.colors.teal}>
                        {d}
                      </Badge>
                    ))}
                    {alarm.action && (
                      <Badge color={t.colors.yellow}>
                        {alarm.action.type === 'call' ? '📞' : alarm.action.type === 'task' ? '📋' : '📱'} Acción
                      </Badge>
                    )}
                  </View>
                </View>

                <Toggle enabled={alarm.enabled} onToggle={() => toggleAlarm(alarm.id)} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <ChunkyButton onPress={createNewAlarm} color={t.colors.accent}>
          + Crear Alarma
        </ChunkyButton>
        <View style={{ height: 16 }} />
      </ScrollView>
    </View>
  );
}
