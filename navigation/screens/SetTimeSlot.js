import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { LoginContext } from '../../context/LoginContext';
import { url } from './SignupScreen';

const styles = StyleSheet.create({
  gridView: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: '#121212',
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: 8,
    padding: 10,
    height: 100,
    backgroundColor: 'rgba(18, 57, 162, 0.8)',
  },
  selectedDay: {
    bottom: 100,
    left: 10,
    color: 'white',
  },
});

export default function SetTimeslotScreen({ route }) {
  const { selectedDay } = route.params;
  const { user, reservedTimeslots, setReservedTimeslots } =
    useContext(LoginContext);
  const initialTimeslots = [
    { id: 1, time: '0:00 - 1:00' },
    { id: 2, time: '1:00 - 2:00' },
    { id: 3, time: '2:00 - 3:00' },
    { id: 4, time: '3:00 - 4:00' },
    { id: 5, time: '4:00 - 5:00' },
    { id: 6, time: '5:00 - 6:00' },
    { id: 7, time: '6:00 - 7:00' },
    { id: 8, time: '7:00 - 8:00' },
    { id: 9, time: '8:00 - 9:00' },
    { id: 10, time: '9:00 - 10:00' },
    { id: 11, time: '11:00 - 12:00' },
    { id: 12, time: '12:00 - 13:00' },
    { id: 13, time: '13:00 - 14:00' },
    { id: 14, time: '14:00 - 15:00' },
    { id: 15, time: '15:00 - 16:00' },
    { id: 16, time: '16:00 - 17:00' },
    { id: 17, time: '17:00 - 18:00' },
    { id: 18, time: '18:00 - 19:00' },
    { id: 19, time: '19:00 - 20:00' },
    { id: 20, time: '20:00 - 21:00' },
    { id: 21, time: '21:00 - 22:00' },
    { id: 22, time: '22:00 - 23:00' },
    { id: 23, time: '23:00 - 24:00' },
  ];

  // console.log(selectedDay);

  return (
    <FlatGrid
      itemDimension={130}
      data={initialTimeslots}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <View>
          <Text style={styles.selectedDay}>{selectedDay}</Text>
          {!reservedTimeslots.some(
            (reservedTimeslot) =>
              reservedTimeslot.timeslotTime === item.time &&
              reservedTimeslot.timeslotDate.toString().split('T')[0] ===
                selectedDay,
          ) ? (
            <View>
              <Button
                buttonStyle={styles.itemContainer}
                title={item.time}
                onPress={async (event) => {
                  event.preventDefault();
                  const newTimeslotResponse = await fetch(
                    // use IP address instead of localhost (IP address changes)
                    `${url}/api/createNewTimeSlot`,
                    {
                      method: 'POST',
                      body: JSON.stringify({
                        username: user.username,
                        date: selectedDay,
                        time: item.time,
                        timeslotSet: true,
                      }),
                    },
                  );
                  const createdTimeslot = await newTimeslotResponse.json();

                  setReservedTimeslots([...reservedTimeslots, createdTimeslot]);
                }}
              />
            </View>
          ) : (
            <View>
              <Button
                buttonStyle={styles.itemContainer}
                title="Timeslot Set"
                onPress={async (event) => {
                  event.preventDefault();
                  const deletedTimeslotResponse = await fetch(
                    // use IP address instead of localhost (IP address changes)
                    `${url}/api/deleteTimeslot`,
                    {
                      method: 'DELETE',
                      body: JSON.stringify({
                        username: user.username,
                        date: selectedDay,
                        time: item.time,
                      }),
                    },
                  );
                  const deletedTimeslot = await deletedTimeslotResponse.json();

                  const timeslotsInDatabase = reservedTimeslots.filter(
                    (reservedTimeslot) =>
                      reservedTimeslot.timeslotTime !==
                        deletedTimeslot.timeslotTime &&
                      reservedTimeslot.timeslotDate.toString().split('T')[0] !==
                        deletedTimeslot.timeslotDate,
                  );
                  // console.log(timeslotsInDatabase);
                  setReservedTimeslots(timeslotsInDatabase);
                }}
              />
            </View>
          )}
        </View>
      )}
    />
  );
}
