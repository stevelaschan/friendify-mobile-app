import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import Tabs from './navigation/Tabs';

export default function App() {
  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}
