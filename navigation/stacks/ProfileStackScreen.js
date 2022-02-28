import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';

const ProfileStack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{ header: () => null }}
      />
      <ProfileStack.Screen name="Login" component={LoginScreen} />
    </ProfileStack.Navigator>
  );
}
