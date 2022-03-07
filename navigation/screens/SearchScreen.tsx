import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { IP } from './SignupScreen';

// import { users } from '../../util/database';

export default function SearchScreen() {
  const [searchUser, setSearchUser] = useState('');

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
    <View style={styles.container}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Search Screen</Text>
      <Button title="test" />
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
    </View>
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
