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
import { IP } from './SignupScreen';

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
    <ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.mainContainer}>
          <Input
            autoCompleteType={undefined}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          <Input
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
                  `http://${IP}:3000/api/login`,
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

                if ('errors' in loginResponseBody) {
                  setErrors(loginResponseBody.errors);
                  return;
                }
                // set User Info and Provider Rating
                setUser(loginResponseBody.user);
                if (!loginResponseBody.provider) {
                  return;
                }
                setRating(loginResponseBody.provider);
                // console.log('login', loginResponse);
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
