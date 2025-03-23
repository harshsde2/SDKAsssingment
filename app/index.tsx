import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  
  // Navigation handlers
  const goToForm = () => router.push('/form');
  const goToSdkIntegration = () => router.push('/sdk-integration');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Welcome to SDK Demo
        </Text>
      </View>
      
      <Text style={[styles.subtitle, { color: colors.text }]}>
        This is a demonstration of our React Native SDK
      </Text>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={goToForm}
      >
        <Text style={styles.buttonText}>Go to Form</Text>
      </TouchableOpacity>

      <View style={styles.spacer} />
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={goToSdkIntegration}
      >
        <Text style={styles.buttonText}>Try SDK Integration</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 3,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  spacer: {
    height: 20,
  },
});
