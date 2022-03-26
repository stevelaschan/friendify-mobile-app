import { RouteProp } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AirbnbRating, Button } from 'react-native-elements';
import { RootStackParams } from '../../App';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

type ProviderProfileRouteParams = RouteProp<
  RootStackParams,
  'ProviderProfileScreen'
>;

export default function ProviderProfileScreen({
  route,
}: ProviderProfileRouteParams) {
  const { providerProfile } = route.params;
  const { user } = useContext(LoginContext);
  const [rating, setRating] = useState(0);
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={{ fontSize: 26, fontWeight: 'bold', marginBottom: 32 }}>
          Provider's Profile
        </Text>
        <Text style={styles.text}>{providerProfile.profile.firstName}</Text>
        <Text style={styles.text}>{providerProfile.profile.lastName}</Text>
        <Text style={styles.text}>{providerProfile.profile.age}</Text>
        <Text style={styles.text}>
          {providerProfile.profile.shortDescription}
        </Text>
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
            await fetch(
              // use IP address instead of localhost
              `http://${IP}:3000/api/createRating`,
              {
                method: 'POST',
                body: JSON.stringify({
                  userId: user.id,
                  providerId: providerProfile.id.id,
                  rating: rating,
                }),
              },
            );
            // const createRating = await createRatingResponse.json();
            // console.log(createRating);
          }}
        />
        {/* <Button
          title="View Free Time Slots"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={navigation.navigate('ProviderTimeSlotScreen')}
        /> */}
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
