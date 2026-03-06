import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useAlarm } from '../../AlarmContext';
import t from '../../theme';
import ScreenHeader from '../../components/ScreenHeader';
import Toggle from '../../components/Toggle';
import SectionLabel from '../../components/SectionLabel';
import ChunkyButton from '../../components/ChunkyButton';

const ALL_APPS = ['Instagram', 'TikTok', 'Twitter/X', 'YouTube', 'Facebook', 'Snapchat', 'Reddit', 'Netflix'];

export default function FocusScreen() {
  const {
    focusModeEnabled,
    focusPermissionGranted,
    blockedApps,
    goBack,
  } = useAlarm();
  const [focusModeEnabledPreview, setFocusModeEnabledPreview] = useState(focusModeEnabled);
  const [focusPermissionGrantedPreview, setFocusPermissionGrantedPreview] = useState(focusPermissionGranted);
  const [blockedAppsPreview, setBlockedAppsPreview] = useState(blockedApps);

  const toggleApp = (app) => {
    setBlockedAppsPreview(prev => (prev.includes(app)
      ? prev.filter(a => a !== app)
      : [...prev, app])
    );
  };

  return (
    <View style={styles.container}>
      <ScreenHeader title="Modo Enfoque" subtitle="Bloquea apps distractoras durante las horas de sueño" onBack={goBack} />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {!focusPermissionGrantedPreview ? (
          <View style={styles.permissionCard}>
            <Text style={styles.permissionIcon}>🔒</Text>
            <Text style={styles.permissionTitle}>
              Permiso requerido
            </Text>
            <Text style={styles.permissionText}>
              Modo Enfoque necesita permiso para gestionar el acceso a apps durante tu horario de sueño.
            </Text>
            <ChunkyButton onPress={() => setFocusPermissionGrantedPreview(true)} color={t.colors.teal}>
              Conceder permiso
            </ChunkyButton>
          </View>
        ) : (
          <View>
            <View style={styles.modeCard}>
              <View style={styles.modeHeaderRow}>
                <View>
                  <Text style={styles.modeTitle}>Modo Enfoque</Text>
                  <Text style={styles.modeSubtitle}>
                    {focusModeEnabledPreview ? `Bloqueando ${blockedAppsPreview.length} apps` : 'Actualmente apagado'}
                  </Text>
                </View>
                <Toggle enabled={focusModeEnabledPreview} onToggle={() => setFocusModeEnabledPreview(!focusModeEnabledPreview)} />
              </View>
            </View>

            <SectionLabel>Apps bloqueadas ({blockedAppsPreview.length})</SectionLabel>
            <View style={styles.appsList}>
              {ALL_APPS.map(app => {
                const blocked = blockedAppsPreview.includes(app);
                return (
                  <TouchableOpacity
                    key={app}
                    onPress={() => toggleApp(app)}
                    activeOpacity={0.7}
                    style={[styles.appRow, blocked ? styles.appRowBlocked : styles.appRowIdle]}
                  >
                    <Text style={styles.appLabel}>{app}</Text>
                    <View style={[styles.appBadge, blocked ? styles.appBadgeBlocked : styles.appBadgeIdle]}>
                      {blocked && <Text style={styles.appBadgeText}>✕</Text>}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: t.colors.bg,
  },
  scrollContent: {
    paddingHorizontal: t.spacing.lg,
    paddingBottom: 20,
  },
  permissionCard: {
    backgroundColor: t.colors.surface,
    borderRadius: t.radii.lg,
    padding: 24,
    borderWidth: 3,
    borderColor: t.colors.text,
    shadowColor: t.colors.text,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
    alignItems: 'center',
  },
  permissionIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  permissionTitle: {
    fontFamily: t.fonts.display,
    fontSize: 18,
    color: t.colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionText: {
    fontFamily: t.fonts.body,
    fontSize: 14,
    color: t.colors.textSecondary,
    lineHeight: 21,
    marginBottom: 20,
    textAlign: 'center',
  },
  modeCard: {
    backgroundColor: t.colors.surface,
    borderRadius: t.radii.md,
    padding: 16,
    borderWidth: 3,
    borderColor: t.colors.text,
    shadowColor: t.colors.text,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    marginBottom: 16,
  },
  modeHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeTitle: {
    fontFamily: t.fonts.display,
    fontSize: 16,
    color: t.colors.text,
  },
  modeSubtitle: {
    fontFamily: t.fonts.body,
    fontSize: 12,
    color: t.colors.textSecondary,
  },
  appsList: {
    gap: 8,
    marginBottom: 16,
  },
  appRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: t.radii.sm,
    borderWidth: 2,
  },
  appRowBlocked: {
    borderColor: t.colors.accent,
    backgroundColor: '#FFF5F3',
  },
  appRowIdle: {
    borderColor: t.colors.border,
    backgroundColor: t.colors.surface,
  },
  appLabel: {
    fontFamily: t.fonts.body,
    fontSize: 15,
    color: t.colors.text,
  },
  appBadge: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: t.colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBadgeBlocked: {
    backgroundColor: t.colors.accent,
  },
  appBadgeIdle: {
    backgroundColor: t.colors.disabled,
  },
  appBadgeText: {
    color: '#fff',
    fontSize: 12,
  },
  bottomSpacer: {
    height: 20,
  },
});
