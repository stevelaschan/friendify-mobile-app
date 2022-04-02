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
    bottom: 90,
    left: 10,
    color: 'white',
  },
});

export default function ProviderTimeSlotScreen({ route }) {
  const { providerProfile } = route.params;
  const { user } = useContext(LoginContext);

  return (
    <FlatGrid
      itemDimension={130}
      data={providerProfile.timeslots}
      style={styles.gridView}
      spacing={10}
      renderItem={({ item }) => (
        <View>
          {!item.userUsername ? (
            <View>
              <Button
                buttonStyle={styles.itemContainer}
                title={item.timeslotTime}
                onPress={async (event) => {
                  event.preventDefault();
                  const bookTimeslotResponse = await fetch(
                    // use IP address instead of localhost
                    `${url}/api/updateTimeslot`,
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
                  await bookTimeslotResponse.json();

                  alert(
                    `${item.timeslotTime} on ${
                      item.timeslotDate.toString().split('T')[0]
                    } booked!`,
                  );
                }}
              />
              <Text style={styles.selectedDay}>
                {item.timeslotDate.toString().split('T')[0]}
              </Text>
            </View>
          ) : (
            <View />
          )}
        </View>
      )}
    />
  );
}
