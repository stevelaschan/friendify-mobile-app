import { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Button } from 'react-native-elements';
import { Avatar, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LoginContext } from '../../context/LoginContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 50,
  },
  buttonView: {
    position: 'absolute',
    right: 30,
    top: 530,
  },
  button: {
    backgroundColor: 'rgba(18, 57, 162, 0.8)',
    borderRadius: 30,
    width: 'auto',
    padding: 14,
    borderWidth: 2,
  },
});

export default function CalendarScreen({ navigation }) {
  const now = new Date().toISOString().split('T')[0];
  const [selectedDay, setSelectedDay] = useState(now);
  const { user, reservedTimeslots, bookedTimeslots } = useContext(LoginContext);

  if (!reservedTimeslots) {
    return;
  }
  const dates = reservedTimeslots.map(
    (timeslot) => timeslot.timeslotDate.toString().split('T')[0],
  );

  dates.forEach((date) => {
    if (!reservedTimeslots) {
      return;
    }
    reservedTimeslots.map((timeslot) => {
      if (
        date === timeslot.timeslotDate.toString().split('T')[0] &&
        user.id === timeslot.providerId
      ) {
        return (bookedTimeslots[date] = [timeslot]);
      }
      return undefined;
    });
  });

  // console.log(bookedTimeslots);

  const renderItem = (item) => {
    return (
      <View key={item.id}>
        <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
          <Card>
            <Card.Content>
              {item.userUsername !== null ? (
                <View
                  key={item.id}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text>{item.userUsername}</Text>
                  <Text>{item.timeslotTime}</Text>
                  <Avatar.Text
                    label={item.userUsername.charAt(0).toUpperCase()}
                  />
                </View>
              ) : (
                <View>
                  <Text>Timeslot set, but not booked</Text>
                </View>
              )}
            </Card.Content>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={bookedTimeslots}
        selected={selectedDay}
        renderItem={renderItem}
        showClosingKnob={true}
        theme={{
          agendaTodayColor: 'red',
        }}
        onDayPress={(day) => {
          const time = day.timestamp;
          const date = new Date(time);
          const currentDate = date.toISOString().split('T')[0];
          setSelectedDay(currentDate);
        }}
      />
      {user.isProvider ? (
        <View style={styles.buttonView}>
          <Button
            icon={<Ionicons name="add" size={24} color="white" />}
            buttonStyle={styles.button}
            onPress={() =>
              navigation.navigate('SetTimeSlotScreen', {
                selectedDay: selectedDay,
              })
            }
          />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}
