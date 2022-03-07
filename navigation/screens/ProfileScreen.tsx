import { useContext, useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

export default function ProfileScreen({ navigation }) {
  const [userFirstName, setUserFirstName] = useState('');
  const [userLastName, setUserLastName] = useState('');
  const [userAge, setUserAge] = useState('');
  const { setIsSignedIn } = useContext(LoginContext);

  useEffect(() => {
    getUserByValidSessionToken();
  }, []);

  const getUserByValidSessionToken = async () => {
    // event.preventDefault();
    const protectedUserResponse = await fetch(
      // use IP address instead of localhost
      `http://${IP}:3000/api/protectedUser`,
      {
        method: 'GET',
      },
    );
    const protectedUserResponseJson = await protectedUserResponse.json();
    setUserFirstName(protectedUserResponseJson.user.firstName);
    setUserLastName(protectedUserResponseJson.user.lastName);
    setUserAge(protectedUserResponseJson.user.age);
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 32 }}>
        Profile Screen
      </Text>
      <Text style={styles.text}>{userFirstName}</Text>
      <Text style={styles.text}>{userLastName}</Text>
      <Text style={styles.text}>{userAge}</Text>
      <Button
        title="Logout"
        onPress={async (event) => {
          event.preventDefault();
          setIsSignedIn(false);
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
        }}
      />
      <Button title="Edit Information" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 22,
  },
  text: {
    fontSize: 18,
  },
});
