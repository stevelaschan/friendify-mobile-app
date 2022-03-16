import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function OtherUserTimeSlotScreen() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 32 }}>
          Other User's TimeSlots
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  button: {
    backgroundColor: 'rgba(18, 57, 162, 0.8)',
    borderColor: 'transparent',
    borderWidth: 0,
    borderRadius: 5,
  },
  buttonContainer: {
    width: 200,
    marginVertical: 10,
  },
});
