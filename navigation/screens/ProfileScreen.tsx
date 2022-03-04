import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { IP } from './SignupScreen';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Profile Screen</Text>
      <Button
        title="Logout"
        onPress={async (event) => {
          event.preventDefault();
          navigation.navigate('Login');
          const logoutResponse = await fetch(
            // use IP address instead of localhost
            `http://${IP}:3000/api/logout`,
            {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          const logoutResponseBody = await logoutResponse.json();
          console.log(logoutResponseBody);
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
