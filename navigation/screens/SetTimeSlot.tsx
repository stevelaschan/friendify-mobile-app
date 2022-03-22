import { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

export default function SetTimeslotScreen({ route }) {
  const { selectedDay } = route.params;
  const { user } = useContext(LoginContext);
  const [items, setItems] = useState([
    { time: '0:00 - 1:00', selectedDay: selectedDay },
    { time: '1:00 - 2:00', selectedDay: selectedDay },
    { time: '2:00 - 3:00', selectedDay: selectedDay },
    { time: '3:00 - 4:00', selectedDay: selectedDay },
    { time: '4:00 - 5:00', selectedDay: selectedDay },
    { time: '5:00 - 6:00', selectedDay: selectedDay },
    { time: '6:00 - 7:00', selectedDay: selectedDay },
    { time: '7:00 - 8:00', selectedDay: selectedDay },
    { time: '8:00 - 9:00', selectedDay: selectedDay },
    { time: '9:00 - 10:00', selectedDay: selectedDay },
    { time: '11:00 - 12:00', selectedDay: selectedDay },
    { time: '12:00 - 13:00', selectedDay: selectedDay },
    { time: '13:00 - 14:00', selectedDay: selectedDay },
    { time: '14:00 - 15:00', selectedDay: selectedDay },
    { time: '15:00 - 16:00', selectedDay: selectedDay },
    { time: '16:00 - 17:00', selectedDay: selectedDay },
    { time: '17:00 - 18:00', selectedDay: selectedDay },
    { time: '18:00 - 19:00', selectedDay: selectedDay },
    { time: '19:00 - 20:00', selectedDay: selectedDay },
    { time: '20:00 - 21:00', selectedDay: selectedDay },
    { time: '21:00 - 22:00', selectedDay: selectedDay },
    { time: '22:00 - 23:00', selectedDay: selectedDay },
    { time: '23:00 - 24:00', selectedDay: selectedDay },
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
          <Text style={styles.selectedDay}>{item.selectedDay}</Text>
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
                    date: item.selectedDay,
                    time: item.time,
                  }),
                },
              );

              const newTimeslotBody = await newTimeslotResponse.json();
              console.log(newTimeslotBody);
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
