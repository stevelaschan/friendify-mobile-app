import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Header from './components/Header';
import TabsContainer from './navigation/TabsContainer';

export default function App() {
  return (
    <NavigationContainer>
      <Header label="Friendify" />
      <TabsContainer />
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#3A3A3A',
//   },
// });
