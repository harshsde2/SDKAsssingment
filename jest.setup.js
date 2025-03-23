// Mock FormData for React Native tests
global.FormData = class {
  append = jest.fn();
};

// Mock other necessary browser/React Native APIs
global.fetch = jest.fn();
global.Image = class {};

// Mock react-native modules that aren't available in the test environment
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

// Mock expo-router module
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    navigate: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({
    name: 'Test User',
    email: 'test@example.com',
  }),
}));

// Mock StatusBar component
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

// Mock Ionicons component
jest.mock('@expo/vector-icons', () => ({
  Ionicons: 'Ionicons',
})); 