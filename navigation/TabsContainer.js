import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName={home}
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
        component={CalendarScreen}
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
