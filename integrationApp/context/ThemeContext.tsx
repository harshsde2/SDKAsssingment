import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    card: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemColorScheme = useColorScheme() as ThemeType;
  const [theme, setTheme] = useState<ThemeType>(systemColorScheme || 'light');

  useEffect(() => {
    setTheme(systemColorScheme || 'light');
  }, [systemColorScheme]);

  const colors = {
    background: theme === 'light' ? '#ffffff' : '#000000',
    text: theme === 'light' ? '#000000' : '#ffffff',
    primary: '#b1ff84', // The accent color specified in requirements
    secondary: theme === 'light' ? '#f0f0f0' : '#333333',
    card: theme === 'light' ? '#ffffff' : '#1a1a1a',
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 