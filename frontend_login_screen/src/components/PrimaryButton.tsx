import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../theme';

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  accessibilityLabel?: string;
};

export const PrimaryButton: React.FC<Props> = ({
  title,
  onPress,
  disabled,
  style,
  accessibilityLabel,
}) => {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        theme.shadows.md,
        pressed ? styles.pressed : null,
        disabled ? styles.disabled : null,
        Array.isArray(style) ? style : [style],
      ]}
    >
      <Text style={[styles.text, disabled ? styles.textDisabled : null]}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    width: '100%',
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    borderRadius: theme.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.9,
    backgroundColor: '#1E4ED8', // darker shade for pressed
    transform: [{ scale: 0.995 }],
  },
  disabled: {
    backgroundColor: '#93C5FD', // light blue to indicate disabled
  },
  text: {
    ...theme.typography.button,
    color: '#ffffff',
  },
  textDisabled: {
    color: '#F0F9FF',
  },
});

export default PrimaryButton;
