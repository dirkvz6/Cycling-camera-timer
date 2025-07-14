import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, User, Trophy } from 'lucide-react-native';
import { useTimingStore } from '@/stores/timingStore';

export default function HistoryScreen() {
  const { races, clearHistory } = useTimingStore();

  const formatTime = (milliseconds: number): string => {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderRaceItem = ({ item }: { item: any }) => (
    <View style={styles.raceCard}>
      <View style={styles.raceHeader}>
        <View style={styles.riderInfo}>
          <User size={20} color="#2563EB" />
          <Text style={styles.riderName}>{item.riderName}</Text>
        </View>
        <Text style={styles.raceDate}>{formatDate(item.endTime)}</Text>
      </View>
      
      <View style={styles.timeInfo}>
        <View style={styles.totalTime}>
          <Trophy size={24} color="#F59E0B" />
          <Text style={styles.totalTimeText}>{formatTime(item.totalTime)}</Text>
        </View>
      </View>

      {item.lapTimes.length > 1 && (
        <View style={styles.lapTimesSection}>
          <Text style={styles.lapTimesHeader}>Lap Times:</Text>
          {item.lapTimes.map((lapTime: number, index: number) => (
            <View key={index} style={styles.lapTimeRow}>
              <Text style={styles.lapNumber}>Lap {index + 1}:</Text>
              <Text style={styles.lapTimeText}>{formatTime(lapTime)}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Clock size={64} color="#9CA3AF" />
      <Text style={styles.emptyTitle}>No Races Recorded</Text>
      <Text style={styles.emptyText}>
        Start timing races to see your history here.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Race History</Text>
        {races.length > 0 && (
          <TouchableOpacity
            style={styles.clearButton}
            onPress={clearHistory}
          >
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={races.slice().reverse()}
        renderItem={renderRaceItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={EmptyState}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  clearButton: {
    backgroundColor: '#EF4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  clearButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  listContainer: {
    padding: 20,
    flexGrow: 1,
  },
  raceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  raceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  riderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  riderName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  raceDate: {
    fontSize: 14,
    color: '#6B7280',
  },
  timeInfo: {
    marginBottom: 16,
  },
  totalTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    padding: 12,
    borderRadius: 12,
  },
  totalTimeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#92400E',
    marginLeft: 12,
    fontFamily: 'monospace',
  },
  lapTimesSection: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  lapTimesHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  lapTimeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  lapNumber: {
    fontSize: 14,
    color: '#6B7280',
  },
  lapTimeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    fontFamily: 'monospace',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});