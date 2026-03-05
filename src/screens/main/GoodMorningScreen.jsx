import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useAlarm, GOOD_MORNING_ACTIONS } from '../../AlarmContext';
import t from '../../theme';
import ChunkyButton from '../../components/ChunkyButton';

const BRIEFING_SOURCES = [
  { key: 'agenda', label: 'Agenda de hoy', icon: '📅', preview: '9:00 AM — Reunión de equipo\n10:30 AM — Revisión de diseño\n2:00 PM — Llamada con cliente', color: t.colors.teal },
  { key: 'weather', label: 'Clima', icon: '🌤️', preview: 'Parcialmente nublado, 22°C. Poca probabilidad de lluvia.', color: t.colors.yellow },
  { key: 'traffic', label: 'Tráfico', icon: '🚗', preview: 'Tránsito normal — 25 min a la oficina.', color: t.colors.accent },
  { key: 'news', label: 'Titulares', icon: '📰', preview: 'Bolsa en alza. Nueva misión espacial lanza el viernes.', color: t.colors.purple },
];

const ACTION_COLORS = {
  work_route: { bg: '#E8F5E9', accent: '#43A047' },
  open_app: { bg: '#F3E5F5', accent: '#8E24AA' },
  calendar: { bg: '#E3F2FD', accent: '#1E88E5' },
};

