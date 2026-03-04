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

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.emoji}>🌙</Text>
          <Text style={styles.title}>Bienvenido</Text>
          <Text style={styles.subtitle}>Inicia sesión para continuar</Text>
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

        <View style={styles.btnWrapper}>
          <ChunkyButton onPress={() => navigation.navigate('Main')}>
            Iniciar Sesión
          </ChunkyButton>
        </View>

        {/* Link a Register */}
        <View style={styles.linkRow}>
          <Text style={styles.linkText}>¿No tienes cuenta? </Text>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.link}>Iniciar sesión</Text>
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
    color: t.colors.accent,
    textDecorationLine: 'underline',
  },
});
