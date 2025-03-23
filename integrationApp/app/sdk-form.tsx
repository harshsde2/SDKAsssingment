import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from '../context/ThemeContext';
import initializeSdk from '../../sdk';

export default function SdkFormScreen() {
  const { theme, colors } = useTheme();
  const router = useRouter();
  const [formData, setFormData] = useState<{ name: string; email: string } | null>(null);

  // Initialize SDK with appropriate theme
  const sdk = initializeSdk({ theme });

  // Handle form submission from SDK
  const handleFormSubmit = (data: { name: string; email: string }) => {
    setFormData(data);
    Alert.alert(
      "Form Submitted",
      `Name: ${data.name}\nEmail: ${data.email}`,
      [
        { 
          text: "OK", 
          onPress: () => router.back() 
        }
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {sdk.renderForm({ onSubmit: handleFormSubmit })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
}); 