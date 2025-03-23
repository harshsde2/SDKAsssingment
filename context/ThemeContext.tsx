import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

// Define the theme types
type ThemeType = 'light' | 'dark';

// Define the shape of our context
interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    card: string;
    black: string;
  };
}

// Create the context with undefined as initial value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * ThemeProvider component that wraps the app and provides theme functionality
 * 
 * It detects the system theme by default and provides a way to toggle between themes
 * It also provides a set of colors based on the current theme
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get the system color scheme (light or dark)
  const systemColorScheme = useColorScheme() as ThemeType;
  
  // Set the initial theme based on system preference
  const [theme, setTheme] = useState<ThemeType>(systemColorScheme || 'light');

  // Update theme if system preference changes
  useEffect(() => {
    setTheme(systemColorScheme || 'light');
  }, [systemColorScheme]);

  // Define colors based on the current theme
  const colors = {
    background: theme === 'light' ? '#ffffff' : '#000000',
    text: theme === 'light' ? '#000000' : '#ffffff',
    primary: '#b1ff84', // The accent color specified in requirements
    secondary: theme === 'light' ? '#f0f0f0' : '#333333',
    card: theme === 'light' ? '#ffffff' : '#1a1a1a',
    black: '#000000',
  };

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  // Provide the theme context to all children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook to use the theme context
 * 
 * This makes it easier to consume the theme context in components
 */
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
