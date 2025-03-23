import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '../context/ThemeContext';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { theme, colors } = useTheme();
  
  return (
    <>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
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
          headerTitle: 'SDK Integration',
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
          name="sdk-form" 
          options={{ 
            title: "SDK Form",
          }} 
        />
      </Stack>
    </>
  );
} 