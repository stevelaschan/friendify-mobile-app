import Cookies from 'js-cookie';
import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { IP } from './SignupScreen';

// export function getParsedCookie(key: string) {
//   try {
//     return JSON.parse(Cookies.get(key));
//   } catch (err) {
//     return undefined;
//   }
// }

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Profile Screen</Text>
      <Button
        title="Logout"
        onPress={async (event) => {
          event.preventDefault();
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
          await logoutResponse.json();
          navigation.navigate('LoginStack');
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
