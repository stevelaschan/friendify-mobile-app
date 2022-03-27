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

  const timeToString = (time) => {
    const date = selectedDay;
    return date.toString().split('T')[0];
  };

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = () => {
    reservedTimeslots.map((timeslot) => {
      return (
        <View key={timeslot.id}>
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
                  {timeslot.userUsername !== null ? (
                    <View key={timeslot.id}>
                      <Text>{timeslot.userUsername}</Text>
                      <Text>{timeslot.timeslotTime}</Text>
                      <Avatar.Text
                        label={timeslot.userUsername.charAt(0).toUpperCase()}
                      />
                    </View>
                  ) : (
                    <View />
                  )}
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
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
