import { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AirbnbRating, Button } from 'react-native-elements';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

export default function RestrictedProfileScreen({ route }) {
  const { restrictedProfile } = route.params;
  const { user, setUser } = useContext(LoginContext);
  const [rating, setRating] = useState(0);
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
        <AirbnbRating
          defaultRating={0}
          onFinishRating={(number) => setRating(number)}
        />
        <Button
          title="Submit Rating"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={async (event) => {
            event.preventDefault();
            const updateProfile = await fetch(
              // use IP address instead of localhost
              `http://${IP}:3000/api/updateRating`,
              {
                method: 'PUT',
                body: JSON.stringify({
                  username: restrictedProfile.username,
                  rating: rating,
                }),
              },
            );
            const updatedProfile = await updateProfile.json();
            console.log(updatedProfile);
          }}
        />
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
