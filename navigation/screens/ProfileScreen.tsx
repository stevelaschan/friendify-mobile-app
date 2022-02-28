import * as React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const users = {
  id: 1,
  first_name: 'Stefan',
  last_name: 'Laschan',
  age: 28,
  short_description: 'Hello, nice to meet you! This is my Profile page!',
};

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Profile Screen</Text>
      <Text>{users.first_name}</Text>
      <Text>{users.last_name}</Text>
      <Text>{users.age}</Text>
      <Text>{users.short_description}</Text>
      <Button
        title="Sign out"
        onPress={() => navigation.navigate('LoginStack')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
