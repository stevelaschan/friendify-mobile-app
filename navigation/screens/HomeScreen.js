import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AirbnbRating, Button, Card } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 22,
  },
  description: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    marginTop: 4,
  },
  stars: {
    marginTop: 18,
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 14,
  },
  button: {
    backgroundColor: 'rgba(18, 57, 162, 0.8)',
    borderColor: 'white',
    borderRadius: 16,
    width: 'auto',
    borderWidth: 4,
  },
});

export default function HomeScreen({ navigation }) {
  const { user } = useContext(LoginContext);
  const [allProviders, setAllProviders] = useState([]);

  // get all Users from the database (without first and last name)

  useEffect(() => {
    const getProviders = async () => {
      const getProvidersResponse = await fetch(
        // use IP address instead of localhost
        `http://${IP}:3000/api/getProviders`,
        {
          method: 'GET',
        },
      );
      const getProvidersResponseBody = await getProvidersResponse.json();
      // get all the users from the database
      setAllProviders(getProvidersResponseBody);
    };
    getProviders().catch(() => {});
  }, []);

  // filter out user with valid session token and all users who aren't providers
  const providers = allProviders.filter((userObject) => {
    return userObject.id !== user.id;
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 16,
            marginBottom: 16,
            fontWeight: 'bold',
          }}
        >
          Welcome Back {user.firstName} {user.lastName}!
        </Text>
      </View>
      {providers.map((provider) => {
        return (
          <View key={provider.id}>
            <Card containerStyle={{ borderRadius: 18 }}>
              <Card.Title>{provider.username}</Card.Title>
              <Card.Divider />
              <Text style={styles.description}>
                {provider.shortDescription}
              </Text>
              <View style={styles.stars}>
                <AirbnbRating
                  showRating={false}
                  size={24}
                  isDisabled={true}
                  defaultRating={0}
                />
              </View>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <Button
                  icon={
                    <Ionicons name="person-outline" size={24} color="white" />
                  }
                  buttonStyle={styles.button}
                  containerStyle={styles.buttonsContainer}
                  titleStyle={{ fontWeight: 'bold' }}
                  onPress={async () => {
                    const getRestrictedProfileResponse = await fetch(
                      // use IP address instead of localhost
                      `http://${IP}:3000/api/providerProfile`,
                      {
                        method: 'POST',
                        body: JSON.stringify({
                          id: provider.id,
                        }),
                      },
                    );
                    const providerProfile =
                      await getRestrictedProfileResponse.json();
                    // get provider information and pass it as param to provider profile screen
                    navigation.navigate('ProviderProfileScreen', {
                      providerProfile: providerProfile,
                    });
                  }}
                />
                <Button
                  icon={
                    <Ionicons name="grid-outline" size={24} color="white" />
                  }
                  buttonStyle={styles.button}
                  containerStyle={styles.buttonsContainer}
                  onPress={async () => {
                    const getRestrictedProfileResponse = await fetch(
                      // use IP address instead of localhost
                      `http://${IP}:3000/api/providerProfile`,
                      {
                        method: 'POST',
                        body: JSON.stringify({
                          id: provider.id,
                        }),
                      },
                    );
                    const providerProfile =
                      await getRestrictedProfileResponse.json();
                    // get provider information and pass it as param to provider timeslot screen
                    navigation.navigate('ProviderTimeSlotScreen', {
                      providerProfile: providerProfile,
                    });
                  }}
                />
              </View>
            </Card>
          </View>
        );
      })}
    </ScrollView>
  );
}
