import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';

const SearchStack = createNativeStackNavigator();

export default function SearchStackScreen() {
  return (
    <SearchStack.Navigator>
      <SearchStack.Screen name="SearchStack" component={SearchScreen} />
      <SearchStack.Screen name="ProfileStack" component={ProfileScreen} />
    </SearchStack.Navigator>
  );
}
