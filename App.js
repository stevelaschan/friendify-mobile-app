import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import TabsContainer from './navigation/TabsContainer';

export default function App() {
  return (
    <NavigationContainer>
      <TabsContainer />
    </NavigationContainer>
  );
}
