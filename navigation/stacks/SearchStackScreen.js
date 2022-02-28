import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';

const Stack = createNativeStackNavigator();

export default function SearchStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchStack" component={SearchScreen} />
      <Stack.Screen name="ProfileStack" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
