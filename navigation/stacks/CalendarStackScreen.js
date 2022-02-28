import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../screens/CalendarScreen';
import SetTimeSlotScreen from '../screens/SetTimeSlot';

const CalendarStack = createNativeStackNavigator();

export default function CalendarStackScreen() {
  return (
    <CalendarStack.Navigator>
      <CalendarStack.Screen
        name="CalendarStack"
        component={CalendarScreen}
        options={{ header: () => null }}
      />
      <CalendarStack.Screen
        name="SetTimeSlotStack"
        component={SetTimeSlotScreen}
        options={{ header: () => null }}
      />
    </CalendarStack.Navigator>
  );
}
