import { useContext, useState } from 'react';
import {
  Button,
  GestureResponderEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { AirbnbRating, CheckBox, Input } from 'react-native-elements';
import { LoginContext } from '../../context/LoginContext';
import { url } from './SignupScreen';

export default function ProfileScreen() {
  const { user, setUser, rating } = useContext(LoginContext);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editShortDescription, setEditShortDescription] = useState('');
  const [editable, setEditable] = useState(false);
  const [isProvider, setIsProvider] = useState(user.isProvider);

  return (
    <ScrollView style={{ backgroundColor: '#121212' }}>
      <View style={styles.container}>
        <Text style={styles.text}>{user.username}</Text>
        <Input
          autoCompleteType={undefined}
          onChangeText={setEditFirstName}
          value={editable ? editFirstName : user.firstName}
          editable={editable}
          style={styles.input}
        />
        <Input
          autoCompleteType={undefined}
          onChangeText={setEditLastName}
          value={editable ? editLastName : user.lastName}
          editable={editable}
          style={styles.input}
        />
        <Input
          autoCompleteType={undefined}
          onChangeText={setEditAge}
          value={editable ? editAge.toString() : user.age.toString()}
          editable={editable}
          style={styles.input}
          keyboardType="numeric"
        />
        <Input
          autoCompleteType={undefined}
          multiline={true}
          numberOfLines={6}
          onChangeText={setEditShortDescription}
          value={editable ? editShortDescription : user.shortDescription}
          editable={editable}
          style={styles.input}
        />
        <View style={styles.checkbox}>
          <CheckBox
            title="Experience Provider"
            checked={isProvider}
            onPress={() => setIsProvider(!isProvider)}
            disabled={!editable}
            containerStyle={{ backgroundColor: '#121212', borderRadius: 8 }}
            textStyle={{ color: 'white' }}
          />
        </View>
        {isProvider ? (
          <View style={styles.stars}>
            <AirbnbRating
              defaultRating={!rating ? 0 : rating}
              showRating={false}
              isDisabled={true}
            />
          </View>
        ) : (
          <View />
        )}
        {editable ? (
          <Button
            title="Save Information"
            onPress={async (event: GestureResponderEvent) => {
              event.preventDefault();
              const updateProfile = await fetch(`${url}/api/updateProfile`, {
                method: 'PUT',
                body: JSON.stringify({
                  username: user.username,
                  firstName: editFirstName,
                  lastName: editLastName,
                  age: editAge,
                  shortDescription: editShortDescription,
                  isProvider: isProvider,
                }),
              });
              const updatedProfile = await updateProfile.json();
              setUser({
                username: user.username,
                firstName: updatedProfile.firstName,
                lastName: updatedProfile.lastName,
                age: updatedProfile.age,
                shortDescription: updatedProfile.shortDescription,
                isProvider: isProvider,
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
        <View style={{ marginBottom: 24 }}>
          <Button
            title="Logout"
            onPress={async (event: GestureResponderEvent) => {
              event.preventDefault();
              await fetch(`${url}/api/logout`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });
              setUser(undefined);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 32,
  },
  text: {
    fontSize: 28,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginTop: 8,
    color: 'white',
  },
  input: {
    margin: 6,
    color: 'white',
  },
  stars: {
    margin: 18,
  },
  checkbox: {
    flex: 1,
    justifyContent: 'center',
  },
});
