import { View, ScrollView } from 'react-native';
import { useAlarm } from '../../AlarmContext';
import t from '../../theme';
import TabHeader from '../../components/TabHeader';
import FeatureCard from '../../components/FeatureCard';

export default function MorningScreen() {
  const { briefingEnabled, setBriefingEnabled } = useAlarm();

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: t.spacing.sm, paddingHorizontal: t.spacing.lg, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <TabHeader
          title="Mañana"
          subtitle="Empieza bien el día"
          decoColor={t.colors.yellow}
          decoShape="blob"
        />

        <View style={{ gap: 12 }}>
          <FeatureCard
            icon="☀️"
            title="Hola"
            subtitle={"2 items configurados"}
            color={t.colors.yellow}
            onPress={() => {}}
          />

          <FeatureCard
            icon="🎙️"
            title="Resumen de audio de la mañana"
            subtitle={briefingEnabled ? 'Activo — agenda, clima y más' : 'Apagado — resumen de audio mañanero'}
            color={t.colors.purple}
            onPress={() => {}}
            enabled={briefingEnabled}
            onToggle={() => setBriefingEnabled(!briefingEnabled)}
          />

          <FeatureCard
            icon="💬"
            title="Libreria Motivacional"
            subtitle="Busca y administra tus motivaciones"
            color={t.colors.teal}
            onPress={() => {}}
          />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
