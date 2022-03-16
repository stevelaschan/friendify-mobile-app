import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import { LoginContext } from './context/LoginContext';
import LoginScreen from './navigation/screens/LoginScreen';
import OtherUserTimeSlotScreen from './navigation/screens/OtherUserTimeSlotScreen';
import RestrictedProfileScreen from './navigation/screens/RestrictedProfileScreen';
import SetTimeSlotScreen from './navigation/screens/SetTimeSlot';
import SignupScreen, { IP } from './navigation/screens/SignupScreen';
import TabsContainer from './navigation/stacks/TabsContainer';

type ValidSessionUser = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  age: string;
  shortDescription: string;
};

export default function App() {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = useState<ValidSessionUser | undefined>();

  useEffect(() => {
    // if session token valid return user and session
    const getUserByValidSessionToken = async () => {
      // event.preventDefault();
      const validSessionUserResponse = await fetch(
        // use IP address instead of localhost
        `http://${IP}:3000/api/protectedUser`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const validSessionUser = await validSessionUserResponse.json();
      // console.log(protectedUser.user.firstName);
      if ('error' in validSessionUser) {
        // if user is undefined (token deleted from database or expired) return
        console.log('error', validSessionUser);
        return;
      }
      // if user is not undefined (token in database) set User
      setUser(validSessionUser.user);
      return;
    };

    getUserByValidSessionToken().catch(() => {});
  }, []);

  return (
    <NavigationContainer>
      <Header label="Friendify" />
      <LoginContext.Provider
        // export variables/functions to child components using context
        value={{ setUser, user }}
      >
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
            <>
              <Stack.Screen
                name="TabsContainer"
                component={TabsContainer}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="RestrictedProfileScreen"
                component={RestrictedProfileScreen}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="SetTimeSlotScreen"
                component={SetTimeSlotScreen}
                options={{ header: () => null }}
              />
              <Stack.Screen
                name="OtherUserTimeSlotScreen"
                component={OtherUserTimeSlotScreen}
                options={{ header: () => null }}
              />
            </>
          )}
        </Stack.Navigator>
      </LoginContext.Provider>
    </NavigationContainer>
  );
}
