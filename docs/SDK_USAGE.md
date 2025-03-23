# UI SDK Integration Guide

This document provides instructions on how to integrate the UI SDK into your React Native application.

## Installation

First, add the SDK to your project:

```bash
npm install ui-sdk  # Replace with the actual package name
```

## Basic Integration

### 1. Initialize the SDK

Import and initialize the SDK in your application:

```javascript
import initializeSdk from 'ui-sdk';

// Initialize with configuration
const sdk = initializeSdk({
  apiKey: 'your-api-key', // Optional API key
  theme: 'light', // or 'dark'
});
```

### 2. Render the Form UI

Use the SDK to render the form UI in your component:

```javascript
import React from 'react';
import { View } from 'react-native';
import initializeSdk from 'ui-sdk';

function MyFormScreen() {
  const sdk = initializeSdk({ theme: 'light' });
  
  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
    // Process the submitted data
  };
  
  return (
    <View style={{ flex: 1 }}>
      {sdk.renderForm({ onSubmit: handleFormSubmit })}
    </View>
  );
}
```

### 3. Handle Form Submissions

The SDK provides a callback for form submissions:

```javascript
const handleFormSubmit = (data) => {
  // data contains:
  // - name: string
  // - email: string
  
  // Perform your own actions with the submitted data
  saveToDatabase(data);
  navigateToNextScreen();
};
```

## Advanced Usage

### Theme Configuration

The SDK supports both light and dark themes:

```javascript
// Light theme
const lightSdk = initializeSdk({ theme: 'light' });

// Dark theme
const darkSdk = initializeSdk({ theme: 'dark' });

// System default
const sdk = initializeSdk({}); // Will use system setting
```
```

## Key Differences from the UI App

The SDK version has several key differences from the original UI app:

1. **No Direct Navigation**: The SDK doesn't handle navigation itself - instead it notifies the parent app via callbacks

2. **Configuration Options**: The SDK can be configured with options like theme and API key

3. **Self-Contained**: The SDK doesn't depend on the app's context or state management

4. **Reusable Interface**: The SDK exposes a clean, documented API for integration

## Step 3 Complete

You've now successfully created an SDK by:
1. Extracting the UI components
2. Creating a self-contained context system
3. Providing a clean API for initialization and usage
4. Documenting how to use the SDK

In Step 4, we'll create a second React Native app (Integration App) that uses this SDK.