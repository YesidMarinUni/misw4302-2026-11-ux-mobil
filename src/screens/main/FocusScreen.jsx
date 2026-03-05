import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAlarm } from '../../AlarmContext';
import t from '../../theme';
import ScreenHeader from '../../components/ScreenHeader';
import Toggle from '../../components/Toggle';
import SectionLabel from '../../components/SectionLabel';
import ChunkyButton from '../../components/ChunkyButton';

const ALL_APPS = ['Instagram', 'TikTok', 'Twitter/X', 'YouTube', 'Facebook', 'Snapchat', 'Reddit', 'Netflix'];

export default function FocusScreen() {
  const {
    focusModeEnabled, setFocusModeEnabled,
    focusPermissionGranted, setFocusPermissionGranted,
    blockedApps, setBlockedApps,
    goBack,
  } = useAlarm();

  const toggleApp = (app) => {
    setBlockedApps(blockedApps.includes(app)
      ? blockedApps.filter(a => a !== app)
      : [...blockedApps, app]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <ScreenHeader title="Modo Enfoque" subtitle="Bloquea apps distractoras durante las horas de sueño" onBack={goBack} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: t.spacing.lg, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {!focusPermissionGranted ? (
          <View style={{
            backgroundColor: t.colors.surface,
            borderRadius: t.radii.lg, padding: 24,
            borderWidth: 3, borderColor: t.colors.text,
            shadowColor: t.colors.text,
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 1, shadowRadius: 0, elevation: 5,
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 48, marginBottom: 16 }}>🔒</Text>
            <Text style={{ fontFamily: t.fonts.display, fontSize: 18, color: t.colors.text, marginBottom: 8, textAlign: 'center' }}>
              Permiso requerido
            </Text>
            <Text style={{ fontFamily: t.fonts.body, fontSize: 14, color: t.colors.textSecondary, lineHeight: 21, marginBottom: 20, textAlign: 'center' }}>
              Modo Enfoque necesita permiso para gestionar el acceso a apps durante tu horario de sueño.
            </Text>
            <ChunkyButton onPress={() => setFocusPermissionGranted(true)} color={t.colors.teal}>
              Conceder permiso
            </ChunkyButton>
          </View>
        ) : (
          <View>
            <View style={{
              backgroundColor: t.colors.surface,
              borderRadius: t.radii.md, padding: 16,
              borderWidth: 3, borderColor: t.colors.text,
              shadowColor: t.colors.text,
              shadowOffset: { width: 4, height: 4 },
              shadowOpacity: 1, shadowRadius: 0, elevation: 4,
              marginBottom: 16,
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View>
                  <Text style={{ fontFamily: t.fonts.display, fontSize: 16, color: t.colors.text }}>Modo Enfoque</Text>
                  <Text style={{ fontFamily: t.fonts.body, fontSize: 12, color: t.colors.textSecondary }}>
                    {focusModeEnabled ? `Bloqueando ${blockedApps.length} apps` : 'Actualmente apagado'}
                  </Text>
                </View>
                <Toggle enabled={focusModeEnabled} onToggle={() => setFocusModeEnabled(!focusModeEnabled)} />
              </View>
            </View>

            <SectionLabel>Apps bloqueadas ({blockedApps.length})</SectionLabel>
            <View style={{ gap: 8, marginBottom: 16 }}>
              {ALL_APPS.map(app => {
                const blocked = blockedApps.includes(app);
                return (
                  <TouchableOpacity
                    key={app}
                    onPress={() => toggleApp(app)}
                    activeOpacity={0.7}
                    style={{
                      flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
                      paddingHorizontal: 16, paddingVertical: 12,
                      borderRadius: t.radii.sm, borderWidth: 2,
                      borderColor: blocked ? t.colors.accent : t.colors.border,
                      backgroundColor: blocked ? '#FFF5F3' : t.colors.surface,
                    }}
                  >
                    <Text style={{ fontFamily: t.fonts.body, fontSize: 15, color: t.colors.text }}>{app}</Text>
                    <View style={{
                      width: 24, height: 24, borderRadius: 6,
                      backgroundColor: blocked ? t.colors.accent : t.colors.disabled,
                      borderWidth: 2, borderColor: t.colors.text,
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      {blocked && <Text style={{ color: '#fff', fontSize: 12 }}>✕</Text>}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
