import { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Agenda, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import { Button } from 'react-native-elements';
import { Avatar, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LoginContext } from '../../context/LoginContext';

const users = {
  first_name: 'Stefan',
  last_name: 'Laschan',
  age: 28,
};

export default function CalendarScreen({ navigation }) {
  const [items, setItems] = useState({});
  const [selectedDay, setSelectedDay] = useState();
  const { isProvider, user } = useContext(LoginContext);

  const timeToString = (time: number) => {
    const date = new Date(time);
    const isoDate = date.toISOString().split('T')[0];
    setSelectedDay(isoDate);
    return date.toISOString().split('T')[0];
  };

  type Day = {
    timestamp: number;
  };

  const loadItems = (day: Day) => {
    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = 1; // how many items per day
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Time Spot for ' + users.first_name + ' ' + users.last_name,
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
              <Text>{item.name}</Text>
              <Avatar.Text
                label={users.first_name.charAt(0) + users.last_name.charAt(0)}
              />
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
        loadItemsForMonth={loadItems}
        selected={new Date().toString()}
        renderItem={renderItem}
        showClosingKnob={true}
        theme={{
          agendaTodayColor: 'red',
        }}
        onDayPress={() => console.log(selectedDay)}
      />
      {user.isProvider ? (
        <View style={styles.buttonView}>
          <Button
            icon={<Ionicons name="add" size={24} color="white" />}
            buttonStyle={styles.button}
            onPress={() => navigation.navigate('SetTimeSlotScreen')}
          />
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}

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
    backgroundColor: '#383838',
    borderRadius: 30,
    width: 'auto',
    padding: 14,
    borderWidth: 2,
  },
});
