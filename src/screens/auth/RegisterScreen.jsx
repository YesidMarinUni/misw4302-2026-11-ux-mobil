import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import theme from '../../theme';
import ChunkyButton from '../../components/ChunkyButton';
import Field from '../../components/Field';

const t = theme;

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>✨</Text>
          <Text style={styles.title}>Crear Cuenta</Text>
          <Text style={styles.subtitle}>Regístrate para comenzar</Text>
        </View>

        <Field
          label="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholder="tu@email.com"
        />
        <Field
          label="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="••••••"
        />
        <Text style={styles.hint}>Mínimo 6 caracteres</Text>

        <View style={styles.btnWrapper}>
          <ChunkyButton
            color={t.colors.teal}
            onPress={() => navigation.navigate('CodeVerification', { email })}
          >
            Crear Cuenta
          </ChunkyButton>
        </View>

        <View style={styles.linkRow}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.link, { color: t.colors.teal }]}>Iniciar sesión</Text>
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
  header: {
    alignItems: 'center',
    marginBottom: t.spacing.xl,
    marginTop: t.spacing.xl,
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
  hint: {
    fontSize: 13,
    fontFamily: t.fonts.body,
    color: t.colors.textMuted,
    marginTop: -8,
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
