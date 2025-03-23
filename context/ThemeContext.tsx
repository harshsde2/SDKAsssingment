import React, { createContext, useState, useContext, useEffect, useRef, useCallback, useReducer } from 'react';
import { useColorScheme as useDeviceColorScheme, Dimensions, View, StyleSheet } from 'react-native';
import {
  makeImageFromView,
  Canvas,
  Image,
  mix,
  vec,
  ImageShader,
  Circle,
  dist,
} from "@shopify/react-native-skia";
import type { SkImage } from "@shopify/react-native-skia";
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { StatusBar } from "expo-status-bar";

// Define the theme types
type ThemeType = 'light' | 'dark';

const { width, height } = Dimensions.get("window");
const corners = [vec(0, 0), vec(width, 0), vec(width, height), vec(0, height)];

// Wait utility function
const wait = async (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of our context
interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: (x: number, y: number) => void;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    card: string;
    black: string;
  };
  active: boolean;
}

// Extended state for animation
interface ThemeState {
  statusBarStyle: 'light' | 'dark';
  theme: ThemeType;
  overlay1: SkImage | null;
  overlay2: SkImage | null;
  active: boolean;
}

// Create the context with undefined as initial value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Theme state reducer
const themeReducer = (_: ThemeState, themeState: ThemeState) => {
  return themeState;
};

/**
 * ThemeProvider component that wraps the app and provides theme functionality
 * 
 * It detects the system theme by default and provides a way to toggle between themes
 * It also provides a set of colors based on the current theme
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceColorScheme = useDeviceColorScheme() as ThemeType;
  const defaultValue: ThemeState = {
    statusBarStyle: deviceColorScheme === 'light' ? 'dark' : 'light',
    theme: deviceColorScheme || 'light',
    overlay1: null,
    overlay2: null,
    active: false,
  };
  
  // Animation values
  const transition = useSharedValue(0);
  const circle = useSharedValue({ x: 0, y: 0, r: 0 });
  const viewRef = useRef<View>(null);
  
  // Theme state with reducer
  const [{ theme, overlay1, overlay2, active, statusBarStyle }, dispatch] = useReducer(
    themeReducer,
    defaultValue
  );
  
  // Animation radius
  const r = useDerivedValue(() => {
    return mix(transition.value, 0, circle.value.r);
  });
  
  // Theme colors
  const colors = {
    background: theme === 'light' ? '#ffffff' : '#000000',
    text: theme === 'light' ? '#000000' : '#ffffff',
    primary: '#b1ff84', // The accent color specified in requirements
    secondary: theme === 'light' ? '#f0f0f0' : '#333333',
    card: theme === 'light' ? '#ffffff' : '#1a1a1a',
    black: '#000000',
  };

  // Toggle theme with animation
  const toggleTheme = useCallback(async (x: number, y: number) => {
    if (active) return; // Prevent multiple animations

    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Start animation process
    dispatch({
      statusBarStyle: newTheme === 'light' ? 'dark' : 'light',
      active: true,
      theme,
      overlay1: null,
      overlay2: null,
    });

    // Calculate animation radius
    circle.value = { 
      x, 
      y, 
      r: Math.max(...corners.map(corner => dist(corner, vec(x, y)))) 
    };
    
    // Capture current screen
    const overlay1 = await makeImageFromView(viewRef);
    dispatch({
      statusBarStyle: newTheme === 'light' ? 'dark' : 'light',
      active: true,
      theme,
      overlay1,
      overlay2: null,
    });
    
    await wait(10);
    
    // Change theme
    dispatch({
      statusBarStyle: newTheme === 'light' ? 'dark' : 'light',
      active: true,
      theme: newTheme,
      overlay1,
      overlay2: null,
    });
    
    await wait(10);
    
    // Capture screen with new theme
    const overlay2 = await makeImageFromView(viewRef);
    dispatch({
      statusBarStyle: newTheme === 'light' ? 'dark' : 'light',
      active: true,
      theme: newTheme,
      overlay1,
      overlay2,
    });
    
    // Run animation
    const duration = 800;
    transition.value = 0;
    transition.value = withTiming(1, { duration });

    await wait(duration);
    
    // Clean up after animation
    dispatch({
      statusBarStyle: newTheme === 'light' ? 'dark' : 'light',
      active: false,
      theme: newTheme,
      overlay1: null,
      overlay2: null,
    });
  }, [theme, active, circle, transition]);

  // The context value
  const contextValue = {
    theme,
    toggleTheme,
    colors,
    active
  };
  
  return (
    <View style={{ flex: 1 }}>
      <StatusBar style={statusBarStyle} />
      <View style={{ flex: 1 }} collapsable={false} ref={viewRef}>
        <ThemeContext.Provider value={contextValue}>
          {children}
        </ThemeContext.Provider>
      </View>
      {overlay1 && (
        <Canvas
          style={StyleSheet.absoluteFill}
          pointerEvents={'none'}
        >
          <Image image={overlay1} x={0} y={0} width={width} height={height} />
          {overlay2 && (
            <Circle c={circle} r={r}>
              <ImageShader
                image={overlay2}
                x={0}
                y={0}
                width={width}
                height={height}
                fit={'cover'}
              />
            </Circle>
          )}
        </Canvas>
      )}
    </View>
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
