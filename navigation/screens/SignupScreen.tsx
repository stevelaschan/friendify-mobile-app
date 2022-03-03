import styled from '@emotion/native';
import { useState } from 'react';
import { Text, View } from 'react-native';

const SignupPageText = styled.Text`
  font-size: 48px;
  margin-left: 114px;
  margin-top: 72px;
`;

const SignupText = styled.Text`
  justify-content: center;
  margin-left: 144px;
  margin-top: 60px;
  font-size: 18px;
`;

const SignupInput = styled.TextInput`
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

const SignupButton = styled.Button`
  border: 2px solid black;
`;

type Errors = { message: string }[];

export const IP = '192.168.1.224';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Errors>([]);

  return (
    <View>
      <SignupPageText>Signup</SignupPageText>
      <SignupText>Username</SignupText>
      <SignupInput value={username} onChangeText={setUsername} />
      <PasswordText>Password</PasswordText>
      <PasswordInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <SignupButton
        title="Signup"
        onPress={async (event) => {
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
              }),
            },
          );

          const signupResponseBody = await signupResponse.json();

          if ('errors' in signupResponseBody) {
            setErrors(signupResponseBody.errors);
            return;
          }

          await navigation.navigate('Home');
        }}
      />
      <View>
        {errors.map((error) => {
          return <Text key={`error-${error.message}`}>{error.message}</Text>;
        })}
      </View>
    </View>
  );
}
