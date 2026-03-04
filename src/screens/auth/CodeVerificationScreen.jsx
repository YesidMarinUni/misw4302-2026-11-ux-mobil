import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import theme from '../../theme';
import ChunkyButton from '../../components/ChunkyButton';

const t = theme;

export default function CodeVerificationScreen({ route, navigation }) {
  const email = route?.params?.email ?? '';
  const [code, setCode] = useState('');

  const handleCodeChange = (value) => {

    setCode(value.replace(/\D/g, '').slice(0, 6));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backLabel}>← Volver</Text>
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.emoji}>🔐</Text>
          <Text style={styles.title}>Verifica tu Cuenta</Text>
          <Text style={styles.subtitle}>Ingresa el código enviado a</Text>
          <Text style={styles.emailLabel}>{email}</Text>
        </View>

        <TextInput
          value={code}
          onChangeText={handleCodeChange}
          keyboardType="number-pad"
          maxLength={6}
          placeholder="000000"
          placeholderTextColor={t.colors.textMuted}
          style={styles.codeInput}
        />

        <View style={styles.btnWrapper}>
          <ChunkyButton
            color={t.colors.purple}
            disabled={code.length !== 6}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Main' }] })}
          >
            Verificar
          </ChunkyButton>
        </View>

        <View style={styles.linkRow}>
          <Text style={styles.linkText}>¿No recibiste el código? </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              setCode('');
            }}
          >
            <Text style={[styles.link, { color: t.colors.purple }]}>Reenviar código</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: t.colors.bg,
  },
  scroll: {
    paddingHorizontal: t.spacing.lg,
    paddingBottom: t.spacing.xl,
  },
  backBtn: {
    alignSelf: 'flex-start',
    marginTop: t.spacing.sm,
    marginBottom: t.spacing.md,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: t.colors.text,
    borderRadius: t.radii.sm,
    backgroundColor: t.colors.surfaceAlt,
  },
  backLabel: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: t.fonts.display,
    color: t.colors.text,
  },
  header: {
    alignItems: 'center',
    marginBottom: t.spacing.xl,
    marginTop: t.spacing.lg,
  },
  emoji: {
    fontSize: 64,
    marginBottom: t.spacing.sm,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    fontFamily: t.fonts.display,
    color: t.colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: t.fonts.body,
    color: t.colors.textSecondary,
  },
  emailLabel: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: t.fonts.display,
    color: t.colors.accent,
    marginTop: 4,
  },
  codeInput: {
    fontSize: 32,
    fontWeight: '700',
    fontFamily: t.fonts.display,
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderWidth: 3,
    borderColor: t.colors.text,
    borderRadius: t.radii.sm,
    backgroundColor: t.colors.surface,
    color: t.colors.text,
    textAlign: 'center',
    letterSpacing: 8,
    marginBottom: t.spacing.md,
  },
  btnWrapper: {
    marginTop: t.spacing.lg,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: t.spacing.lg,
    paddingBottom: t.spacing.xl,
  },
  linkText: {
    fontSize: 14,
    fontFamily: t.fonts.body,
    color: t.colors.textSecondary,
  },
  link: {
    fontSize: 14,
    fontWeight: '700',
    fontFamily: t.fonts.display,
    textDecorationLine: 'underline',
  },
});
