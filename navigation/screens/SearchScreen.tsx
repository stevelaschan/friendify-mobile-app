import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { IP } from './SignupScreen';

export default function SearchScreen() {
  const [searchUser, setSearchUser] = useState<string>('');
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  // useEffect(() => {
  //   getUser();
  // }, [searchUser]);

  // const getUser = async () => {
  //   const getUserResponse = await fetch(
  //     // use IP address instead of localhost
  //     `http://${IP}:3000/api/getUser`,
  //     {
  //       method: 'GET',
  //     },
  //   );
  //   const getUserResponseJson = await getUserResponse.json();
  //   console.log(getUserResponseJson);
  // };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.container}>
        <Text
          style={{ fontSize: 26, fontWeight: 'bold', alignItems: 'center' }}
        >
          Search Screen
        </Text>
      </View>
      {/* <TextInput
        value={searchUser}
        onChangeText={getUser}
        style={styles.input}
        placeholder="Search for name..."
      /> */}
      <View>
        {/* <Text>{searchUser}</Text> */}
        {/* <Text>{searchUser.last_name}</Text>
        <Text>{searchUser.age}</Text> */}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 22,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    borderRadius: 8,
    width: 240,
    fontSize: 18,
  },
});
