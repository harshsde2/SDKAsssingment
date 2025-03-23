# UI SDK Documentation

## Overview

This SDK provides reusable UI components for React Native applications, specifically focused on form functionality with theme support. It allows you to easily add professionally designed and validated forms to your app.

## Installation

To install the SDK in your React Native project:

```bash
npm install @yourusername/react-native-ui-sdk
# or
yarn add @yourusername/react-native-ui-sdk
```

## Quick Start

```javascript
import React from 'react';
import { View, Alert } from 'react-native';
import initializeSdk from '@yourusername/react-native-ui-sdk';

export default function MyScreen() {
  // Initialize the SDK with options
  const sdk = initializeSdk({ 
    theme: 'light', 
    apiKey: 'your-api-key' 
  });
  
  // Handle form submission
  const handleFormSubmit = (data) => {
    Alert.alert('Form Submitted', `Name: ${data.name}\nEmail: ${data.email}`);
  };
  
  // Render the form
  return (
    <View style={{ flex: 1 }}>
      {sdk.renderForm({ onSubmit: handleFormSubmit })}
    </View>
  );
}
```

## API Reference

### `initializeSdk(config)`

Initialize the SDK with configuration options.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| config | Object | Yes | Configuration object |
| config.theme | 'light' \| 'dark' | No | UI theme (defaults to system preference) |
| config.apiKey | string | No | API key for future functionality |

**Returns:**

An SDK instance with the following methods:

| Method | Description |
|--------|-------------|
| renderForm(options) | Renders a form component |

### `renderForm(options)`

Renders a form component with name and email fields.

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| options | Object | Yes | Form options |
| options.onSubmit | Function | No | Callback when form is submitted |

**Callback Parameters:**

The onSubmit callback receives a data object with:

| Property | Type | Description |
|----------|------|-------------|
| name | string | User's name |
| email | string | User's email |

## Theme Support

The SDK supports both light and dark themes:

```javascript
// Light theme
const lightSdk = initializeSdk({ theme: 'light' });

// Dark theme
const darkSdk = initializeSdk({ theme: 'dark' });

// System theme (default)
const systemSdk = initializeSdk({});
```

## Form Validation

The form component includes built-in validation:

- Name field is required
- Email field is required and must be valid email format

Error messages are displayed automatically under the relevant fields.

## Example Projects

See the following examples for implementation details:

- `/integrationApp` - Sample app showing SDK integration

## Troubleshooting

### Common Issues

1. **Theme not working correctly**
   - Make sure you're passing a valid theme value ('light' or 'dark')
   - Check if your app has other theme providers that might conflict

2. **Form submission not working**
   - Verify your onSubmit callback is properly defined
   - Check for validation errors preventing submission

## Contributing

Contributions are welcome! Please see CONTRIBUTING.md for details.

## License

MIT 