import { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Button } from 'react-native-elements';
import { Avatar, Card } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LoginContext } from '../../context/LoginContext';
import { url } from './SignupScreen';

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
    borderColor: 'rgba(18, 57, 162, 0.8)',
    borderRadius: 30,
    width: 'auto',
    padding: 14,
    borderWidth: 2,
  },
});

export default function CalendarScreen({ navigation }) {
  const now = new Date().toISOString().split('T')[0];
  const [selectedDay, setSelectedDay] = useState(now);
  const [inCalendarTimeslots, setInCalendarTimeslots] = useState({});
  const { user, reservedTimeslots } = useContext(LoginContext);

  useEffect(() => {
    const getTimeslots = async () => {
      const timeslotsResponse = await fetch(
        // use IP address instead of localhost
        `${url}/api/getTimeslots`,
        {
          method: 'POST',
          body: JSON.stringify({
            username: user.username,
          }),
        },
      );
      const timeslotsByUsername = await timeslotsResponse.json();

      setInCalendarTimeslots(timeslotsByUsername);
    };
    getTimeslots().catch((error) => {
      console.log(error);
    });
  }, [reservedTimeslots, user]);

  const renderItem = (item) => {
    return (
      <View key={item.id}>
        <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
          <Card style={{ backgroundColor: '#121212' }}>
            <Card.Content
              style={{ backgroundColor: '#312e2e', borderRadius: 8 }}
            >
              {user.username === item.providerUsername && !item.userUsername ? (
                <View>
                  <Text style={{ color: 'white' }}>
                    Timeslot set, but not booked {item.timeslotTime}
                  </Text>
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
                  <Text style={{ color: 'white' }}>{item.userUsername}</Text>
                  <Text style={{ color: 'white' }}>{item.timeslotTime}</Text>
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
                    <Text style={{ color: 'white' }}>
                      {item.providerUsername}
                    </Text>
                    <Text style={{ color: 'white' }}>{item.timeslotTime}</Text>
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
          calendarBackground: '#121212',
          backgroundColor: '#121212',
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
