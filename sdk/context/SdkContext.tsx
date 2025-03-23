import React, { createContext, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

interface SdkConfig {
  apiKey: string;
  theme: 'light' | 'dark';
  onSubmit?: (data: { name: string; email: string }) => void;
}

interface SdkContextType {
  config: SdkConfig;
  formData: { name: string; email: string };
  setFormData: React.Dispatch<React.SetStateAction<{ name: string; email: string }>>;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    card: string;
  };
  submitForm: () => void;
}

const SdkContext = createContext<SdkContextType | undefined>(undefined);

export const SdkProvider: React.FC<{ 
  children: React.ReactNode, 
  config: SdkConfig 
}> = ({ children, config }) => {
  const systemColorScheme = useColorScheme();
  const [formData, setFormData] = useState({ name: '', email: '' });
  
  const theme = config.theme || systemColorScheme || 'light';
  
  const colors = {
    background: theme === 'light' ? '#ffffff' : '#000000',
    text: theme === 'light' ? '#000000' : '#ffffff',
    primary: '#b1ff84',
    secondary: theme === 'light' ? '#f0f0f0' : '#333333',
    card: theme === 'light' ? '#ffffff' : '#1a1a1a',
  };
  
  const submitForm = () => {
    if (config.onSubmit) {
      config.onSubmit(formData);
    }
  };
  
  return (
    <SdkContext.Provider 
      value={{ 
        config, 
        formData, 
        setFormData, 
        colors, 
        submitForm 
      }}
    >
      {children}
    </SdkContext.Provider>
  );
};

export const useSdk = (): SdkContextType => {
  const context = useContext(SdkContext);
  if (!context) {
    throw new Error('useSdk must be used within a SdkProvider');
  }
  return context;
};
