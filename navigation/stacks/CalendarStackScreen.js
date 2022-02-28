import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CalendarScreen from '../screens/CalendarScreen';
import SetTimeSlotScreen from '../screens/SetTimeSlot';

const Stack = createNativeStackNavigator();

export default function CalendarStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CalendarStack"
        component={CalendarScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="SetTimeSlotStack"
        component={SetTimeSlotScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}
