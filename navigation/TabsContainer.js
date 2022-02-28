import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header';
import CalendarScreen from './screens/CalendarScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import CalendarStackScreen from './stacks/CalendarStackScreen';
import HomeStackScreen from './stacks/HomeStackScreen';
import ProfileStackScreen from './stacks/ProfileStackScreen';
import SearchStackScreen from './stacks/SearchStackScreen';

const Tab = createBottomTabNavigator();
const home = 'Home';
const calendar = 'Calendar';
const search = 'Search';
const profile = 'Profile';
const login = 'Login';

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName={login}
      // tabBarOptions={{
      //   showLabel: false,
      // style: {
      //   position: 'absolute',
      //   bottom: 25,
      //   left: 20,
      //   right: 20,
      //   elevation: 0,
      //   borderRadius: 15,
      //   height: 90,
      // },
      // }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          let rn = route.name;

          if (rn === home) {
            icon = focused ? 'home' : 'home-outline';
          } else if (rn === calendar) {
            icon = focused ? 'grid' : 'grid-outline';
          } else if (rn === search) {
            icon = focused ? 'search' : 'search-outline';
          } else if (rn === profile) {
            icon = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={icon} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={home}
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <Tab.Screen
        name={calendar}
        component={CalendarStackScreen}
        options={{ header: () => null }}
      />
      <Tab.Screen
        name={search}
        component={SearchScreen}
        options={{ header: () => null }}
      />
      <Tab.Screen
        name={profile}
        component={ProfileStackScreen}
        options={{ header: () => null }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3A3A3A',
  },
});
