import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';

const HomeStack = createNativeStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="LoginStack"
        component={LoginScreen}
        options={{ header: () => null }}
      />
      <HomeStack.Screen
        name="HomeStack"
        component={HomeScreen}
        options={{ header: () => null }}
      />
    </HomeStack.Navigator>
  );
}
