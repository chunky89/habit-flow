import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const stored = await AsyncStorage.getItem('habits');
        if (stored) {
          setHabits(JSON.parse(stored));
        }
      } catch (error) {
        console.error('Error loading habits:', error);
      }
    };

    // Load habits initially
    loadHabits();

    // Add navigation listener if available
    if (navigation && navigation.addListener) {
      const unsubscribe = navigation.addListener('focus', loadHabits);
      return unsubscribe;
    }
  }, [navigation]);

  const toggleCheck = async (index) => {
    try {
      const updated = [...habits];
      updated[index].checked = !updated[index].checked;
      setHabits(updated);
      await AsyncStorage.setItem('habits', JSON.stringify(updated));
    } catch (error) {
      console.error('Error toggling habit:', error);
    }
  };

  const navigateToAddHabit = () => {
    console.log('Navigating to AddHabit screen...');
    if (navigation && navigation.navigate) {
      navigation.navigate('AddHabit');
    } else {
      console.error('Navigation not available');
    }
  };

  const renderHabit = ({ item, index }) => (
    <View style={styles.habitCard}>
      <View style={styles.habitInfo}>
        <Text style={styles.habitName}>{item.name}</Text>
        {item.time && (
          <Text style={styles.habitTime}>{item.time}</Text>
        )}
      </View>
      <TouchableOpacity
        style={[styles.checkButton, item.checked && styles.checkedButton]}
        onPress={() => toggleCheck(index)}
        activeOpacity={0.7}
      >
        <Text style={[styles.checkIcon, item.checked && styles.checkedIcon]}>
          {item.checked ? '✓' : '○'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Habit Flow</Text>
        <Text style={styles.subtitle}>Build better habits, one day at a time</Text>
      </View>

      {/* Add Habit Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={navigateToAddHabit}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonIcon}>+</Text>
        <Text style={styles.addButtonText}>Add New Habit</Text>
      </TouchableOpacity>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        <TouchableOpacity 
          style={[styles.navButton, styles.analyticsButton]}
          onPress={() => navigation.navigate('Analytics')}
          activeOpacity={0.8}
        >
          <Text style={styles.navIcon}>📊</Text>
          <Text style={styles.navText}>Analytics</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, styles.calendarButton]}
          onPress={() => navigation.navigate('Calendar')}
          activeOpacity={0.8}
        >
          <Text style={styles.navIcon}>📅</Text>
          <Text style={styles.navText}>Calendar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, styles.settingsButton]}
          onPress={() => navigation.navigate('Settings')}
          activeOpacity={0.8}
        >
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navText}>Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Habits List */}
      <FlatList
        data={habits}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderHabit}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>🌟</Text>
            <Text style={styles.emptyTitle}>No habits yet!</Text>
            <Text style={styles.emptyText}>
              Start building your routine by adding your first habit
            </Text>
            <TouchableOpacity 
              style={styles.emptyButton}
              onPress={navigateToAddHabit}
            >
              <Text style={styles.emptyButtonText}>+ Add Your First Habit</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  navigationContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  navButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  analyticsButton: {
    backgroundColor: '#34C759',
  },
  calendarButton: {
    backgroundColor: '#FF9500',
  },
  settingsButton: {
    backgroundColor: '#8E8E93',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  habitCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  habitTime: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '500',
  },
  checkButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  checkedButton: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  checkIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8E8E93',
  },
  checkedIcon: {
    color: '#FFFFFF',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  emptyButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  emptyButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});

