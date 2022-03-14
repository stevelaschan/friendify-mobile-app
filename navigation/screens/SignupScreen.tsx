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
import { Input } from 'react-native-elements';
import { LoginContext } from '../../context/LoginContext';

// const SignupPageText = styled.Text`
//   font-size: 48px;
//   margin-left: 114px;
//   margin-top: 48px;
//   margin-bottom: 44px;
// `;

// const SignupText = styled.Text`
//   justify-content: center;
//   margin-left: 50px;
//   margin-top: 16px;
//   font-size: 18px;
// `;

// const SignupInput = styled.TextInput`
//   border: 2px solid black;
//   margin: 12px 48px;
//   padding: 4px;
//   border-radius: 6px;
//   font-size: 16px;
// `;

type Errors = { message: string }[];

export const IP = '192.168.1.224';

export default function SignupScreen() {
  const [username, setUsername] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<Errors>([]);
  const { setUser } = useContext(LoginContext);

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="padding">
        {/* <SignupPageText>Signup</SignupPageText>
        <SignupText>First Name</SignupText>
        <SignupInput
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="words"
          autoFocus={true}
        />
        <SignupText>Last Name</SignupText>
        <SignupInput
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="words"
        />
        <SignupText>Age</SignupText>
        <SignupInput value={age} onChangeText={setAge} keyboardType="numeric" />
        <SignupText>Username</SignupText>
        <SignupInput value={username} onChangeText={setUsername} />
        <SignupText>Password</SignupText>
        <SignupInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        /> */}
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
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <Input
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <Button
          title="Signup"
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
                  firstName: firstName,
                  lastName: lastName,
                  age: age,
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
            setUser(signupResponseBody.user);
          }}
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
