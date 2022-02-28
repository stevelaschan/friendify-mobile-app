import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import AppLoading from 'expo-app-loading';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Header(props) {
  let [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Text style={styles.label}>{props.label}</Text>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#383838',
  },
  container: {
    paddingTop: 18,
    paddingBottom: 18,
  },
  label: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
    fontFamily: 'Pacifico_400Regular',
  },
});
