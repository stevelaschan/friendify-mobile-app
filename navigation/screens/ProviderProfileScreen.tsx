import { RouteProp } from '@react-navigation/native';
import { useContext, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AirbnbRating, Button, Card } from 'react-native-elements';
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
      <Card containerStyle={styles.container}>
        <Card.Title style={styles.text}>
          {`${providerProfile.profile.firstName} ${providerProfile.profile.lastName}`}
        </Card.Title>
        <Card.Divider />
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text
            style={styles.text}
          >{`${providerProfile.profile.age} years old`}</Text>
          <Text style={styles.text}>What experience do I provide?</Text>
          <Text style={styles.text}>
            {providerProfile.profile.shortDescription}
          </Text>
          <AirbnbRating
            defaultRating={!providerProfile.rating ? 0 : providerProfile.rating}
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
                    providerId: providerProfile.profile.id,
                    rating: rating,
                  }),
                },
              );
              // const createRating = await createRatingResponse.json();
            }}
          />
          {/* <Button
          title="View Free Time Slots"
          buttonStyle={styles.button}
          containerStyle={styles.buttonContainer}
          onPress={navigation.navigate('ProviderTimeSlotScreen')}
        /> */}
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 48,
    borderRadius: 18,
    paddingBottom: 48,
    paddingTop: 28,
  },
  text: {
    fontSize: 20,
    margin: 18,
    flex: 1,
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
    marginTop: 48,
  },
});
