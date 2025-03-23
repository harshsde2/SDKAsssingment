import React from 'react';
import { Text } from 'react-native';

describe('SDK Tests', () => {
  it('should pass basic test', () => {
    expect(true).toBe(true);
  });
  
  it('should render a Text component', () => {
    const testMessage = 'Test Message';
    const component = <Text>{testMessage}</Text>;
    expect(component.props.children).toBe(testMessage);
  });
}); 