import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import { theme } from './src/theme';

export default function App() {
  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
