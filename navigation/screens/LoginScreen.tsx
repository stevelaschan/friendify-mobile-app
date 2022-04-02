import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useContext, useState } from 'react';
import {
  GestureResponderEvent,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import { RootStackParams } from '../../App';
import { LoginContext } from '../../context/LoginContext';
import { url } from './SignupScreen';

type Errors = { message: string }[];

type SignupScreenProps = NativeStackScreenProps<
  RootStackParams,
  'SignupScreen'
>;

export default function LoginScreen({ navigation }: SignupScreenProps) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>([]);
  const { setUser, setRating, setReservedTimeslots } = useContext(LoginContext);

  return (
    <ScrollView style={{ backgroundColor: '#121212' }}>
      <KeyboardAvoidingView>
        <View style={styles.mainContainer}>
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
            errorStyle={{ color: 'red' }}
            errorMessage={errors.map((error) => {
              // if username or password invalid return error message
              return (
                <Text key={`error-${error.message}`}>{error.message}</Text>
              );
            })}
          />
          <View style={styles.buttonsContainer}>
            <Button
              title="Login"
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              onPress={async (event: GestureResponderEvent) => {
                // send username and password to api and database
                event.preventDefault();
                const loginResponse = await fetch(
                  // use IP address instead of localhost
                  `${url}/api/login`,
                  {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      username: username,
                      password: password,
                    }),
                  },
                );

                const loginResponseBody = await loginResponse.json();
                setRating(loginResponseBody.provider);

                if ('errors' in loginResponseBody) {
                  setErrors(loginResponseBody.errors);
                  return;
                }
                setUser(loginResponseBody.user);
                setReservedTimeslots(loginResponseBody.timeslots);
              }}
            />
            <Button
              title="Sign up"
              buttonStyle={styles.button}
              containerStyle={styles.buttonContainer}
              onPress={() => navigation.navigate('SignupScreen')}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: 128,
  },
  buttonsContainer: {
    marginLeft: 36,
    marginTop: 24,
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
  },
});
