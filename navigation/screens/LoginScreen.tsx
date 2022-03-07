import styled from '@emotion/native';
import { useContext, useState } from 'react';
import {
  Button,
  GestureResponderEvent,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

const LoginPageText = styled.Text`
  font-size: 48px;
  margin-left: 128px;
  margin-top: 48px;
  margin-bottom: 44px;
`;

const LoginText = styled.Text`
  justify-content: center;
  margin-left: 144px;
  margin-top: 16px;
  font-size: 18px;
`;

const LoginInput = styled.TextInput`
  border: 2px solid black;
  margin: 12px 48px;
  padding: 4px;
  border-radius: 6px;
  font-size: 16px;
`;

type Errors = { message: string }[];

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>([]);
  const { setIsSignedIn } = useContext(LoginContext);

  return (
    <ScrollView>
      <KeyboardAvoidingView>
        <LoginPageText>Login</LoginPageText>
        <LoginText>Username</LoginText>
        <LoginInput value={username} onChangeText={setUsername} />
        <LoginText>Password</LoginText>
        <LoginInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button
          title="Login"
          onPress={async (event: GestureResponderEvent) => {
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
            setIsSignedIn(true);
          }}
        />
        <Button
          title="Sign up"
          onPress={() => navigation.navigate('SignupScreen')}
        />
        <View>
          {errors.map((error) => {
            return <Text key={`error-${error.message}`}>{error.message}</Text>;
          })}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#3A3A3A',
//   },
// });
