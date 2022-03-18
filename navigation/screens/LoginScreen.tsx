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
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

type Errors = { message: string }[];

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>([]);
  const { setUser, setRating, rating } = useContext(LoginContext);

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <View style={styles.mainContainer}>
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
                const providerRating = loginResponseBody.provider.map(
                  (object) => object.rating,
                );
                const sumProviderRating = providerRating.reduce(
                  (a: number, b: number) => a + b,
                  0,
                );
                const sumProviderRatingAverage =
                  sumProviderRating / providerRating.length;
                setRating(sumProviderRatingAverage);
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
