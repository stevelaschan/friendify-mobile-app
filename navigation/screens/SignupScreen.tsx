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

export const IP = '192.168.1.224';

export default function SignupScreen() {
  const { setUser } = useContext(LoginContext);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [errors, setErrors] = useState<Errors>([]);
  const [isProvider, setIsProvider] = useState<boolean>(false);

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding" style={styles.mainContainer}>
        <Input
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Input
          placeholder="First Name"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
        />
        <Input
          placeholder="Last Name"
          value={lastName}
          onChangeText={setLastName}
        />
        <Input
          placeholder="Age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />
        <Input
          placeholder="Short Description Of Yourself"
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
        />
        <Button
          title="Signup"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={async (event: GestureResponderEvent) => {
            event.preventDefault();

            const signupResponse = await fetch(
              // use IP address instead of localhost (IP address changes)
              `http://${IP}:3000/api/signup`,
              {
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
              },
            );

            const signupResponseBody = await signupResponse.json();

            if ('errors' in signupResponseBody) {
              setErrors(signupResponseBody.errors);
              return;
            }
            setUser(signupResponseBody.user);
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
    backgroundColor: 'rgba(18, 57, 162, 0.8)',
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
