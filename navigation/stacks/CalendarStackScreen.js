import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../screens/CalendarScreen';
import SearchScreen from '../screens/SearchScreen';

const CalendarStack = createNativeStackNavigator();

export default function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen name="CalendarStack" component={CalendarScreen} />
      <CalendarStack.Screen name="SearchStack" component={SearchScreen} />
    </CalendarStack.Navigator>
  );
}
