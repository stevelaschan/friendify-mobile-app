import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AirbnbRating, Button } from 'react-native-elements';

export default function RestrictedProfileScreen({ route }) {
  const { restrictedProfile } = route.params;
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 32 }}>
          Other User's Profile
        </Text>
        <Text style={styles.text}>{restrictedProfile.firstName}</Text>
        <Text style={styles.text}>{restrictedProfile.lastName}</Text>
        <Text style={styles.text}>{restrictedProfile.age}</Text>
        <Text style={styles.text}>{restrictedProfile.shortDescription}</Text>
        <AirbnbRating />
        <Button
          title="View Free Time Slots"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
        />
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
