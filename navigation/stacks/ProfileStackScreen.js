import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Stack = createNativeStackNavigator();

export default function ProfileStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileStack"
        component={ProfileScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="LoginStack"
        component={LoginScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}
