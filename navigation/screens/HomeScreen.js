import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, Card } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LoginContext } from '../../context/LoginContext';
import { url } from './SignupScreen';

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
    color: 'white',
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
    backgroundColor: '#312e2e',
    borderColor: '#312e2e',
    borderRadius: 16,
    width: 'auto',
    borderWidth: 2,
  },
});

export default function HomeScreen({ navigation }) {
  const { user } = useContext(LoginContext);
  const [allProviders, setAllProviders] = useState([]);

  // get all providers from the database (without first and last name)

  useEffect(() => {
    const getProviders = async () => {
      const getProvidersResponse = await fetch(`${url}/api/getProviders`, {
        method: 'GET',
      });
      const getProvidersResponseBody = await getProvidersResponse.json();
      // get all the providers from the database
      setAllProviders(getProvidersResponseBody.providers);
    };
    getProviders().catch((error) => console.log(error));
  }, []);

  // filter out user with valid session token and alsl users who aren't providers
  const providers = allProviders.filter((provider) => {
    return provider.username !== user.username;
  });

  return (
    <ScrollView style={{ backgroundColor: '#121212' }}>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            marginTop: 24,
            marginBottom: 24,
            fontWeight: 'bold',
            color: 'white',
          }}
        >
          Welcome Back {user.firstName} {user.lastName}!
        </Text>
      </View>
      {providers.map((provider) => {
        return (
          <View key={provider.id}>
            <Card
              containerStyle={{
                borderRadius: 18,
                backgroundColor: '#121212',
                borderWidth: 0.5,
              }}
            >
              <Card.Title style={{ color: 'white' }}>
                {provider.username}
              </Card.Title>
              <Card.Divider />
              <Text style={styles.description}>
                {provider.shortDescription}
              </Text>
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
                      `${url}/api/providerProfile`,
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          id: provider.id,
                          username: provider.username,
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
                      `${url}/api/providerProfile`,
                      {
                        method: 'POST',
                        headers: {
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          id: provider.id,
                          username: provider.username,
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
