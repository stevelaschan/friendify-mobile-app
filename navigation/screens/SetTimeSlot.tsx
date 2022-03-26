import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

type CreatedTimeslot = {
  id: number;
  providerId: number;
  timeslotDate: Date;
  timeslotTime: string;
  userUsername: string | null;
  timeslotSet: boolean;
};

export default function SetTimeslotScreen({ route }) {
  const { selectedDay } = route.params;
  const { user, reservedTimeslots, setReservedTimeslots } =
    useContext(LoginContext);
  const [items, setItems] = useState([
    { time: '0:00 - 1:00', timeslotSet: false },
    { time: '1:00 - 2:00', timeslotSet: false },
    { time: '2:00 - 3:00', timeslotSet: false },
    { time: '3:00 - 4:00', timeslotSet: false },
    { time: '4:00 - 5:00', timeslotSet: false },
    { time: '5:00 - 6:00', timeslotSet: false },
    { time: '6:00 - 7:00', timeslotSet: false },
    { time: '7:00 - 8:00', timeslotSet: false },
    { time: '8:00 - 9:00', timeslotSet: false },
    { time: '9:00 - 10:00', timeslotSet: false },
    { time: '11:00 - 12:00', timeslotSet: false },
    { time: '12:00 - 13:00', timeslotSet: false },
    { time: '13:00 - 14:00', timeslotSet: false },
    { time: '14:00 - 15:00', timeslotSet: false },
    { time: '15:00 - 16:00', timeslotSet: false },
    { time: '16:00 - 17:00', timeslotSet: false },
    { time: '17:00 - 18:00', timeslotSet: false },
    { time: '18:00 - 19:00', timeslotSet: false },
    { time: '19:00 - 20:00', timeslotSet: false },
    { time: '20:00 - 21:00', timeslotSet: false },
    { time: '21:00 - 22:00', timeslotSet: false },
    { time: '22:00 - 23:00', timeslotSet: false },
    { time: '23:00 - 24:00', timeslotSet: false },
  ]);

  return (
    <FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <View>
          {!reservedTimeslots.timeslotSet ? (
            <View>
              <Text style={styles.selectedDay}>{selectedDay}</Text>
              <Button
                buttonStyle={styles.itemContainer}
                title={item.time}
                onPress={async (event) => {
                  event.preventDefault();
                  const newTimeslotResponse = await fetch(
                    // use IP address instead of localhost (IP address changes)
                    `http://${IP}:3000/api/createNewTimeSlot`,
                    {
                      method: 'POST',
                      body: JSON.stringify({
                        id: user.id,
                        date: selectedDay,
                        time: item.time,
                        timeslotSet: true,
                      }),
                    },
                  );
                  const createdTimeslot: CreatedTimeslot =
                    await newTimeslotResponse.json();

                  setReservedTimeslots([...reservedTimeslots, createdTimeslot]);

                  const timeslotDateToString = createdTimeslot.timeslotDate
                    .toString()
                    .split('T')[0];

                  // const timeslot = {
                  //   time: createdTimeslot.timeslotTime,
                  //   timeslotSet: true,
                  // };

                  // const timeslotNotInDatabase = items.map(
                  //   (timeslot) =>
                  //     reservedTimeslots.filter(
                  //       (itemObject) =>
                  //         item.time === timeslot.timeslotTime &&
                  //         selectedDay ===
                  //           timeslot.timeslotDate.toString().split('T')[0],
                  //     ),
                  // );

                  // const timeslotInDatabase = items.find(
                  //   (itemObject) =>
                  //     itemObject.time === createdTimeslot.timeslotTime &&
                  //     selectedDay === timeslotDateToString,
                  // );

                  // setItems([... timeslotInDatabase, timeslotsNotInDatabase]);
                  console.log(timeslotNotInDatabase);
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
                    `http://${IP}:3000/api/deleteTimeslot`,
                    {
                      method: 'DELETE',
                      body: JSON.stringify({
                        id: user.id,
                        date: selectedDay,
                        time: item.time,
                      }),
                    },
                  );
                  const deletedTimeslot = await deletedTimeslotResponse.json();
                  setReservedTimeslots(reservedTimeslots);
                }}
              />
            </View>
          )}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
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
