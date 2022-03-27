import { RouteProp } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { RootStackParams } from '../../App';
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

type SelectedDayRouteParam = RouteProp<RootStackParams, 'SetTimeSlotScreen'>;

export default function SetTimeslotScreen({ route }: SelectedDayRouteParam) {
  const { selectedDay } = route.params;
  const { user, reservedTimeslots, setReservedTimeslots } =
    useContext(LoginContext);
  const initialTimeslots = [
    { id: 1, time: '0:00 - 1:00', timeslotSet: false },
    { id: 2, time: '1:00 - 2:00', timeslotSet: false },
    { id: 3, time: '2:00 - 3:00', timeslotSet: false },
    { id: 4, time: '3:00 - 4:00', timeslotSet: false },
    { id: 5, time: '4:00 - 5:00', timeslotSet: false },
    { id: 6, time: '5:00 - 6:00', timeslotSet: false },
    { id: 7, time: '6:00 - 7:00', timeslotSet: false },
    { id: 8, time: '7:00 - 8:00', timeslotSet: false },
    { id: 9, time: '8:00 - 9:00', timeslotSet: false },
    { id: 10, time: '9:00 - 10:00', timeslotSet: false },
    { id: 11, time: '11:00 - 12:00', timeslotSet: false },
    { id: 12, time: '12:00 - 13:00', timeslotSet: false },
    { id: 13, time: '13:00 - 14:00', timeslotSet: false },
    { id: 14, time: '14:00 - 15:00', timeslotSet: false },
    { id: 15, time: '15:00 - 16:00', timeslotSet: false },
    { id: 16, time: '16:00 - 17:00', timeslotSet: false },
    { id: 17, time: '17:00 - 18:00', timeslotSet: false },
    { id: 18, time: '18:00 - 19:00', timeslotSet: false },
    { id: 19, time: '19:00 - 20:00', timeslotSet: false },
    { id: 20, time: '20:00 - 21:00', timeslotSet: false },
    { id: 21, time: '21:00 - 22:00', timeslotSet: false },
    { id: 22, time: '22:00 - 23:00', timeslotSet: false },
    { id: 23, time: '23:00 - 24:00', timeslotSet: false },
  ];

  // const isTimeslotInDatabase = initialTimeslots.map(
  //   (item) =>
  //     !reservedTimeslots.some(
  //       (reservedTimeslot) =>
  //         reservedTimeslot.timeslotTime === item.time &&
  //         reservedTimeslot.timeslotDate.toString().split('T')[0] ===
  //           selectedDay,
  //     ),
  // );

  // console.log(isTimeslotInDatabase);

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
          {!reservedTimeslots.some(
            (reservedTimeslot) =>
              reservedTimeslot.timeslotTime === item.time &&
              reservedTimeslot.timeslotDate.toString().split('T')[0] ===
                selectedDay,
          ) ? (
            <View>
              <Text style={styles.selectedDay}>{selectedDay}</Text>
              <Button
                buttonStyle={styles.itemContainer}
                title={item.time}
                onPress={async (event) => {
                  event.preventDefault();
                  // alert('Timeslot Set!');
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
                  await fetch(
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
                  // const deletedTimeslot = await deletedTimeslotResponse.json();
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
