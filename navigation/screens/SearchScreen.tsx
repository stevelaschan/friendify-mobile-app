import * as React from 'react';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

// import { users } from '../../util/database';

export default function SearchScreen() {
  const [searchUser, setSearchUser] = useState('');

  // React.useEffect(() => {
  //   async () => {
  //     const response = await fetch(baseUrl)
  //     const data = await response.json()
  //     setSearchUser(data)
  //   };
  // }, [searchUser]);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Search Screen</Text>
      <TextInput
        value={searchUser}
        onChangeText={setSearchUser}
        style={styles.input}
        placeholder="Search for name..."
      />
      {/* {users.map((user) => {
        return (
          <View key={user.id}>
            <Text>{user.first_name}</Text>
            <Text>{user.last_name}</Text>
            <Text>{user.age}</Text>
          </View>
        );
      })} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
