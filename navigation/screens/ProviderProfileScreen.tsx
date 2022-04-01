import { RouteProp } from '@react-navigation/native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AirbnbRating, Card } from 'react-native-elements';
import { RootStackParams } from '../../App';

type ProviderProfileRouteParams = RouteProp<
  RootStackParams,
  'ProviderProfileScreen'
>;

export default function ProviderProfileScreen({
  route,
}: ProviderProfileRouteParams) {
  const { providerProfile } = route.params;
  return (
    <ScrollView style={{ backgroundColor: '#121212' }}>
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
            isDisabled={true}
          />
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
    backgroundColor: '#312e2e',
  },
  text: {
    fontSize: 20,
    margin: 18,
    flex: 1,
    color: 'white',
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
