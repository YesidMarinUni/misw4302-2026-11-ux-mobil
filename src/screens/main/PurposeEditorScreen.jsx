import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useAlarm } from '../../AlarmContext';
import t from '../../theme';

const TEMPLATE_COLORS = [t.colors.accent, t.colors.teal, t.colors.purple, t.colors.yellow, t.colors.accentLight, t.colors.tealDark, t.colors.purple, t.colors.accent];

export default function PurposeEditorScreen() {
  const { editingAlarm, savePurpose, goBack, PURPOSE_TEMPLATES } = useAlarm();

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <ScrollView
        contentContainerStyle={{ padding: t.spacing.sm, paddingHorizontal: t.spacing.lg, paddingBottom: 24 }}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          onPress={goBack}
          activeOpacity={0.7}
          style={{
            backgroundColor: t.colors.surfaceAlt,
            borderWidth: 2, borderColor: t.colors.text,
            paddingHorizontal: 14, paddingVertical: 6,
            borderRadius: t.radii.sm, alignSelf: 'flex-start', marginBottom: 16,
          }}
        >
          <Text style={{ fontFamily: t.fonts.display, fontSize: 13, color: t.colors.text }}>← Atrás</Text>
        </TouchableOpacity>

        <Text style={{ fontFamily: t.fonts.display, fontSize: 22, color: t.colors.text, marginBottom: 4 }}>
          Establecer Propósito
        </Text>
        <Text style={{ fontFamily: t.fonts.body, fontSize: 14, color: t.colors.textSecondary, marginBottom: 16 }}>
          ¿Qué necesitará escuchar tu yo del mañana?
        </Text>

        <TextInput
          value={editingAlarm?.purpose || ''}
          onChangeText={(v) => savePurpose(v)}
          placeholder="Escribe tu propio propósito..."
          placeholderTextColor={t.colors.textMuted}
          multiline
          numberOfLines={3}
          style={{
            width: '100%', paddingHorizontal: 16, paddingVertical: 12,
            borderRadius: t.radii.sm, borderWidth: 3, borderColor: t.colors.text,
            backgroundColor: t.colors.surface, fontFamily: t.fonts.body,
            fontSize: 14, color: t.colors.text, lineHeight: 21,
            marginBottom: 16, textAlignVertical: 'top', minHeight: 80,
          }}
        />

        <Text style={{ fontFamily: t.fonts.display, fontSize: 12, color: t.colors.text, marginBottom: 10 }}>
          Sugerencias rápidas:
        </Text>

        <View style={{ gap: 8 }}>
          {PURPOSE_TEMPLATES.map((tmpl, i) => (
            <TouchableOpacity
              key={tmpl.id}
              onPress={() => savePurpose(tmpl.text)}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row', alignItems: 'center', gap: 12,
                paddingHorizontal: 14, paddingVertical: 12,
                borderRadius: t.radii.sm, borderWidth: 2,
                borderColor: editingAlarm?.purpose === tmpl.text ? t.colors.text : t.colors.border,
                backgroundColor: editingAlarm?.purpose === tmpl.text ? t.colors.surfaceAlt : t.colors.surface,
                shadowColor: editingAlarm?.purpose === tmpl.text ? t.colors.text : 'transparent',
                shadowOffset: { width: 3, height: 3 },
                shadowOpacity: editingAlarm?.purpose === tmpl.text ? 1 : 0,
                shadowRadius: 0, elevation: editingAlarm?.purpose === tmpl.text ? 3 : 0,
              }}
            >
              <View style={{
                width: 34, height: 34, borderRadius: 10,
                backgroundColor: TEMPLATE_COLORS[i % TEMPLATE_COLORS.length],
                alignItems: 'center', justifyContent: 'center',
                borderWidth: 2, borderColor: t.colors.text,
              }}>
                <Text style={{ fontSize: 18 }}>{tmpl.emoji}</Text>
              </View>
              <Text style={{ fontFamily: t.fonts.body, fontSize: 13, color: t.colors.text, flex: 1, lineHeight: 19 }}>
                {tmpl.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>
    </View>
  );
}
