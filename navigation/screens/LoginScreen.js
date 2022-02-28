import { styled } from '@emotion/native';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Header from '../components/Header';

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

export default function LoginScreen({ navigation }) {
  return (
    <View>
      <Header label="Friendify" />
      <LoginText>Login</LoginText>
      <LoginInput />
      <PasswordText>Password</PasswordText>
      <PasswordInput />
      <LoginButton title="Login" onPress={() => navigation.navigate('Home')} />
      <StatusBar style="auto" />
    </View>
  );
}
