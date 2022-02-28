import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function SetTimeSlotScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
        Set Time Slot Screen
      </Text>
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
