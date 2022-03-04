import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from 'react-native';
import Header from './components/Header';
import LoginScreen from './navigation/screens/LoginScreen';
import SignupScreen, { IP } from './navigation/screens/SignupScreen';
import TabsContainer from './navigation/stacks/TabsContainer';

const Stack = createNativeStackNavigator();

export default function App() {
  // const [isSignedIn, setIsSignedIn] = useState(false);
  let isSignedIn;

  useEffect(() => {
    user();
  }, []);

  const user = async () => {
    // event.preventDefault();
    const userSignedInResponse = await fetch(
      `http://${IP}:3000/api/userSignedIn`,
      { method: 'GET' },
    );
    const userSignedInResponseJson = await userSignedInResponse.json();
    // console.log('session', userSignedInResponseJson.session);
    if (userSignedInResponseJson.session === undefined) {
      // setIsSignedIn(false);
      isSignedIn = false;
      console.log('token is undefined', isSignedIn);
      return isSignedIn;
    } else {
      // setIsSignedIn(true);
      isSignedIn = true;
      console.log('token is defined', isSignedIn);
      return isSignedIn;
    }
    // userSignedInResponseJson === undefined ? false : true;
  };

  return (
    <NavigationContainer>
      <Header label="Friendify" />
      {/* <Button title="token validity test" /> */}
      <Stack.Navigator>
        {/* {isSignedIn === false ? (
          <> */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Signup"
          component={SignupScreen}
          options={{ header: () => null }}
        />
        {/* </>
        ) : ( */}
        <Stack.Screen
          name="Tabs"
          component={TabsContainer}
          options={{ header: () => null }}
        />
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#3A3A3A',
//   },
// });
