import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="ProfileStack" component={ProfileScreen} />
      <ProfileStack.Screen name="HomeStack" component={HomeScreen} />
    </ProfileStack.Navigator>
  );
}
