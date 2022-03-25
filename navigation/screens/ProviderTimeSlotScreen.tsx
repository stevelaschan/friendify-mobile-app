import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { FlatGrid } from 'react-native-super-grid';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

export default function ProviderTimeSlotScreen({ route }) {
  const { providerProfile } = route.params;
  const { user } = useContext(LoginContext);
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
          <Text>{item.timeslotDate}</Text>
          <Button
            buttonStyle={styles.itemContainer}
            title={item.timeslotTime}
            onPress={async (event) => {
              event.preventDefault();
              await fetch(
                // use IP address instead of localhost
                `http://${IP}:3000/api/updateTimeslot`,
                {
                  method: 'PUT',
                  body: JSON.stringify({
                    username: user.username,
                    providerId: providerProfile.id.id,
                    date: item.timeslotDate,
                    time: item.timeslotTime,
                  }),
                },
              );
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
  //   selectedDay: {
  //     top: 40,
  //     left: 10,
  //     color: 'white',
  //   },
});
