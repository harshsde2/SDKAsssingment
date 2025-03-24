import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function ResultsScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ name: string; email: string }>();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Submission Successful</Text>
      
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text style={[styles.label, { color: colors.text }]}>Submitted Information:</Text>
        
        <View style={styles.infoRow}>
          <Text style={[styles.fieldName, { color: colors.text }]}>Name:</Text>
          <Text style={[styles.fieldValue, { color: colors.text }]}>{params.name}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Text style={[styles.fieldName, { color: colors.text }]}>Email:</Text>
          <Text style={[styles.fieldValue, { color: colors.text }]}>{params.email}</Text>
        </View>
      </View>
      
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.buttonText}>Back to Home</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  card: {
    width: '100%',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  fieldName: {
    width: 80,
    fontWeight: '500',
  },
  fieldValue: {
    flex: 1,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
}); 