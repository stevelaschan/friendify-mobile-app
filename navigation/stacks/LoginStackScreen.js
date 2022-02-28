import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import Tabs from '../TabsContainer';

const Stack = createNativeStackNavigator();

export default function LoginStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginStack"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Home"
        component={Tabs}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}
