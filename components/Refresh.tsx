import { useCallback, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';

export default function Refresh() {
  // refresh page on drag down
  const [refreshing, setRefreshing] = useState(false);

  const wait = (timeout: number) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(1000)
      .then(() => setRefreshing(false))
      .catch(() => {});
  }, []);
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
}
