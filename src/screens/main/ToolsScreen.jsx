import { View, ScrollView, Alert } from 'react-native';
import { useAlarm, SCREENS } from '../../AlarmContext';
import t from '../../theme';
import TabHeader from '../../components/TabHeader';
import FeatureCard from '../../components/FeatureCard';
import ChunkyButton from '../../components/ChunkyButton';

export default function ToolsScreen() {
  const { focusModeEnabled, setFocusModeEnabled, navigate, onLogout } = useAlarm();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', style: 'destructive', onPress: onLogout },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      <ScrollView
        contentContainerStyle={{ paddingTop: t.spacing.sm, paddingHorizontal: t.spacing.lg, paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <TabHeader
          title="Herramientas"
          subtitle="Ayudadores de despertar más inteligentes"
          decoColor={t.colors.teal}
          decoShape="square"
        />

        <View style={{ gap: 12, marginBottom: 24 }}>
          <FeatureCard
            icon="🎯"
            title="Modo Enfoque"
            subtitle={focusModeEnabled ? 'Bloqueando distracciones' : 'Apagado — bloquea apps durante el sueño'}
            color={t.colors.accent}
            onPress={() => navigate(SCREENS.EXTRAS_FOCUS)}
            enabled={focusModeEnabled}
            onToggle={() => setFocusModeEnabled(!focusModeEnabled)}
          />
        </View>

        <ChunkyButton variant="danger" onPress={handleLogout}>
          🚪 Cerrar Sesión
        </ChunkyButton>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}
