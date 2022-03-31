import { View, StyleSheet } from 'react-native';
import { AirbnbRating, Button, Text } from 'react-native-elements';
import { useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 96,
  },
  text: {
    fontSize: 22,
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

export default function RatingScreen({ route }) {
  const { provider } = route.params;
  const { rating, setRating, user } = useContext(LoginContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        How would you rate the experience with {provider}?
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
                providerUsername: provider,
                rating: rating,
              }),
            },
          );
          alert(`Thank you for rating ${provider}`);
          // const createRating = await createRatingResponse.json();
        }}
      />
    </View>
  );
}
