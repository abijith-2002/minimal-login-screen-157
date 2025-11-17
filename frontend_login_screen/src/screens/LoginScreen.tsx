import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { theme, getEnvFlag } from '../theme';
import TextField from '../components/TextField';
import PrimaryButton from '../components/PrimaryButton';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// PUBLIC_INTERFACE
export default function LoginScreen() {
  /** Renders the Ocean Professional themed login screen with local validation and accessibility. */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState<{ email: boolean; password: boolean }>({
    email: false,
    password: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const logLevel = (getEnvFlag('EXPO_PUBLIC_LOG_LEVEL', 'info') || 'info').toLowerCase();
  const experimentsEnabled = (getEnvFlag('EXPO_PUBLIC_EXPERIMENTS_ENABLED', 'false') || 'false') === 'true';
  const featureFlags = getEnvFlag('EXPO_PUBLIC_FEATURE_FLAGS', '');

  const passwordRef = useRef<TextInput>(null);

  const emailError = useMemo(() => {
    if (!touched.email) return '';
    if (!email) return 'Email is required.';
    if (!emailRegex.test(email)) return 'Enter a valid email address.';
    return '';
  }, [email, touched.email]);

  const passwordError = useMemo(() => {
    if (!touched.password) return '';
    if (!password) return 'Password is required.';
    return '';
  }, [password, touched.password]);

  const canSubmit = useMemo(() => {
    return emailRegex.test(email) && password.length > 0 && !isSubmitting;
  }, [email, password, isSubmitting]);

  const handleSubmit = useCallback(() => {
    setTouched({ email: true, password: true });
    if (!emailRegex.test(email) || password.length === 0) return;

    setIsSubmitting(true);
    if (logLevel !== 'silent') {
      // No backend; simulate async submit
      console.log('[LoginScreen] submitting', { emailMasked: email.replace(/(.).+(@.*)/, '$1***$2') });
    }
    setTimeout(() => {
      setIsSubmitting(false);
      if (logLevel === 'debug') {
        console.log('[LoginScreen] submit complete');
      }
      // No navigation or backend; we just finish
    }, 900);
  }, [email, password, logLevel]);

  return (
    <KeyboardAvoidingView
      style={styles.root}
      behavior={Platform.select({ ios: 'padding', android: undefined, default: undefined })}
    >
      {/* Layered background for subtle depth (no extra deps) */}
      <View style={styles.backgroundLayer} />
      {experimentsEnabled ? <View style={styles.accentOverlay} pointerEvents="none" /> : null}

      <ScrollView
        contentContainerStyle={styles.scrollBody}
        keyboardShouldPersistTaps="handled"
      >
        <View style={[styles.card, theme.shadows.lg]}>
          <Text style={styles.title} accessibilityRole="header">
            Ocean Login
          </Text>

          <View style={styles.space} />

          <TextField
            label="Email"
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              if (logLevel === 'debug') console.log('[LoginScreen] email changed');
            }}
            onBlur={() => setTouched((s) => ({ ...s, email: true }))}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            errorText={emailError || undefined}
            accessibilityLabel="Email"
          />

          <View style={{ height: theme.spacing.lg }} />

          <TextField
            label="Password"
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              if (logLevel === 'debug') console.log('[LoginScreen] password changed');
            }}
            onBlur={() => setTouched((s) => ({ ...s, password: true }))}
            returnKeyType="done"
            ref={passwordRef}
            onSubmitEditing={handleSubmit}
            errorText={passwordError || undefined}
            accessibilityLabel="Password"
          />

          <View style={{ height: theme.spacing['2xl'] }} />

          <PrimaryButton
            title={isSubmitting ? 'Signing in…' : 'Login'}
            onPress={handleSubmit}
            disabled={!canSubmit}
            accessibilityLabel="Login"
          />

          {!!featureFlags && (
            <Text style={styles.helper}>
              Feature flags: {featureFlags}
            </Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: theme.colors.background,
  },
  accentOverlay: {
    ...StyleSheet.absoluteFillObject,
    // Subtle radial-like overlay using layered gradients imitation
    backgroundColor: 'transparent',
    // Use a large shadowed circle to simulate gradient depth (web/native safe)
    // We'll stack a few Views inside ScrollView area instead of heavy gradients.
  },
  scrollBody: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing['2xl'],
    paddingVertical: theme.spacing['3xl'],
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing['2xl'],
  },
  title: {
    ...theme.typography.title,
    color: theme.colors.text,
    textAlign: 'center',
  },
  space: {
    height: theme.spacing.xl,
  },
  helper: {
    marginTop: theme.spacing.lg,
    textAlign: 'center',
    color: theme.colors.muted,
    ...theme.typography.helper,
  },
});
