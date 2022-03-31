import { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Button } from 'react-native-elements';
import { Avatar, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

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
  const { user, inCalendarTimeslots, setInCalendarTimeslots } =
    useContext(LoginContext);

  useEffect(() => {
    const getTimeslots = async () => {
      const timeslotsResponse = await fetch(
        // use IP address instead of localhost
        `http://${IP}:3000/api/getTimeslots`,
        {
          method: 'GET',
        },
      );
      const allTimeslots = await timeslotsResponse.json();

      allTimeslots.forEach((timeslot) => {
        const date = timeslot.timeslotDate.toString().split('T')[0];
        if (
          user.username === timeslot.providerUsername ||
          user.username === timeslot.userUsername
        ) {
          const newState = inCalendarTimeslots;
          newState[date] = newState[date]
            ? [...newState[date], timeslot]
            : [timeslot];
          setInCalendarTimeslots(newState);
          return;
        }
      });
    };
    getTimeslots().catch((error) => {
      console.log(error);
    });
  }, []);

  // console.log(inCalendarTimeslots);

  const renderItem = (item) => {
    return (
      <View key={item.id}>
        <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
          <Card>
            <Card.Content>
              {user.username === item.providerUsername && !item.userUsername ? (
                <View>
                  <Text>Timeslot set, but not booked {item.timeslotTime}</Text>
                </View>
              ) : user.username === item.providerUsername ? (
                <View
                  key={item.id}
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ color: '#ce3b3b' }}>{item.userUsername}</Text>
                  <Text>{item.timeslotTime}</Text>
                  <Avatar.Text
                    label={item.userUsername.charAt(0).toUpperCase()}
                    style={{ backgroundColor: '#ce3b3b' }}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('RatingScreen', {
                      provider: item.providerUsername,
                    })
                  }
                >
                  <View
                    key={item.id}
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text style={{ color: '#14bdbf' }}>
                      {item.providerUsername}
                    </Text>
                    <Text>{item.timeslotTime}</Text>
                    <Avatar.Text
                      label={item.providerUsername.charAt(0).toUpperCase()}
                      style={{ backgroundColor: '#14bdbf' }}
                    />
                  </View>
                </TouchableOpacity>
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
        items={inCalendarTimeslots}
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
