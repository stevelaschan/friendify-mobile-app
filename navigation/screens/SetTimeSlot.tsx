// import DateTimePicker from '@react-native-community/datetimepicker';
// import { useState } from 'react';
// import { ScrollView, StyleSheet, Text, View } from 'react-native';
// import { Button, Input } from 'react-native-elements';

// export default function SetTimeSlotScreen() {
//   const [date, setDate] = useState(new Date());
//   const [time, setTime] = useState('');

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <Text style={{ fontSize: 26, fontWeight: 'bold' }}>
//           Set Time Slot Screen
//         </Text>
//         {/* <DateTimePicker
//           value={date}
//           onChange={() => console.log(setDate(date))}
//           style={{ flex: 1, width: 250 }}
//           display="spinner"
//           mode="date"
//         /> */}
//         <View style={styles.buttons}>
//           <Button title="0:00 - 1:00" buttonStyle={styles.button} />
//           <Button title="1:00 - 2:00" buttonStyle={styles.button} />
//           <Button title="2:00 - 3:00" buttonStyle={styles.button} />
//           <Button title="3:00 - 4:00" buttonStyle={styles.button} />
//           <Button title="4:00 - 5:00" buttonStyle={styles.button} />
//           <Button title="5:00 - 6:00" buttonStyle={styles.button} />
//           <Button title="6:00 - 7:00" buttonStyle={styles.button} />
//           <Button title="7:00 - 8:00" buttonStyle={styles.button} />
//           <Button title="8:00 - 9:00" buttonStyle={styles.button} />
//           <Button title="9:00 - 10:00" buttonStyle={styles.button} />
//           <Button title="10:00 - 11:00" buttonStyle={styles.button} />
//           <Button title="11:00 - 12:00" buttonStyle={styles.button} />
//           <Button title="12:00 - 13:00" buttonStyle={styles.button} />
//           <Button title="13:00 - 14:00" buttonStyle={styles.button} />
//           <Button title="14:00 - 15:00" buttonStyle={styles.button} />
//           <Button title="15:00 - 16:00" buttonStyle={styles.button} />
//           <Button title="16:00 - 17:00" buttonStyle={styles.button} />
//           <Button title="17:00 - 18:00" buttonStyle={styles.button} />
//           <Button title="18:00 - 19:00" buttonStyle={styles.button} />
//           <Button title="19:00 - 20:00" buttonStyle={styles.button} />
//           <Button title="20:00 - 21:00" buttonStyle={styles.button} />
//           <Button title="21:00 - 22:00" buttonStyle={styles.button} />
//           <Button title="22:00 - 23:00" buttonStyle={styles.button} />
//           <Button title="23:00 - 24:00" buttonStyle={styles.button} />
//           {/* <Button title="Set Time Slot" buttonStyle={styles.button} /> */}
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttons: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//   },
//   button: {
//     flex: 1,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
// });

import { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlatGrid } from 'react-native-super-grid';

export default function SetTimeslotScreen() {
  const [items, setItems] = useState([
    { name: '0:00 - 1:00', code: '#1abc9c' },
    { name: '1:00 - 2:00', code: '#2ecc71' },
    { name: '2:00 - 3:00', code: '#3498db' },
    { name: '3:00 - 4:00', code: '#9b59b6' },
    { name: '4:00 - 5:00', code: '#34495e' },
    { name: '5:00 - 6:00', code: '#16a085' },
    { name: '6:00 - 7:00', code: '#27ae60' },
    { name: '7:00 - 8:00', code: '#2980b9' },
    { name: '8:00 - 9:00', code: '#8e44ad' },
    { name: '9:00 - 10:00', code: '#2c3e50' },
    { name: '11:00 - 12:00', code: '#f1c40f' },
    { name: '12:00 - 13:00', code: '#e67e22' },
    { name: '13:00 - 14:00', code: '#e74c3c' },
    { name: '14:00 - 15:00', code: '#198ca8' },
    { name: '15:00 - 16:00', code: '#95a5a6' },
    { name: '16:00 - 17:00', code: '#f39c12' },
    { name: '17:00 - 18:00', code: '#d35400' },
    { name: '18:00 - 19:00', code: '#c0392b' },
    { name: '19:00 - 20:00', code: '#bdc3c7' },
    { name: '20:00 - 21:00', code: '#7f8c8d' },
    { name: '21:00 - 22:00', code: '#1f3d3f' },
    { name: '22:00 - 23:00', code: '#24b489' },
    { name: '23:00 - 24:00', code: '#3f1a27' },
  ]);

  return (
    <FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      spacing={10}
      renderItem={({ item }) => (
        <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
          <Button
            title={item.name}
            color="white"
            onPress={() => console.log(item.name)}
          />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemCode: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});
