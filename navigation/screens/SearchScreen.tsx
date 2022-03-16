import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { IP } from './SignupScreen';

export default function SearchScreen({ navigation }) {
  const [search, setSearch] = useState<string>('');
  const [allUsers, setAllUsers] = useState([]);
  // const [filteredUsers, setFilteredUsers] = useState([]);

  // get all users from the database
  useEffect(() => {
    getUser().catch(() => {});
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

  // search for user
  const updateSearch = () => {
    setSearch(search);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{ fontSize: 26, fontWeight: 'bold', alignItems: 'center' }}
        >
          Search Screen
        </Text>
        <View style={styles.input}>
          {/* <SearchBar
            placeholder="Type Here..."
            onChangeText={updateSearch}
            value={search}
          /> */}
        </View>
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
    margin: 10,
    width: 300,
  },
});
