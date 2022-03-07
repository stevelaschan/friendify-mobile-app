import { useCallback, useContext, useState } from 'react';
import {
  Button,
  GestureResponderEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

export default function ProfileScreen() {
  const { setIsSignedIn, userFirstName, userLastName, userAge } =
    useContext(LoginContext);

  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 32 }}>
          Profile Screen
        </Text>
        <Text style={styles.text}>{userFirstName}</Text>
        <Text style={styles.text}>{userLastName}</Text>
        <Text style={styles.text}>{userAge}</Text>
        <Button
          title="Logout"
          onPress={async (event: GestureResponderEvent) => {
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
    </ScrollView>
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
