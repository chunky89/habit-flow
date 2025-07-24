import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CalendarView({ markedDates }) {
  // Simple fallback calendar view to avoid require() issues
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calendar View</Text>
      <Text style={styles.subtitle}>Habit tracking calendar</Text>
      {markedDates && Object.keys(markedDates).length > 0 && (
        <View style={styles.datesContainer}>
          <Text style={styles.sectionTitle}>Marked Dates:</Text>
          {Object.keys(markedDates).map(date => (
            <View key={date} style={styles.dateItem}>
              <Text style={styles.dateText}>{date}</Text>
              <Text style={styles.statusText}>
                {markedDates[date].marked ? '✓ Completed' : '○ Pending'}
              </Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  datesContainer: {
    marginTop: 10,
  },
  dateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dateText: {
    fontSize: 14,
    fontWeight: '500',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
  },
});
