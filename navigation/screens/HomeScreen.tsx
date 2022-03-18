import { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AirbnbRating, Button, Card } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { User } from '../../App';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

export default function HomeScreen({ navigation }) {
  const { user } = useContext(LoginContext);
  const [allUsers, setAllUsers] = useState([]);

  // get all Users from the database (without first and last name)
  type UserObject = {
    id: number;
    username: string;
    age: string;
    isProvider: boolean;
  };

  useEffect(() => {
    const getUsers = async () => {
      const getUserResponse = await fetch(
        // use IP address instead of localhost
        `http://${IP}:3000/api/getUsers`,
        {
          method: 'GET',
        },
      );
      const users = await getUserResponse.json();
      setAllUsers(users);
    };
    getUsers().catch(() => {});
  }, []);

  // filter out the one user which is logged in and has a valid session token
  const otherUsers = allUsers.filter((userObject: UserObject) => {
    if (userObject.isProvider) {
      return userObject.id !== user.id;
    }
    return null;
  });

  return (
    <ScrollView>
      <View style={styles.container}>
        {/* <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen</Text> */}
        <Text
          style={{
            fontSize: 20,
            marginTop: 16,
            marginBottom: 16,
          }}
        >
          Welcome Back {user.firstName} {user.lastName}!
        </Text>
      </View>
      {otherUsers.map((singleUser: User) => {
        return (
          <View key={singleUser.id}>
            <Card>
              <Card.Title>{singleUser.username}</Card.Title>
              <Card.Divider />
              <Text style={styles.description}>
                {singleUser.shortDescription}
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
                          id: singleUser.id,
                        }),
                      },
                    );
                    const providerProfile =
                      await getRestrictedProfileResponse.json();
                    // console.log(providerProfile);
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
                  onPress={() => navigation.navigate('ProviderTimeSlotScreen')}
                />
              </View>
            </Card>
          </View>
        );
      })}
    </ScrollView>
  );
}

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
    backgroundColor: '#383838',
    borderColor: 'white',
    borderRadius: 16,
    width: 'auto',
    borderWidth: 4,
  },
});