export default function GoodMorningScreen() {
  const { goHome, briefingEnabled, briefingSources, goodMorningActions, ringingAlarm } = useAlarm();
  const [revealedActions, setRevealedActions] = useState({});
  const [briefingExpanded, setBriefingExpanded] = useState(true);

  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  const dateStr = now.toLocaleDateString('es-ES', { weekday: 'long', month: 'long', day: 'numeric' });

  const activeSources = BRIEFING_SOURCES.filter(s => briefingSources[s.key]);
  const activeActions = GOOD_MORNING_ACTIONS.filter(a => goodMorningActions.includes(a.id));

  const toggleAction = (id) => {
    setRevealedActions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <View style={{ position: 'absolute', top: 30, right: -20, width: 100, height: 100, borderRadius: 50, backgroundColor: t.colors.yellow + '25', borderWidth: 2, borderColor: t.colors.yellow + '40' }} />
      <View style={{ position: 'absolute', top: 180, left: -30, width: 80, height: 80, borderRadius: 20, backgroundColor: t.colors.teal + '18', borderWidth: 2, borderColor: t.colors.teal + '30', transform: [{ rotate: '25deg' }] }} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: t.spacing.lg, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: 10, marginTop: 8 }}>
          <Text style={{ fontSize: 40, marginBottom: 4 }}>☀️</Text>
          <Text style={{ fontFamily: t.fonts.display, fontSize: 28, color: t.colors.text, marginBottom: 2, lineHeight: 32 }}>
            Hola
          </Text>
          <Text style={{ fontFamily: t.fonts.body, fontSize: 13, color: t.colors.textSecondary, marginBottom: 4 }}>
            {dateStr} · {timeStr}
          </Text>
          {ringingAlarm && (
            <View style={{
              flexDirection: 'row', alignItems: 'center', gap: 6,
              backgroundColor: t.colors.teal + '18',
              borderRadius: t.radii.full, paddingHorizontal: 12, paddingVertical: 4,
              borderWidth: 1.5, borderColor: t.colors.teal + '40',
              alignSelf: 'flex-start',
            }}>
              <Text style={{ fontSize: 12 }}>✓</Text>
              <Text style={{ fontFamily: t.fonts.display, fontSize: 11, color: t.colors.teal }}>
                {ringingAlarm.label || 'Alarma'} desactivada
              </Text>
            </View>
          )}
        </View>

        {briefingEnabled && activeSources.length > 0 && (
          <View style={{ marginBottom: 14 }}>
            <TouchableOpacity
              onPress={() => setBriefingExpanded(!briefingExpanded)}
              activeOpacity={0.7}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{
                  width: 28, height: 28, borderRadius: 10,
                  backgroundColor: t.colors.yellow,
                  borderWidth: 2, borderColor: t.colors.text,
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Text style={{ fontSize: 14 }}>🎙️</Text>
                </View>
                <Text style={{ fontFamily: t.fonts.display, fontSize: 15, color: t.colors.text }}>Resumen Matutino</Text>
              </View>
              <Text style={{ fontFamily: t.fonts.display, fontSize: 14, color: t.colors.textMuted }}>
                {briefingExpanded ? '▴' : '▾'}
              </Text>
            </TouchableOpacity>

            {briefingExpanded && (
              <View style={{
                backgroundColor: '#1A1040',
                borderRadius: t.radii.md, padding: 16,
                borderWidth: 3, borderColor: t.colors.text,
                shadowColor: t.colors.text,
                shadowOffset: { width: 4, height: 4 },
                shadowOpacity: 1, shadowRadius: 0, elevation: 4,
              }}>
                {activeSources.map((src, i) => (
                  <View
                    key={src.key}
                    style={{
                      marginBottom: i < activeSources.length - 1 ? 14 : 0,
                      paddingBottom: i < activeSources.length - 1 ? 14 : 0,
                      borderBottomWidth: i < activeSources.length - 1 ? 1 : 0,
                      borderBottomColor: 'rgba(255,255,255,0.08)',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                      <Text style={{ fontSize: 14 }}>{src.icon}</Text>
                      <Text style={{ fontFamily: t.fonts.display, fontSize: 12, color: src.color }}>{src.label}</Text>
                    </View>
                    <Text style={{ fontFamily: t.fonts.body, fontSize: 13, color: 'rgba(255,251,245,0.7)', lineHeight: 20, paddingLeft: 22 }}>
                      {src.preview}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
        {activeActions.length > 0 && (
          <View style={{ marginBottom: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <View style={{
                width: 28, height: 28, borderRadius: 10,
                backgroundColor: t.colors.accent,
                borderWidth: 2, borderColor: t.colors.text,
                alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontSize: 14 }}>⚡</Text>
              </View>
              <Text style={{ fontFamily: t.fonts.display, fontSize: 15, color: t.colors.text }}>Acciones rápidas</Text>
            </View>

            <View style={{ gap: 10 }}>
              {activeActions.map(action => {
                const isRevealed = revealedActions[action.id];
                const c = ACTION_COLORS[action.id] || { bg: t.colors.surfaceAlt, accent: t.colors.accent };

                return (
                  <TouchableOpacity
                    key={action.id}
                    onPress={() => toggleAction(action.id)}
                    activeOpacity={0.8}
                    style={{
                      backgroundColor: t.colors.surface,
                      borderRadius: t.radii.md,
                      borderWidth: 3, borderColor: t.colors.text,
                      shadowColor: isRevealed ? 'transparent' : t.colors.text,
                      shadowOffset: { width: 4, height: 4 },
                      shadowOpacity: isRevealed ? 0 : 1,
                      shadowRadius: 0, elevation: isRevealed ? 0 : 4,
                      overflow: 'hidden',
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 14, paddingHorizontal: 16 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        <View style={{
                          width: 40, height: 40, borderRadius: 12,
                          backgroundColor: c.bg,
                          borderWidth: 2, borderColor: c.accent + '60',
                          alignItems: 'center', justifyContent: 'center',
                        }}>
                          <Text style={{ fontSize: 20 }}>{action.icon}</Text>
                        </View>
                        <View>
                          <Text style={{ fontFamily: t.fonts.display, fontSize: 14, color: t.colors.text }}>{action.label}</Text>
                          <Text style={{ fontFamily: t.fonts.body, fontSize: 11, color: t.colors.textSecondary }}>{action.description}</Text>
                        </View>
                      </View>
                      <View style={{
                        width: 30, height: 30, borderRadius: 10,
                        backgroundColor: isRevealed ? c.accent : c.bg,
                        borderWidth: 2, borderColor: isRevealed ? c.accent : c.accent + '40',
                        alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Text style={{ color: isRevealed ? '#fff' : c.accent, fontFamily: t.fonts.display, fontSize: 14 }}>▸</Text>
                      </View>
                    </View>
                    {isRevealed && (
                      <View style={{ backgroundColor: c.bg, borderTopWidth: 2, borderTopColor: c.accent + '30', padding: 14, paddingHorizontal: 16 }}>
                        <Text style={{ fontFamily: t.fonts.display, fontSize: 13, color: c.accent, marginBottom: 4 }}>
                          {action.simTitle}
                        </Text>
                        <Text style={{ fontFamily: t.fonts.body, fontSize: 12, color: t.colors.textSecondary }}>
                          {action.simDetail}
                        </Text>
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
        <ChunkyButton onPress={goHome} color={t.colors.teal}>
          ¡Empezar el día!
        </ChunkyButton>

        <View style={{ height: 24 }} />
      </ScrollView>
    </View>
  );
}
