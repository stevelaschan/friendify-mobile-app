import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginStack"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}
