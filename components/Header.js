import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function Header(props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.label}>{props.label}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#383838',
  },
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 15,
  },
  label: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
