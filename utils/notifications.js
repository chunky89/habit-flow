import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Request permissions
export async function requestPermissions() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('Failed to get push token for push notification!');
    return false;
  }
  return true;
}

// Schedule habit reminder with error handling
export async function scheduleHabitReminder(habit) {
  try {
    // Request permissions first
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    // Validate habit object
    if (!habit || !habit.name || !habit.time) {
      console.error('Invalid habit object:', habit);
      return;
    }

    const identifier = await Notifications.scheduleNotificationAsync({
      content: {
        title: "Habit Reminder",
        body: `Time to: ${habit.name}`,
      },
      trigger: {
        hour: habit.time.hour || 9, // Default to 9 AM if not specified
        minute: habit.time.minute || 0, // Default to 0 minutes
        repeats: true,
      },
    });

    console.log('Notification scheduled with ID:', identifier);
    return identifier;
  } catch (error) {
    console.error('Error scheduling notification:', error);
  }
}

// Cancel a specific notification
export async function cancelHabitReminder(notificationId) {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  } catch (error) {
    console.error('Error canceling notification:', error);
  }
}
