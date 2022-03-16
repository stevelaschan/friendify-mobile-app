import { useCallback, useContext, useEffect, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import { LoginContext } from '../../context/LoginContext';
import { IP } from './SignupScreen';

export default function HomeScreen({ navigation }) {
  // refresh page on drag down
  const [refreshing, setRefreshing] = useState(false);
  const { user } = useContext(LoginContext);
  const [allUsers, setAllUsers] = useState([]);

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
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

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Home Screen</Text>
        <Text style={{ fontSize: 20 }}>
          Welcome Back {user.firstName} {user.lastName}!
        </Text>
      </View>
      {allUsers.map((singleUser) => {
        return (
          <View key={singleUser.id}>
            <Button
              title={singleUser.username}
              buttonStyle={{
                backgroundColor: 'black',
                borderWidth: 4,
                borderColor: 'white',
                borderRadius: 30,
                padding: 36,
              }}
              containerStyle={{
                // flex: 1,
                // flexDirection: 'row',
                // flexWrap: 'wrap',
                width: 200,
                marginHorizontal: 80,
                marginVertical: 10,
              }}
              titleStyle={{ fontWeight: 'bold' }}
              onPress={async () => {
                // console.log(user.username);
                const getRestrictedProfileResponse = await fetch(
                  // use IP address instead of localhost
                  `http://${IP}:3000/api/restrictedProfile`,
                  {
                    method: 'POST',
                    body: JSON.stringify({
                      username: singleUser.username,
                    }),
                  },
                );
                const restrictedProfile =
                  await getRestrictedProfileResponse.json();
                navigation.navigate('RestrictedProfileScreen', {
                  restrictedProfile: restrictedProfile,
                });
              }}
            />
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
  profiles: {
    flex: 1,
  },
});
