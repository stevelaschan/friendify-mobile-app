import styled from '@emotion/native';
import { useState } from 'react';
import { View } from 'react-native';

const LoginText = styled.Text`
  justify-content: center;
  margin-left: 24px;
  margin-top: 18px;
`;

const LoginInput = styled.TextInput`
  border: 2px solid black;
  margin: 12px 24px;
  padding: 4px;
`;

const PasswordText = styled.Text`
  justify-content: center;
  margin-left: 24px;
`;

const PasswordInput = styled.TextInput`
  border: 2px solid black;
  margin: 12px 24px;
  padding: 4px;
`;

const LoginButton = styled.Button`
  border: 2px solid black;
`;

const SignupButton = styled.Button`
  border: 2px solid black;
`;

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function login() {
    if (username === 'steve' && password === 'steve') {
      setUsername(username);
      setPassword(password);
      return true;
    } else {
      return false;
    }
  }

  return (
    <View>
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
        onPress={() =>
          login() ? navigation.navigate('Home') : alert('Password incorrect')
        }
      />
      <SignupButton
        title="Sign up"
        onPress={() => navigation.navigate('SignupStack')}
      />
    </View>
  );
}
