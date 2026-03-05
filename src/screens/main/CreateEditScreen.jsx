import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useAlarm, RINGTONES } from '../../AlarmContext';
import t from '../../theme';
import Toggle from '../../components/Toggle';
import SectionLabel from '../../components/SectionLabel';
import ChunkyButton from '../../components/ChunkyButton';

export default function CreateEditScreen() {
  const {
    editingAlarm, updateEditingAlarm, saveAlarm,
    openPurposeEditor, goHome, deleteAlarm, simulateAlarm,
    PROGRESSIVE_OPTIONS,
  } = useAlarm();

  const [showRingtonePicker, setShowRingtonePicker] = useState(false);

  if (!editingAlarm) return null;

  const allDays = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa', 'Do'];

  const toggleDay = (day) => {
    const days = editingAlarm.days.includes(day)
      ? editingAlarm.days.filter(d => d !== day)
      : [...editingAlarm.days, day];
    updateEditingAlarm({ days });
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <ScrollView
        contentContainerStyle={{ padding: t.spacing.sm, paddingHorizontal: t.spacing.lg, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <TouchableOpacity
            onPress={goHome}
            activeOpacity={0.7}
            style={{
              backgroundColor: t.colors.surfaceAlt,
              borderWidth: 2, borderColor: t.colors.text,
              paddingHorizontal: 14, paddingVertical: 6,
              borderRadius: t.radii.sm,
            }}
          >
            <Text style={{ fontFamily: t.fonts.display, fontSize: 13, color: t.colors.text }}>← Atrás</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={saveAlarm}
            activeOpacity={0.8}
            style={{
              backgroundColor: t.colors.teal,
              borderWidth: 2, borderColor: t.colors.text,
              paddingHorizontal: 18, paddingVertical: 6,
              borderRadius: t.radii.sm,
              shadowColor: t.colors.text,
              shadowOffset: { width: 3, height: 3 },
              shadowOpacity: 1, shadowRadius: 0, elevation: 3,
            }}
          >
            <Text style={{ fontFamily: t.fonts.display, fontSize: 13, color: t.colors.white }}>Guardar ✓</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          backgroundColor: t.colors.yellow,
          borderRadius: t.radii.lg,
          padding: 24,
          alignItems: 'center',
          marginBottom: 16,
          borderWidth: 3, borderColor: t.colors.text,
          shadowColor: t.colors.text,
          shadowOffset: { width: 6, height: 6 },
          shadowOpacity: 1, shadowRadius: 0, elevation: 6,
        }}>
          <TextInput
            value={editingAlarm.time}
            onChangeText={(v) => updateEditingAlarm({ time: v })}
            placeholder="07:00"
            placeholderTextColor={t.colors.textMuted}
            style={{
              fontFamily: t.fonts.display,
              fontSize: 44,
              color: t.colors.text,
              fontWeight: '800',
              textAlign: 'center',
              width: '100%',
            }}
          />
        </View>

        <View style={{ marginBottom: 14 }}>
          <SectionLabel>Etiqueta</SectionLabel>
          <TextInput
            value={editingAlarm.label}
            onChangeText={(v) => updateEditingAlarm({ label: v })}
            placeholder="¿Para qué es?"
            placeholderTextColor={t.colors.textMuted}
            style={{
              width: '100%', paddingHorizontal: 16, paddingVertical: 12,
              borderRadius: t.radii.sm, borderWidth: 3, borderColor: t.colors.text,
              backgroundColor: t.colors.surface, fontFamily: t.fonts.body,
              fontSize: 15, color: t.colors.text,
            }}
          />
        </View>

        <View style={{ marginBottom: 16 }}>
          <SectionLabel>Días</SectionLabel>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            {allDays.map(day => {
              const active = editingAlarm.days.includes(day);
              const isWeekend = ['Sa', 'Do'].includes(day);
              return (
                <TouchableOpacity
                  key={day}
                  onPress={() => toggleDay(day)}
                  activeOpacity={0.7}
                  style={{
                    flex: 1, height: 42,
                    borderRadius: t.radii.sm,
                    borderWidth: 2, borderColor: t.colors.text,
                    backgroundColor: active ? (isWeekend ? t.colors.purple : t.colors.teal) : t.colors.surface,
                    alignItems: 'center', justifyContent: 'center',
                    shadowColor: active ? t.colors.text : 'transparent',
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: active ? 1 : 0,
                    shadowRadius: 0, elevation: active ? 2 : 0,
                  }}
                >
                  <Text style={{
                    fontFamily: t.fonts.display, fontSize: 11,
                    color: active ? t.colors.white : t.colors.textMuted,
                  }}>
                    {day.substring(0, 2)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

         <View style={{ marginBottom: 14 }}>
          <SectionLabel>Frase motivadora</SectionLabel>
          <TouchableOpacity
            onPress={openPurposeEditor}
            activeOpacity={0.7}
            style={{
              paddingHorizontal: 16, paddingVertical: 12,
              borderRadius: t.radii.sm, borderWidth: 3,
              borderColor: t.colors.accent,
              borderStyle: 'dashed',
              backgroundColor: '#FFF5F3',
            }}
          >
            <Text style={{
              fontFamily: t.fonts.body, fontSize: 14,
              color: editingAlarm.purpose ? t.colors.text : t.colors.textMuted,
              lineHeight: 20,
            }}>
              {editingAlarm.purpose || '¡Toca para establecer tu frase motivadora!'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginBottom: 16 }}>
          <SectionLabel>Ringtone</SectionLabel>
          <TouchableOpacity
            onPress={() => setShowRingtonePicker(!showRingtonePicker)}
            activeOpacity={0.8}
            style={{
              paddingHorizontal: 16, paddingVertical: 12,
              borderRadius: t.radii.sm, borderWidth: 3, borderColor: t.colors.text,
              backgroundColor: t.colors.surface,
              flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
              <View style={{
                width: 32, height: 32, borderRadius: 10,
                backgroundColor: t.colors.accent, borderWidth: 2, borderColor: t.colors.text,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text>🔔</Text>
              </View>
              <Text style={{ fontFamily: t.fonts.body, fontSize: 15, color: t.colors.text }}>
                {editingAlarm.ringtone || 'Campana del amanecer'}
              </Text>
            </View>
            <Text style={{ fontFamily: t.fonts.display, fontSize: 14, color: t.colors.textMuted }}>
              {showRingtonePicker ? '▴' : '▾'}
            </Text>
          </TouchableOpacity>

          {showRingtonePicker && (
            <View style={{
              marginTop: 6, borderRadius: t.radii.sm,
              borderWidth: 2, borderColor: t.colors.border,
              backgroundColor: t.colors.surface, overflow: 'hidden',
            }}>
              {RINGTONES.map((tone, i) => {
                const selected = (editingAlarm.ringtone || 'Campana del amanecer') === tone;
                const dotColors = [t.colors.accent, t.colors.teal, t.colors.purple, t.colors.yellow, t.colors.accentLight, t.colors.tealDark, t.colors.purple];
                return (
                  <TouchableOpacity
                    key={tone}
                    onPress={() => { updateEditingAlarm({ ringtone: tone }); setShowRingtonePicker(false); }}
                    activeOpacity={0.7}
                    style={{
                      paddingHorizontal: 14, paddingVertical: 11,
                      flexDirection: 'row', alignItems: 'center', gap: 10,
                      backgroundColor: selected ? t.colors.surfaceAlt : 'transparent',
                      borderBottomWidth: i < RINGTONES.length - 1 ? 1 : 0,
                      borderBottomColor: t.colors.border,
                    }}
                  >
                    <View style={{
                      width: 8, height: 8, borderRadius: 4,
                      backgroundColor: dotColors[i % dotColors.length],
                      borderWidth: selected ? 2 : 2, borderColor: selected ? t.colors.text : t.colors.border,
                    }} />
                    <Text style={{ fontFamily: t.fonts.body, fontSize: 14, color: selected ? t.colors.text : t.colors.textSecondary }}>
                      {tone}
                    </Text>
                    {selected && <Text style={{ marginLeft: 'auto', fontFamily: t.fonts.display, fontSize: 12, color: t.colors.teal }}>✓</Text>}
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>

        <View style={{
          marginBottom: 16, backgroundColor: t.colors.surface,
          borderRadius: t.radii.md, padding: 16,
          borderWidth: 3,
          borderColor: editingAlarm.progressive ? t.colors.purple : t.colors.border,
          shadowColor: editingAlarm.progressive ? t.colors.text : 'transparent',
          shadowOffset: { width: 3, height: 3 },
          shadowOpacity: editingAlarm.progressive ? 1 : 0,
          shadowRadius: 0, elevation: editingAlarm.progressive ? 3 : 0,
        }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontFamily: t.fonts.display, fontSize: 14, color: t.colors.text }}>Alarma Progresiva</Text>
              <Text style={{ fontFamily: t.fonts.body, fontSize: 12, color: t.colors.textSecondary, marginTop: 2 }}>El sonido se reproduce progresivamente</Text>
            </View>
            <Toggle enabled={editingAlarm.progressive} onToggle={() => updateEditingAlarm({ progressive: !editingAlarm.progressive })} size="small" />
          </View>

          {editingAlarm.progressive && (
            <View style={{ marginTop: 14, paddingTop: 14, borderTopWidth: 2, borderTopColor: t.colors.border, borderStyle: 'dashed' }}>
              <Text style={{ fontFamily: t.fonts.display, fontSize: 12, color: t.colors.textSecondary, marginBottom: 8 }}>Iniciar aumento de sonido antes de la alarma</Text>
              <View style={{ flexDirection: 'row', gap: 6, flexWrap: 'wrap' }}>
                {PROGRESSIVE_OPTIONS.map((mins) => {
                  const selected = editingAlarm.progressiveMinutesBefore === mins;
                  return (
                    <TouchableOpacity
                      key={mins}
                      onPress={() => updateEditingAlarm({ progressiveMinutesBefore: mins })}
                      activeOpacity={0.7}
                      style={{
                        paddingHorizontal: 14, paddingVertical: 8,
                        borderRadius: t.radii.sm,
                        borderWidth: 2, borderColor: selected ? t.colors.text : t.colors.border,
                        backgroundColor: selected ? t.colors.purple : t.colors.surface,
                        shadowColor: selected ? t.colors.text : 'transparent',
                        shadowOffset: { width: 2, height: 2 },
                        shadowOpacity: selected ? 1 : 0,
                        shadowRadius: 0, elevation: selected ? 2 : 0,
                      }}
                    >
                      <Text style={{ fontFamily: t.fonts.display, fontSize: 13, color: selected ? t.colors.white : t.colors.textSecondary }}>
                        {mins}m
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}
        </View>

        <View style={{ marginBottom: 12 }}>
          <ChunkyButton variant="secondary" onPress={() => simulateAlarm(editingAlarm)}>
            ▶ Simular Alarma
          </ChunkyButton>
        </View>

        {editingAlarm.label !== '' && (
          <ChunkyButton variant="danger" onPress={() => { deleteAlarm(editingAlarm.id); goHome(); }} style={{ marginBottom: 20 }}>
            Eliminar
          </ChunkyButton>
        )}
        <View style={{ height: 16 }} />
      </ScrollView>
    </View>
  );
}
