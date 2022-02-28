import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import ProfileScreen from '../screens/ProfileScreen';

const LoginStack = createNativeStackNavigator();

export default function LoginStackScreen() {
  return (
    <LoginStack.Navigator>
      <LoginStack.Screen name="ProfileStack" component={ProfileScreen} />
      <LoginStack.Screen name="LoginStack" component={LoginScreen} />
    </LoginStack.Navigator>
  );
}
