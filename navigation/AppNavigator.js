import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddHabitScreen from '../screens/AddHabitScreen';
import AnalyticsScreen from '../screens/AnalyticsScreen';
import CalendarScreen from '../screens/CalendarScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F8F9FA',
          },
          headerTintColor: '#1C1C1E',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}
      >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="AddHabit" 
          component={AddHabitScreen}
          options={{ 
            title: 'Add New Habit',
            headerBackTitle: 'Back'
          }}
        />
        <Stack.Screen 
          name="Analytics" 
          component={AnalyticsScreen}
          options={{ title: 'Analytics' }}
        />
        <Stack.Screen 
          name="Calendar" 
          component={CalendarScreen}
          options={{ title: 'Calendar' }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{ title: 'Settings' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


