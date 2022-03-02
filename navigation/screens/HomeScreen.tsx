import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text
        onPress={() => alert('This is the home screen')}
        style={{ fontSize: 26, fontWeight: 'bold' }}
      >
        Home Screen
      </Text>
      <Button
        title="Hello"
        onPress={async () => {
          const signupResponse = await fetch('https://example.com/');

          console.log('df', JSON.stringify(signupResponse));
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
