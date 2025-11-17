import React, { forwardRef, useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
  Platform,
  StyleProp,
  TextStyle,
} from 'react-native';
import { theme } from '../theme';

type Props = TextInputProps & {
  label?: string;
  errorText?: string | null;
};

export const TextField = forwardRef<TextInput, Props>(function TextField(
  {
    label,
    errorText,
    style,
    onFocus,
    onBlur,
    ...rest
  },
  ref
) {
  const [focused, setFocused] = useState(false);

  const borderColor = useMemo(() => {
    if (errorText) return theme.colors.error;
    if (focused) return theme.colors.primary;
    return theme.colors.border;
  }, [focused, errorText]);

  return (
    <View style={styles.wrapper}>
      {!!label && (
        <Text
          style={styles.label}
          accessibilityRole="text"
          accessibilityLabel={label}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.inputContainer,
          Platform.OS === 'web' ? styles.inputContainerWeb : undefined,
          { borderColor, backgroundColor: theme.colors.surface },
          focused ? styles.inputFocused : undefined,
          errorText ? styles.inputError : undefined,
        ]}
      >
        <TextInput
          ref={ref}
          style={[styles.input, style as StyleProp<TextStyle>]}
          placeholderTextColor={theme.colors.muted}
          onFocus={(e) => {
            setFocused(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onBlur?.(e);
          }}
          accessible
          {...rest}
        />
      </View>
      {!!errorText && (
        <Text style={styles.errorText} accessibilityRole="alert">
          {errorText}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
  },
  label: {
    ...theme.typography.label,
    marginBottom: theme.spacing.sm,
    color: theme.colors.text,
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: Platform.select({ ios: 14, android: 12, default: 12 }),
    ...theme.shadows.sm,
  },
  inputContainerWeb: {
    outlineStyle: 'none' as any,
  },
  inputFocused: {
    // subtle overlay when focused
    backgroundColor: '#ffffff',
  },
  inputError: {
    // error border handled by dynamic color; extra subtle bg
    backgroundColor: 'rgba(239, 68, 68, 0.02)',
  },
  input: {
    ...theme.typography.body,
    color: theme.colors.text,
    padding: 0,
  },
  errorText: {
    marginTop: theme.spacing.sm,
    color: theme.colors.error,
    ...theme.typography.helper,
  },
});

export default TextField;
