import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { Button } from 'react-native';
import Header from './components/Header';
import { LoginContext } from './context/LoginContext';
import LoginScreen from './navigation/screens/LoginScreen';
import SignupScreen, { IP } from './navigation/screens/SignupScreen';
import TabsContainer from './navigation/stacks/TabsContainer';

type User = {
  firstname: string;
  lastname: string;
  age: string;
};

export default function App() {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    getUserByValidSessionToken();
  }, []);

  // if session token valid return user and session
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
    if ('error' in protectedUser) {
      // if user is undefined (token deleted from database or expired) return
      console.log('usertest', protectedUser);
      return;
    }
    // if user user is not undefined (token in database) set User
    setUser({
      firstName: protectedUser.user.firstName,
      lastName: protectedUser.user.lastName,
      age: protectedUser.user.age,
    });
    return;
  };

  return (
    <NavigationContainer>
      <Header label="Friendify" />
      <LoginContext.Provider
        // export variables/functions to child components using context
        value={{ setUser, user }}
      >
        {/* <Button title="test" onPress={getUserByValidSessionToken} /> */}
        <Stack.Navigator>
          {!user ? (
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
