export const theme = {
  colors: {
    primary: '#2563EB', // Ocean blue
    secondary: '#F59E0B', // Amber (used also as success accent)
    success: '#F59E0B',
    error: '#EF4444',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    muted: '#6B7280',
    border: '#E5E7EB',
    shadow: 'rgba(0, 0, 0, 0.06)',
    overlay: 'rgba(37, 99, 235, 0.08)',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    '2xl': 32,
    '3xl': 40,
  },
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
    pill: 999,
  },
  shadows: {
    // Platform-aware subtle elevation
    sm: {
      shadowColor: 'rgba(17, 24, 39, 0.12)',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.12,
      shadowRadius: 3,
      elevation: 2,
    },
    md: {
      shadowColor: 'rgba(17, 24, 39, 0.16)',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.16,
      shadowRadius: 6,
      elevation: 4,
    },
    lg: {
      shadowColor: 'rgba(17, 24, 39, 0.18)',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.18,
      shadowRadius: 12,
      elevation: 8,
    },
  },
  typography: {
    title: {
      fontSize: 28,
      fontWeight: '700' as const,
      letterSpacing: 0.2,
    },
    label: {
      fontSize: 14,
      fontWeight: '600' as const,
      letterSpacing: 0.2,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
    },
    helper: {
      fontSize: 12,
      fontWeight: '400' as const,
    },
    button: {
      fontSize: 16,
      fontWeight: '700' as const,
      letterSpacing: 0.3,
    },
  },
};

export type Theme = typeof theme;

// PUBLIC_INTERFACE
export function getEnvFlag(name: string, defaultValue: string | undefined = undefined): string | undefined {
  /** Get a public environment flag from process.env (Expo public envs start with EXPO_PUBLIC_). */
  // Narrow the type for process.env access to avoid `any`.
  const env: Record<string, string | undefined> =
    typeof process !== 'undefined' && process && (process as unknown as { env?: Record<string, string | undefined> }).env
      ? ((process as unknown as { env?: Record<string, string | undefined> }).env as Record<string, string | undefined>)
      : {};
  const value = env[name];
  return value ?? defaultValue;
}
