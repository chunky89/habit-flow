import AsyncStorage from '@react-native-async-storage/async-storage';

const HABITS_KEY = 'habits';
const LOGS_KEY = 'habit_logs';

// Validate AsyncStorage is available
if (!AsyncStorage) {
  console.error('AsyncStorage is not available');
}

export async function saveHabits(habits) {
  try {
    if (!habits) {
      throw new Error('Habits data is required');
    }
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
  } catch (error) {
    console.error('Error saving habits:', error);
    throw error;
  }
}

export async function loadHabits() {
  try {
    const data = await AsyncStorage.getItem(HABITS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading habits:', error);
    return [];
  }
}

export async function saveLogs(logs) {
  try {
    if (!logs) {
      throw new Error('Logs data is required');
    }
    await AsyncStorage.setItem(LOGS_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('Error saving logs:', error);
    throw error;
  }
}

export async function loadLogs() {
  try {
    const data = await AsyncStorage.getItem(LOGS_KEY);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error loading logs:', error);
    return {};
  }
}

export async function resetDailyCheckIns() {
  try {
    const habits = await loadHabits();
    const reset = habits.map(h => ({ ...h, checked: false }));
    await saveHabits(reset);
  } catch (error) {
    console.error('Error resetting daily check-ins:', error);
    throw error;
  }
}
