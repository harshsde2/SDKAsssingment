import React from 'react';
import FormScreen from './components/FormScreen';
import { SdkProvider, useSdk } from './context/SdkContext';

export {
  FormScreen,
  SdkProvider,
  useSdk
};

// Main SDK initialization function
export default function initializeSdk(config: { apiKey?: string; theme?: 'light' | 'dark' }) {
  return {
    // Method to render the form UI
    renderForm: ({ onSubmit }: { onSubmit?: (data: { name: string; email: string }) => void }) => {
      return (
        <SdkProvider 
          config={{
            apiKey: config.apiKey || '',
            theme: config.theme || 'light',
            onSubmit: onSubmit,
          }}
        >
          <FormScreen />
        </SdkProvider>
      );
    }
  };
}
