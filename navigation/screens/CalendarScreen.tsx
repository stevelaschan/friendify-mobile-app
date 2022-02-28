import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function CalendarScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Calendar
        style={{
          height: 350,
          width: 400,
        }}
        theme={{
          calendarBackground: '#383838',
          selectedDayTextColor: '#040114',
          selectedDayBackgroundColor: '#ffffff',
          dayTextColor: '#ffffff',
          monthTextColor: '#ffffff',
          todayTextColor: '#00adf5',
        }}
        enableSwipeMonths={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 50,
  },
});
