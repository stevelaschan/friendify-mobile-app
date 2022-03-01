import { styled } from '@emotion/native';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import Header from '../components/Header';

const UsernameText = styled.Text`
  justify-content: center;
  margin-left: 24px;
  margin-top: 18px;
`;

const UsernameInput = styled.TextInput`
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

const SignupButton = styled.Button`
  border: 2px solid black;
`;

export default function SignupScreen() {
  return (
    <View>
      <Header label="Friendify" />
      <UsernameText>Username</UsernameText>
      <UsernameInput />
      <PasswordText>Password</PasswordText>
      <PasswordInput />
      <SignupButton title="Signup" />
      <StatusBar style="auto" />
    </View>
  );
}
