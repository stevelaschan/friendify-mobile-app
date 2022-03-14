import { useCallback, useContext, useEffect, useState } from 'react';
import {
  Button,
  GestureResponderEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

export default function ProfileScreen() {
  const [sports, setSports] = useState<boolean>(false);
  const [walking, setWalking] = useState<boolean>(false);
  const [talking, setTalking] = useState<boolean>(false);
  const [diningOut, setDiningOut] = useState<boolean>(false);
  const [attendingEvents, setAttendingEvents] = useState<boolean>(false);
  const { user, setUser } = useContext(LoginContext);

  // refresh page on drag down
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
        <Text style={styles.text}>First name: {user.firstName}</Text>
        <Text style={styles.text}>Last name: {user.lastName}</Text>
        <Text style={styles.text}>Age: {user.age}</Text>
        <CheckBox
          title="Sports"
          checked={sports}
          onPress={() => setSports(!sports)}
        />
        <CheckBox
          title="Walking"
          checked={walking}
          onPress={() => setWalking(!walking)}
        />
        <CheckBox
          title="Talking"
          checked={talking}
          onPress={() => setTalking(!talking)}
        />
        <CheckBox
          title="Dining out"
          checked={diningOut}
          onPress={() => setDiningOut(!diningOut)}
        />
        <CheckBox
          title="Attending Events"
          checked={attendingEvents}
          onPress={() => setAttendingEvents(!attendingEvents)}
        />
        <Button
          title="Logout"
          onPress={async (event: GestureResponderEvent) => {
            event.preventDefault();
            await fetch(
              // use IP address instead of localhost
              `http://${IP}:3000/api/logout`,
              {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              },
            );
            setUser(undefined);
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
    marginTop: 22,
  },
  text: {
    fontSize: 18,
  },
});
