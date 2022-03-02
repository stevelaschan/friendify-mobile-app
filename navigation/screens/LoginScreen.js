import styled from '@emotion/native';
import { useRoute } from '@react-navigation/native';
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
  // const [errors, setErrors] = useState([]);
  const router = useRoute();

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
        onPress={async (event) => {
          event.preventDefault();
          const loginResponse = await fetch(
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

          console.log(loginResponse);
          //   const loginResponseBody = await loginResponse.json();

          //   if ('errors' in loginResponseBody) {
          //     setErrors(loginResponseBody.errors);
          //     return;
          //   }

          //   // Get the query parameter from the Next.js router
          //   const returnTo = router.query.returnTo;
          //   console.log('returnTo', returnTo);

          //   if (
          //     returnTo &&
          //     !Array.isArray(returnTo) &&
          //     // Security: Validate returnTo parameter against valid path
          //     // (because this is untrusted user input)
          //     /^\/[a-zA-Z0-9-?=/]*$/.test(returnTo)
          //   ) {
          //     await router.push(returnTo);
          //     return;
          //   }
          // }

          // Login worked, redirect to the homepage using the Next.js router
          // setErrors([]); // clear the errors - maybe not necessary with redirect
          // props.refreshUserProfile();
          // await router.push('Home');
        }}
      />
      <SignupButton
        title="Sign up"
        onPress={() => navigation.navigate('Signup')}
      />
      {/* <View>
        {errors.map((error) => {
          return <Text key={`error-${error.message}`}>{error.message}</Text>;
        })}
      </View> */}
    </View>
  );
}
