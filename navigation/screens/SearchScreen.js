import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SearchScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => navigation.navigate('Home')}
        style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}
      >
        Search Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#383838',
  },
});
