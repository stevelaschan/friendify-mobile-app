import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
// import SearchStackScreen from './stacks/SearchStackScreen';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import CalendarScreen from './screens/CalendarScreen';
import HomeScreen from './screens/HomeScreen';
// import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
import CalendarStackScreen from './stacks/CalendarStackScreen';
// import HomeStackScreen from './stacks/HomeStackScreen';
import ProfileStackScreen from './stacks/ProfileStackScreen';

const Tab = createBottomTabNavigator();
const home = 'Home';
const calendar = 'Calendar';
const search = 'Search';
const profile = 'Profile';

export default function TabsContainer() {
  return (
    <Tab.Navigator
      initialRouteName={home}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#ffffff',
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#383838',
          borderRadius: 6,
          paddingTop: 8,
          paddingBottom: 18,
          position: 'absolute',
          // bottom: 30,
          height: 70,
          shadowColor: '#000',
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
        },
        tabBarIcon: ({ focused, color, size }, icon) => {
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
          return <Ionicons name={icon} size={24} color={color} />;
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
