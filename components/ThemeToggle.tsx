import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { Gesture, GestureDetector } from "react-native-gesture-handler";

/**
 * ThemeToggle Component
 * 
 * A button that toggles between light and dark themes
 * Uses Ionicons for visual indication of current theme
 */
const ThemeToggle = () => {
  const { theme, toggleTheme, colors, active } = useTheme();

  // Create a pan gesture that captures the tap location
  const pan = Gesture.Pan()
    .runOnJS(true)
    .onBegin((e) => {
      if (!active) {
        toggleTheme(e.absoluteX, e.absoluteY);
      }
    });

  return (
    <GestureDetector gesture={pan}>
      <View collapsable={false} style={[styles.container, { backgroundColor: colors.primary }]}>
        <Ionicons 
          name={theme === 'light' ? 'moon' : 'sunny'} 
          size={16} 
          color="black" 
        />
        <Text style={[styles.text, { color: 'black' }]}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </Text>
      </View>
    </GestureDetector>
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
