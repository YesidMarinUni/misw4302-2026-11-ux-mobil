import { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useAlarm } from '../../AlarmContext';
import t from '../../theme';
import ChunkyButton from '../../components/ChunkyButton';

export default function AlarmRingingScreen() {
  const { ringingAlarm, fadeProgress, dismissAlarm, snoozeAlarm } = useAlarm();
  const [swipeProgress, setSwipeProgress] = useState(0);
  const [swipeHolding, setSwipeHolding] = useState(false);
  const [actionConfirmed, setActionConfirmed] = useState(false);
  const holdInterval = useRef(null);

  useEffect(() => {
    if (!ringingAlarm) return;
    setSwipeProgress(0);
    setSwipeHolding(false);
    setActionConfirmed(false);
  }, [ringingAlarm]);

  useEffect(() => {
    if (!swipeHolding) {
      clearInterval(holdInterval.current);
      setSwipeProgress(0);
      return;
    }
    holdInterval.current = setInterval(() => {
      setSwipeProgress(prev => {
        if (prev >= 100) {
          clearInterval(holdInterval.current);
          snoozeAlarm();
          return 100;
        }
        return prev + 4;
      });
    }, 50);
    return () => clearInterval(holdInterval.current);
  }, [swipeHolding, snoozeAlarm]);

  if (!ringingAlarm) return null;

  const hasLongSwipe = ringingAlarm.longSwipeEnabled;
  const hasAction = !!ringingAlarm.action;

  return (
    <View style={{
      flex: 1,
      backgroundColor: t.colors.accent,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 40,
      paddingHorizontal: 28,
    }}>

      <View style={{ position: 'absolute', top: -40, right: -40, width: 160, height: 160, borderRadius: 80, borderWidth: 4, borderColor: 'rgba(255,255,255,0.2)' }} />
      <View style={{ position: 'absolute', bottom: -30, left: -30, width: 120, height: 120, borderRadius: 60, borderWidth: 4, borderColor: 'rgba(255,255,255,0.15)' }} />

      {ringingAlarm.progressive && (
        <View style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: t.radii.full, paddingHorizontal: 14, paddingVertical: 4, marginBottom: 8, borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)' }}>
          <Text style={{ fontFamily: t.fonts.display, fontSize: 11, color: 'rgba(255,255,255,0.8)' }}>PROGRESIVA</Text>
        </View>
      )}

      <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: t.radii.full, paddingHorizontal: 16, paddingVertical: 6, marginBottom: 24, borderWidth: 2, borderColor: 'rgba(255,255,255,0.3)' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={{ width: 80, height: 8, borderRadius: t.radii.full, backgroundColor: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
            <View style={{ height: '100%', width: `${fadeProgress}%`, backgroundColor: t.colors.white, borderRadius: t.radii.full }} />
          </View>
          <Text style={{ fontFamily: t.fonts.display, fontSize: 12, color: t.colors.white }}>{fadeProgress}%</Text>
        </View>
      </View>

      <Text style={{
        fontFamily: t.fonts.display,
        fontSize: 60,
        color: t.colors.white,
        lineHeight: 66,
        marginBottom: 6,
      }}>
        {ringingAlarm.time}
      </Text>

      <Text style={{ fontFamily: t.fonts.body, fontSize: 16, color: 'rgba(255,255,255,0.85)', marginBottom: 4 }}>
        {ringingAlarm.label || 'Alarma'}
      </Text>
      <Text style={{ fontFamily: t.fonts.body, fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
        {ringingAlarm.ringtone || 'Campana del amanecer'}
      </Text>

      {!!ringingAlarm.purpose && (
        <View style={{
          backgroundColor: t.colors.white,
          borderRadius: t.radii.md,
          padding: 18,
          paddingHorizontal: 22,
          marginBottom: 20,
          maxWidth: 260,
          borderWidth: 3,
          borderColor: t.colors.text,
          shadowColor: t.colors.text,
          shadowOffset: { width: 4, height: 4 },
          shadowOpacity: 1,
          shadowRadius: 0,
          elevation: 4,
        }}>
          <Text style={{ fontFamily: t.fonts.display, fontSize: 11, color: t.colors.accent, marginBottom: 6 }}>TU PROPÓSITO</Text>
          <Text style={{ fontFamily: t.fonts.body, fontSize: 15, color: t.colors.text, lineHeight: 22 }}>{ringingAlarm.purpose}</Text>
        </View>
      )}

      {hasAction && !actionConfirmed && (
        <View style={{
          backgroundColor: 'rgba(255,255,255,0.15)',
          borderRadius: t.radii.md,
          padding: 12,
          paddingHorizontal: 20,
          marginBottom: 16,
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.25)',
          width: '100%',
          maxWidth: 260,
        }}>
          <Text style={{ fontFamily: t.fonts.display, fontSize: 11, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>ACCIÓN DE ALARMA</Text>
          <ChunkyButton onPress={() => setActionConfirmed(true)} color={t.colors.yellow}>
            {ringingAlarm.action.type === 'call' ? '📞' : '📋'} {ringingAlarm.action.label}
          </ChunkyButton>
        </View>
      )}

      {actionConfirmed && (
        <View style={{
          backgroundColor: t.colors.teal,
          borderRadius: t.radii.sm,
          paddingHorizontal: 16,
          paddingVertical: 10,
          marginBottom: 16,
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.3)',
        }}>
          <Text style={{ fontFamily: t.fonts.display, fontSize: 13, color: '#fff' }}>✓ ¡Acción confirmada!</Text>
        </View>
      )}

      {/* Buttons */}
      <View style={{ gap: 10, width: '100%', maxWidth: 240 }}>
        <ChunkyButton onPress={dismissAlarm} color={t.colors.teal}>Estoy despierto</ChunkyButton>

        {hasLongSwipe ? (
          <TouchableOpacity
            onPressIn={() => setSwipeHolding(true)}
            onPressOut={() => setSwipeHolding(false)}
            activeOpacity={1}
            style={{
              backgroundColor: 'rgba(255,255,255,0.95)',
              borderWidth: 3,
              borderColor: t.colors.text,
              borderRadius: t.radii.sm,
              padding: 14,
              paddingHorizontal: 24,
              minHeight: 52,
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: t.colors.text,
              shadowOffset: { width: 4, height: 4 },
              shadowOpacity: 1,
              shadowRadius: 0,
              elevation: 4,
              overflow: 'hidden',
            }}
          >
            <View style={{
              position: 'absolute', top: 0, left: 0, bottom: 0,
              width: `${swipeProgress}%`,
              backgroundColor: t.colors.purple + '30',
            }} />
            <Text style={{ fontFamily: t.fonts.display, fontSize: 15, color: t.colors.text }}>
              {swipeProgress > 0 ? `Mantén... ${Math.round(swipeProgress)}%` : 'Mantén para posponer'}
            </Text>
          </TouchableOpacity>
        ) : (
          <ChunkyButton variant="secondary" onPress={snoozeAlarm} style={{ backgroundColor: 'rgba(255,255,255,0.95)' }}>
            Posponer
          </ChunkyButton>
        )}
      </View>
    </View>
  );
}
