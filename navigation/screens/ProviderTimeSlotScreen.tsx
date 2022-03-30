import { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { Timeslot } from '../../App';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

export default function ProviderTimeSlotScreen({ route }) {
  const { providerProfile } = route.params;
  const { user } = useContext(LoginContext);
  // const [providerTimeslots, setProviderTimeslots] = useState(
  //   providerProfile.timeslots,
  // );

  // console.log(providerTimeslots);

  return (
    <FlatGrid
      itemDimension={130}
      data={providerProfile.timeslots}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <View>
          {!item.userUsername ? (
            <View>
              <Text>{item.timeslotDate.toString().split('T')[0]}</Text>
              <Button
                buttonStyle={styles.itemContainer}
                title={item.timeslotTime}
                onPress={async (event) => {
                  event.preventDefault();
                  const bookTimeslotResponse = await fetch(
                    // use IP address instead of localhost
                    `http://${IP}:3000/api/updateTimeslot`,
                    {
                      method: 'PUT',
                      body: JSON.stringify({
                        userUsername: user.username,
                        providerUsername: providerProfile.profile.username,
                        date: item.timeslotDate,
                        time: item.timeslotTime,
                      }),
                    },
                  );
                  const bookedTimeslotResponseBody =
                    await bookTimeslotResponse.json();

                  // const timeslotsUpdated = providerTimeslots.filter(
                  //   (timeslot: Timeslot) =>
                  //     timeslot.id !== bookedTimeslotResponseBody.id,
                  // );
                  // setProviderTimeslots(timeslotsUpdated);

                  alert(
                    `${item.timeslotTime} on ${
                      item.timeslotDate.toString().split('T')[0]
                    } booked!`,
                  );
                }}
              />
            </View>
          ) : (
            <View />
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
  //   selectedDay: {
  //     top: 40,
  //     left: 10,
  //     color: 'white',
  //   },
});
