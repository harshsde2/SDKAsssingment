# React Native SDK Assignment

This project demonstrates the creation of a React Native app, its conversion into a reusable SDK, and integration of that SDK into another React Native application.

## Project Structure

The project consists of three main parts:

1. **UI App** - The main React Native app that includes UI components
2. **SDK Package** - The extracted components packaged as a reusable SDK
3. **Integration App** - A separate app that demonstrates SDK integration

## Features

- Form component with validation
- Theme support (light and dark modes)
- Cross-app component reusability
- TypeScript for type safety
- Jest tests for SDK components

## Technology Stack

- React Native with Expo
- TypeScript
- Expo Router for navigation
- Context API for state management
- Jest and React Testing Library for tests

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn or npm
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd SDKAssignment
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on iOS or Android:
   ```bash
   # For iOS
   npx expo run:ios
   
   # For Android
   npx expo run:android
   ```

## App Structure

### Main UI App (`/app` directory)
- `_layout.tsx` - Navigation setup with theme support
- `index.tsx` - Home screen with welcome message
- `form.tsx` - Form screen with name and email inputs
- `results.tsx` - Display submitted form data

### SDK Package (`/sdk` directory)
- `index.tsx` - SDK entry point and exports
- `components/FormScreen.tsx` - Form UI component
- `context/SdkContext.tsx` - SDK state management

### Integration App (`/integrationApp` directory)
- Demonstrates using the SDK in a separate application
- Shows how to initialize the SDK and handle its callbacks

## SDK Usage

To use the SDK in your own project:

```javascript
import initializeSdk from 'sdk-package';

function MyScreen() {
  // Initialize the SDK with options
  const sdk = initializeSdk({ 
    theme: 'light',  // or 'dark'
    apiKey: 'your-api-key' // optional
  });
  
  // Handle form submission
  const handleFormSubmit = (data) => {
    console.log('Form submitted:', data);
    // Process the data
  };
  
  return (
    <View style={{ flex: 1 }}>
      {sdk.renderForm({ onSubmit: handleFormSubmit })}
    </View>
  );
}
```

## Testing

Run unit tests:

```bash
npm test
```

The project includes:
- Basic unit tests to demonstrate testing principles
- More comprehensive tests would typically be added for production applications

The SDK was designed with testability in mind, using:
- Clear component boundaries
- Dependency injection through context
- Props-based configuration

## Customizing the SDK

The SDK supports these customization options:

- Theme: 'light' or 'dark'
- Form submission callback
- API key for future authentication

## License

MIT
# SDKAsssingment
