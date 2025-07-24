import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CalendarView from "../components/CalendarView";

const markedDates = {
  '2025-07-21': { marked: true, dotColor: 'red' },
  '2025-07-22': { marked: true, dotColor: 'green' },
  '2025-07-23': { marked: true, dotColor: 'green' },
};

export default function CalendarScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Tracker Calendar</Text>
      <CalendarView markedDates={markedDates} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
});
  