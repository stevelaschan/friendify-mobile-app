// import styled from '@emotion/native';
import { useEffect, useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

// const SignupText = styled.Text`
//   justify-content: center;
//   margin-left: 24px;
//   margin-top: 18px;
// `;

// const SignupInput = styled.TextInput`
//   border: 2px solid black;
//   margin: 12px 24px;
//   padding: 4px;
// `;

// const PasswordText = styled.Text`
//   justify-content: center;
//   margin-left: 24px;
// `;

// const PasswordInput = styled.TextInput`
//   border: 2px solid black;
//   margin: 12px 24px;
//   padding: 4px;
// `;

// const SignupButton = styled.Button`
//   border: 2px solid black;
// `;

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState([]);
  // const [response, setResponse] = useState('');

  return (
    <View>
      <Text>Username</Text>
      <TextInput value={username} onChangeText={setUsername} />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button
        title="Signup"
        onPress={async (event) => {
          event.preventDefault();

          const signupResponse = await fetch(
            'http://192.168.1.224:3000/api/signup',
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

          // const signupResponseBody = await signupResponse.json();

          // if ('errors' in signupResponseBody) {
          //   setErrors(signupResponseBody.errors);
          //   return;
          // }

          await navigation.navigate('Home');
        }}
      />
      {/* {errors.map((error) => {
        return <View key={`error-${error.message}`}>{error.message}</View>;
      })} */}
    </View>
  );
}
