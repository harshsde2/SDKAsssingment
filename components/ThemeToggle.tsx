import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

/**
 * ThemeToggle Component
 * 
 * A button that toggles between light and dark themes
 * Uses Ionicons for visual indication of current theme
 */
const ThemeToggle = () => {
  const { theme, toggleTheme, colors } = useTheme();

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: colors.primary }]} 
      onPress={toggleTheme}
      accessibilityLabel="Toggle theme"
      accessibilityRole="button"
    >
      <Ionicons 
        name={theme === 'light' ? 'moon' : 'sunny'} 
        size={16} 
        color={colors.black} 
      />
      <Text style={[styles.text, { color: colors.black }]}>
        {theme === 'light' ? 'Dark' : 'Light'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  text: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ThemeToggle;
