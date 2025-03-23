import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';

/**
 * Root Layout Component
 * 
 * Sets up the navigation structure and wraps the app with ThemeProvider
 * Configures StatusBar and Stack Navigator styles
 */
export default function RootLayout() {
  // We need a wrapper to access the theme context
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

/**
 * Root Layout Navigator
 * 
 * This component needs to be wrapped by ThemeProvider to access the theme
 */
function RootLayoutNav() {
  const { theme, colors } = useTheme();
  
  return (
    <>
      {/* Status bar adapts to the current theme */}
      {/* <StatusBar style={theme === 'dark' ? 'light' : 'dark'} /> */}
      
      {/* Stack Navigator for screen navigation */}
      <Stack 
        screenOptions={{
          headerRight: () => <ThemeToggle />,
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: theme === 'dark' ? '#fff' : '#000',
          },
          headerStyle: {
            backgroundColor: theme === 'dark' ? '#000' : '#fff',
          },
          headerTitle: 'SDK Demo',
          
          // Background color for the screens adapts to theme
          contentStyle: {
            backgroundColor: colors.background,
          },
        }}
      >
        <Stack.Screen 
          name="index" 
          options={{ 
            title: "Home",
          }} 
        />
        <Stack.Screen 
          name="form" 
          options={{ 
            title: "User Form",
          }} 
        />
        <Stack.Screen 
          name="results" 
          options={{ 
            title: "Submission Results",
          }} 
        />
        <Stack.Screen 
          name="sdk-integration" 
          options={{ 
            title: "SDK Integration Example",
          }} 
        />
      </Stack>
    </>
  );
}