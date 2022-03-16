import { useCallback, useEffect, useState } from 'react';
import {
  Button,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { IP } from './SignupScreen';

export default function SearchScreen({ navigation }) {
  const [searchUser, setSearchUser] = useState<string>('');
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  // refresh page on drag down
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

  // const searchFilterFunction = (text) => {
  //   // Check if searched text is not blank
  //   if (text) {
  //     // Inserted text is not blank
  //     // Filter the allUsers
  //     // Update FilteredUsers
  //     const newData = allUsers.filter(function (user) {
  //       const userData = user ? user.toUpperCase() : ''.toUpperCase();
  //       const textData = text.toUpperCase();
  //       return userData.indexOf(textData) > -1;
  //     });
  //     setFilteredUsers(newData);
  //     setSearchUser(text);
  //   } else {
  //     // Inserted text is blank
  //     // Update FilteredDataSource with allUsers
  //     setFilteredUsers(allUsers);
  //     setSearchUser(text);
  //   }
  // };

  // const userView = ({ user }) => {
  //   return (
  //     // Flat List Item
  //     <Text>{user.username}</Text>
  //   );
  // };

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
        <Text
          style={{ fontSize: 26, fontWeight: 'bold', alignItems: 'center' }}
        >
          Search Screen
        </Text>
      </View>
      {/* <TextInput
        value={searchUser}
        onChangeText={(text) => searchFilterFunction(text)}
        style={styles.input}
        placeholder="Search for name..."
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(user, index) => index.toString()}
        renderItem={userView}
      /> */}
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
