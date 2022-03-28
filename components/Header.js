import { Pacifico_400Regular, useFonts } from '@expo-google-fonts/pacifico';
import AppLoading from 'expo-app-loading';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#312e2e',
    borderRadius: 4,
  },
  container: {
    paddingBottom: 6,
  },
  label: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#cfcc19',
    fontFamily: 'Pacifico_400Regular',
  },
});

export default function Header(props) {
  const [fontsLoaded] = useFonts({
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
