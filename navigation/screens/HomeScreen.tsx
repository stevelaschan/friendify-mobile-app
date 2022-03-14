import { useCallback, useContext, useState } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LoginContext } from '../../context/LoginContext';

export default function HomeScreen() {
  // refresh page on drag down
  const [refreshing, setRefreshing] = useState(false);
  const { user, setUser } = useContext(LoginContext);

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
  }, []);

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
});
