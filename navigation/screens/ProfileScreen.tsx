import { useCallback, useContext, useEffect, useState } from 'react';
import {
  Button,
  GestureResponderEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

export default function ProfileScreen() {
  // const [sports, setSports] = useState<boolean>(false);
  // const [walking, setWalking] = useState<boolean>(false);
  // const [talking, setTalking] = useState<boolean>(false);
  // const [diningOut, setDiningOut] = useState<boolean>(false);
  // const [attendingEvents, setAttendingEvents] = useState<boolean>(false);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editShortDescription, setEditShortDescription] = useState('');
  const [editable, setEditable] = useState(false);
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
        <Text style={styles.text}>{user.username}</Text>
        <TextInput
          onChangeText={setEditFirstName}
          value={editable ? editFirstName : user.firstName}
          editable={editable}
          style={styles.input}
        />
        <TextInput
          onChangeText={setEditLastName}
          value={editable ? editLastName : user.lastName}
          editable={editable}
          style={styles.input}
        />
        <TextInput
          onChangeText={setEditAge}
          value={editable ? editAge.toString() : user.age.toString()}
          editable={editable}
          style={styles.input}
          keyboardType="numeric"
        />
        <TextInput
          onChangeText={setEditShortDescription}
          value={editable ? editShortDescription : user.shortDescription}
          editable={editable}
          style={styles.input}
        />
        {/* <CheckBox
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
        /> */}
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
        {editable ? (
          <Button
            title="Save Information"
            onPress={async (event: GestureResponderEvent) => {
              event.preventDefault();
              const updateProfile = await fetch(
                // use IP address instead of localhost
                `http://${IP}:3000/api/updateProfile`,
                {
                  method: 'PUT',
                  body: JSON.stringify({
                    username: user.username,
                    firstName: editFirstName,
                    lastName: editLastName,
                    age: editAge,
                    shortDescription: editShortDescription,
                  }),
                },
              );
              const updatedProfile = await updateProfile.json();
              setUser({
                username: user.username,
                firstName: updatedProfile.firstName,
                lastName: updatedProfile.lastName,
                age: updatedProfile.age,
                shortDescription: updatedProfile.shortDescription,
              });
              setEditable(false);
            }}
          />
        ) : (
          <Button
            title="Edit Information"
            onPress={() => {
              setEditFirstName(user.firstName);
              setEditLastName(user.lastName);
              setEditAge(user.age);
              setEditShortDescription(user.shortDescription);
              setEditable(true);
            }}
          />
        )}
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
