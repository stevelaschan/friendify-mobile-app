import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Header from './components/Header';
import { LoginContext } from './context/LoginContext';
import LoginScreen from './navigation/screens/LoginScreen';
import SignupScreen, { IP } from './navigation/screens/SignupScreen';
import TabsContainer from './navigation/stacks/TabsContainer';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [userFirstName, setUserFirstName] = useState<string>('');
  const [userLastName, setUserLastName] = useState<string>('');
  const [userAge, setUserAge] = useState<string>('');

  useEffect(() => {
    validSessionToken();
  }, []);
  useEffect(() => {
    getUserByValidSessionToken();
  }, []);

  const validSessionToken = async () => {
    // event.preventDefault();
    const userSignedInResponse = await fetch(
      `http://${IP}:3000/api/userSignedIn`,
      {
        method: 'GET',
      },
    );
    const userSignedIn = await userSignedInResponse.json();
    if (userSignedIn.session === undefined) {
      setIsSignedIn(false);
      // console.log('token is undefined', isSignedIn);
    } else {
      setIsSignedIn(true);
      // console.log('token is defined', isSignedIn);
    }
  };

  const getUserByValidSessionToken = async () => {
    // event.preventDefault();
    const protectedUserResponse = await fetch(
      // use IP address instead of localhost
      `http://${IP}:3000/api/protectedUser`,
      {
        method: 'GET',
      },
    );
    const protectedUser = await protectedUserResponse.json();
    setUserFirstName(protectedUser.user.firstName);
    setUserLastName(protectedUser.user.lastName);
    setUserAge(protectedUser.user.age);
  };

  return (
    <NavigationContainer>
      <Header label="Friendify" />
      <LoginContext.Provider
        value={{ setIsSignedIn, userFirstName, userLastName, userAge }}
      >
        <Stack.Navigator>
          {!isSignedIn ? (
            <>
              <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{ header: () => null }}
              />
            </>
          ) : (
            <Stack.Screen
              name="TabsContainer"
              component={TabsContainer}
              options={{ header: () => null }}
            />
          )}
        </Stack.Navigator>
      </LoginContext.Provider>
    </NavigationContainer>
  );
}
