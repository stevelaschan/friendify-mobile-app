import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import { LoginContext } from './context/LoginContext';
import LoginScreen from './navigation/screens/LoginScreen';
import ProviderProfileScreen from './navigation/screens/ProviderProfileScreen';
import ProviderTimeSlotScreen from './navigation/screens/ProviderTimeSlotScreen';
import RatingScreen from './navigation/screens/RatingScreen';
import SetTimeSlotScreen from './navigation/screens/SetTimeSlot';
import SignupScreen, { url } from './navigation/screens/SignupScreen';
import TabsContainer from './navigation/stacks/TabsContainer';

export type RootStackParams = {
  ProviderProfileScreen: {
    profile: {
      firstName: string;
      lastName: string;
      age: string;
      username: string;
      shortDescription: string;
      isProvider: boolean;
    };
    timeslots: {
      id: number;
      providerUsername: string;
      timeslotDate: Date;
      timeslotTime: string;
      timeslotset: boolean;
    };
  };
  ProviderTimeslotScreen: {
    providerProfile: {
      firstName: string;
      lastName: string;
      age: string;
      username: string;
      shortDescription: string;
      isProvider: boolean;
    };
    id: number;
    timeslots: {
      id: number;
      providerId: number;
      timeslotDate: Date;
      timeslotTime: string;
      timeslotset: boolean;
    };
  };
  SignupScreen: undefined;
  SetTimeSlotScreen: {
    selectedDay: string;
  };
};

export type User = {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  age: string;
  shortDescription: string;
  isProvider: boolean;
};

export type Rating = {
  id: number;
  userId: number;
  providerId: number;
  rating: number;
};

export type Timeslot = {
  id: number;
  userUsername: string;
  providerId: number;
  timeslotDate: Date;
  timeslotTime: string;
};

export default function App() {
  const stack = createNativeStackNavigator();
  const [user, setUser] = useState<User | undefined>();
  const [rating, setRating] = useState<Rating | undefined>();
  const [reservedTimeslots, setReservedTimeslots] = useState();
  const [inCalendarTimeslots, setInCalendarTimeslots] = useState({});

  useEffect(() => {
    // if session token valid return user and session
    const getUserByValidSessionToken = async () => {
      // event.preventDefault();
      const validSessionUserResponse = await fetch(
        // use IP address instead of localhost
        `${url}/api/loggedInUser`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const validSessionUser = await validSessionUserResponse.json();
      if ('error' in validSessionUser) {
        // if user is undefined (token deleted from database or expired) return
        console.log('error', validSessionUser);
        return;
      }

      // if user is not undefined (token in session) retrieve User, Rating and Timeslots from database and set to state
      setUser(validSessionUser.user);
      setRating(validSessionUser.rating);
      setReservedTimeslots(validSessionUser.timeslots);
      return;
    };

    getUserByValidSessionToken().catch(() => {});
  }, []);

  // console.log(rating);

  return (
    <NavigationContainer>
      <Header label="Friendify" />
      <LoginContext.Provider
        // export variables/functions to child components using context
        value={{
          user,
          setUser,
          rating,
          setRating,
          reservedTimeslots,
          setReservedTimeslots,
          inCalendarTimeslots,
          setInCalendarTimeslots,
        }}
      >
        <stack.Navigator>
          {!user ? (
            <>
              <stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ header: () => null }}
              />
              <stack.Screen
                name="SignupScreen"
                component={SignupScreen}
                options={{ header: () => null }}
              />
            </>
          ) : (
            <>
              <stack.Screen
                name="TabsContainer"
                component={TabsContainer}
                options={{ header: () => null }}
              />
              <stack.Screen
                name="SetTimeSlotScreen"
                component={SetTimeSlotScreen}
                options={{ header: () => null }}
              />
              <stack.Screen
                name="ProviderProfileScreen"
                component={ProviderProfileScreen}
                options={{ header: () => null }}
              />
              <stack.Screen
                name="ProviderTimeSlotScreen"
                component={ProviderTimeSlotScreen}
                options={{ header: () => null }}
              />
              <stack.Screen
                name="RatingScreen"
                component={RatingScreen}
                options={{ header: () => null }}
              />
            </>
          )}
        </stack.Navigator>
      </LoginContext.Provider>
    </NavigationContainer>
  );
}
