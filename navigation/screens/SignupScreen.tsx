import { useContext, useState } from 'react';
import {
  GestureResponderEvent,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { Button, CheckBox, Input } from 'react-native-elements';
import { LoginContext } from '../../context/LoginContext';

type Errors = { message: string }[];

export const url = 'https://friendify-backend.herokuapp.com';

export default function SignupScreen() {
  const { setUser, setRating } = useContext(LoginContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [errors, setErrors] = useState<Errors>([]);
  const [isProvider, setIsProvider] = useState<boolean>(false);

  return (
    <ScrollView style={{ backgroundColor: '#121212' }}>
      <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
        <Input
          inputStyle={{ color: 'white' }}
          autoCompleteType={undefined}
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />
        <Input
          inputStyle={{ color: 'white' }}
          autoCompleteType={undefined}
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <Input
          inputStyle={{ color: 'white' }}
          autoCompleteType={undefined}
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <Input
          inputStyle={{ color: 'white' }}
          autoCompleteType={undefined}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          inputStyle={{ color: 'white' }}
          autoCompleteType={undefined}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          inputStyle={{ color: 'white', paddingBottom: 24 }}
          multiline={true}
          numberOfLines={6}
          autoCompleteType={undefined}
          placeholder="If you are a provider, what experience do you provide? Write a short description of yourself."
          value={shortDescription}
          onChangeText={setShortDescription}
          errorMessage={errors.map((error) => {
            return <Text key={`error-${error.message}`}>{error.message}</Text>;
          })}
        />
        <CheckBox
          title="Experience Provider"
          checked={isProvider}
          onPress={() => setIsProvider(!isProvider)}
          containerStyle={{
            backgroundColor: '#121212',
            borderRadius: 8,
            marginBottom: 48,
          }}
          textStyle={{ color: 'white' }}
        />
        <Button
          title="Signup"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={async (event: GestureResponderEvent) => {
            event.preventDefault();

            const response = await fetch(`${url}/api/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                username: username,
                password: password,
                firstName: firstName,
                lastName: lastName,
                age: age,
                shortDescription: shortDescription,
                isProvider: isProvider,
              }),
            });

            const data = await response.json();

            if ('errors' in data) {
              setErrors(data.errors);
              return;
            }
            setUser(data.user);
            setRating(0);
          }}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: 28,
  },
  button: {
    backgroundColor: '#0A7EC3',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
  buttonContainer: {
    width: 200,
    marginHorizontal: 50,
    marginVertical: 10,
    marginLeft: 84,
  },
});
