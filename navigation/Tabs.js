import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
      //   style: {
      //     position: 'absolute',
      //     bottom: 25,
      //     left: 20,
      //     right: 20,
      //     elevation: 0,
      //     borderRadius: 15,
      //     height: 90,
      //   },
      // }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;

          if (rn === home) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === calendar) {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (rn === search) {
            iconName = focused ? 'search' : 'search-outline';
          } else if (rn === profile) {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name={home} component={HomeStackScreen} />
      <Tab.Screen name={calendar} component={CalendarStackScreen} />
      <Tab.Screen name={search} component={SearchStackScreen} />
      <Tab.Screen name={profile} component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}
