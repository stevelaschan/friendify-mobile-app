import styled from '@emotion/native';
import { useContext, useState } from 'react';
import { Text, View } from 'react-native';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

const LoginPageText = styled.Text`
  font-size: 48px;
  margin-left: 128px;
  margin-top: 72px;
`;

const LoginText = styled.Text`
  justify-content: center;
  margin-left: 144px;
  margin-top: 60px;
  font-size: 18px;
`;

const LoginInput = styled.TextInput`
  border: 2px solid black;
  margin: 12px 48px;
  padding: 4px;
  border-radius: 6px;
  font-size: 16px;
`;

const PasswordText = styled.Text`
  justify-content: center;
  margin-left: 144px;
  margin-top: 18px;
  font-size: 18px;
`;

const PasswordInput = styled.TextInput`
  border: 2px solid black;
  margin: 12px 48px;
  padding: 4px;
  border-radius: 6px;
  font-size: 16px;
`;

const LoginButton = styled.Button`
  border: 2px solid black;
`;

const SignupButton = styled.Button`
  border: 2px solid black;
`;

type Errors = { message: string }[];

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);
  const { setIsSignedIn } = useContext(LoginContext);

  return (
    <View>
      <LoginPageText>Login</LoginPageText>
      <LoginText>Username</LoginText>
      <LoginInput value={username} onChangeText={setUsername} />
      <PasswordText>Password</PasswordText>
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <LoginButton
        title="Login"
        onPress={async (event) => {
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
          setErrors([]); // clear the errors - maybe not necessary with redirect
          setIsSignedIn(true);
        }}
      />
      <SignupButton
        title="Sign up"
        onPress={() => navigation.navigate('SignupScreen')}
      />
      <View>
        {errors.map((error) => {
          return <Text key={`error-${error.message}`}>{error.message}</Text>;
        })}
      </View>
    </View>
  );
}
