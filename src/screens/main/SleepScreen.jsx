import { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useAlarm } from '../../AlarmContext';
import t from '../../theme';
import TabHeader from '../../components/TabHeader';
import FeatureCard from '../../components/FeatureCard';

export default function SleepScreen() {
  const { bedtimeEnabled } = useAlarm();
  const [bedtimeEnabledPreview, setBedtimeEnabledPreview] = useState(bedtimeEnabled);

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: t.spacing.sm, paddingHorizontal: t.spacing.lg, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <TabHeader
          title="Sueño"
          subtitle="Descansa mejor, despierta renovado"
          decoColor={t.colors.purple}
          decoShape="circle"
        />

        <View style={{ gap: 12 }}>
          <FeatureCard
            icon="🌙"
            title="Recordatorio nocturno"
            subtitle={bedtimeEnabledPreview ? 'Activo — toca para configurar' : 'Apagado — toca para activar'}
            color="#1A1040"
            onPress={() => {}}
            enabled={bedtimeEnabledPreview}
            onToggle={() => setBedtimeEnabledPreview(!bedtimeEnabledPreview)}
          />

          <FeatureCard
            icon="😴"
            title="Sugerencias de sueño"
            subtitle="Recomendaciones inteligentes de horario"
            color={t.colors.purple}
            onPress={() => {}}
          />

          <FeatureCard
            icon="🔄"
            title="Calculadora de ciclos de sueño"
            subtitle="Optimizador de ciclos de 90 min"
            color="#4DB6AC"
            onPress={() => {}}
          />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
