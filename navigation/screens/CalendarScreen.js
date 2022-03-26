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
  const [items, setItems] = useState({});
  const now = new Date().toISOString().split('T')[0];
  const [selectedDay, setSelectedDay] = useState(now);
  const { user, reservedTimeslots, setReservedTimeslots } =
    useContext(LoginContext);

  const loadItems = (day) => {
    setTimeout(() => {
      const time = day.timestamp;
      const date = new Date(time);
      const currentDate = date.toISOString().split('T')[0];
      // if (!items[strTime]) {
      //   items[strTime] = [];
      //   items[strTime].push({
      //     name: 'Time Spot for ' + users.first_name + ' ' + users.last_name,
      //     height: Math.max(50, Math.floor(Math.random() * 150)),
      //   });
      // }
      const newItems = {};
      Object.keys(reservedTimeslots).forEach((key) => {
        newItems[key] = reservedTimeslots[key];
      });
      setReservedTimeslots(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {reservedTimeslots.map((timeslot) => (
                <View key={timeslot.id}>
                  <Text>{timeslot.username}</Text>
                  <Avatar.Text label={timeslot.timeslotTime} />
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        // loadItemsForMonth={loadItems}
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
          // console.log(currentDate);
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
