import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import TabsContainer from '../TabsContainer';

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
        component={TabsContainer}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}
