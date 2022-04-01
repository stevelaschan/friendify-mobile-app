import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CalendarScreen from '../screens/CalendarScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';

const tab = createBottomTabNavigator();
const home = 'Home';
const calendar = 'Calendar';
const search = 'Search';
const profile = 'Profile';

export default function TabsContainer() {
  return (
    <tab.Navigator
      initialRouteName={home}
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#ffffff',
        tabBarShowLabel: false,
        tabBarStyle: {
          // position: 'absolute',
          backgroundColor: '#1a1818',
          // borderRadius: 6,
          paddingTop: 8,
          paddingBottom: 18,
          // bottom: 30,
          height: 70,
          // shadowColor: '#000',
          // shadowOpacity: 0.06,
          // shadowOffset: {
          //   width: 10,
          //   height: 10,
          // },
        },
        tabBarIcon: ({ focused, color }, icon) => {
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
      <tab.Screen
        name={home}
        component={HomeScreen}
        options={{ header: () => null }}
      />
      <tab.Screen
        name={calendar}
        component={CalendarScreen}
        options={{ header: () => null }}
      />
      <tab.Screen
        name={search}
        component={SearchScreen}
        options={{ header: () => null }}
      />
      <tab.Screen
        name={profile}
        component={ProfileScreen}
        options={{ header: () => null }}
      />
    </tab.Navigator>
  );
}
