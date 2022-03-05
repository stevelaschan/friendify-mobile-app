import * as React from 'react';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import { Avatar, Card } from 'react-native-paper';

const users = {
  first_name: 'Stefan',
  last_name: 'Laschan',
  age: 28,
};

export default function CalendarScreen({ navigation }) {
  const [items, setItems] = useState({});

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = 0; i < 2; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = 1; // how many items per day
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Time Spot for ' + users.first_name + ' ' + users.last_name,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17 }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>{item.name}</Text>
              <Avatar.Text
                label={users.first_name.charAt(0) + users.last_name.charAt(0)}
              />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={'2022-04-05'}
        renderItem={renderItem}
        theme={{
          agendaTodayColor: 'red',
        }}
      />
      <Button
        title="Set Time Slot"
        onPress={() => navigation.navigate('SetTimeSlotStack')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    top: 50,
  },
});
