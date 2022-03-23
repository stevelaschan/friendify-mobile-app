import { useContext, useState } from 'react';
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
};

export default function SetTimeslotScreen({ route }) {
  const { selectedDay } = route.params;
  const { user, reservedTimeslots } = useContext(LoginContext);
  const [items, setItems] = useState([
    { time: '0:00 - 1:00' },
    { time: '1:00 - 2:00' },
    { time: '2:00 - 3:00' },
    { time: '3:00 - 4:00' },
    { time: '4:00 - 5:00' },
    { time: '5:00 - 6:00' },
    { time: '6:00 - 7:00' },
    { time: '7:00 - 8:00' },
    { time: '8:00 - 9:00' },
    { time: '9:00 - 10:00' },
    { time: '11:00 - 12:00' },
    { time: '12:00 - 13:00' },
    { time: '13:00 - 14:00' },
    { time: '14:00 - 15:00' },
    { time: '15:00 - 16:00' },
    { time: '16:00 - 17:00' },
    { time: '17:00 - 18:00' },
    { time: '18:00 - 19:00' },
    { time: '19:00 - 20:00' },
    { time: '20:00 - 21:00' },
    { time: '21:00 - 22:00' },
    { time: '22:00 - 23:00' },
    { time: '23:00 - 24:00' },
  ]);

  const itemFiltered = items.map((item) =>
    reservedTimeslots.filter((day) => day !== item.time),
  );

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
                  }),
                },
              );

              const createdTimeslot: CreatedTimeslot =
                await newTimeslotResponse.json();
              // console.log(createdTimeslot);
              // const createdTimesslotmapped = createdTimeslot.map((a) => a.timeslotTime)
            }}
          />
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
    backgroundColor: '#383838',
  },
  selectedDay: {
    bottom: 100,
    left: 10,
    color: 'white',
  },
});
