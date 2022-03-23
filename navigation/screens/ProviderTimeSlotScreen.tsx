import { useContext } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Button } from 'react-native-elements';
import { LoginContext } from '../../context/LoginContext';

export default function ProviderTimeSlotScreen({ route }) {
  const { providerProfile } = route.params;
  const { user } = useContext(LoginContext);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 32 }}>
          Provider's TimeSlots
        </Text>
        <Calendar />
        <View style={styles.itemContainer}>
          {providerProfile.timeslots.map((timeslot) => {
            return (
              <Button
                key={timeslot.id}
                title={timeslot.timeslotTime}
                buttonStyle={styles.itemButton}
                onPress={() => console.log(timeslot)}
              />
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // container: {
  //   flex: 1,
  //   marginTop: 22,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  text: {
    fontSize: 18,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  itemButton: {
    justifyContent: 'center',
    borderRadius: 8,
    padding: 10,
    height: 100,
    backgroundColor: '#383838',
  },
});
