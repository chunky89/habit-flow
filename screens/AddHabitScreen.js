import React, { useState} from 'react';
import { View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddHabitScreen({ navigation }) {
    const [habit, setHabit] = useState('');
    const [category, setCategory] = useState('');
    
    const saveHabit = async () => {
        if (!habit || !category) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
        }
    
        const newHabit = { name: habit, category, checked: false };
        const storedHabits = await AsyncStorage.getItem('habits');
        const habits = storedHabits ? JSON.parse(storedHabits) : [];
        habits.push(newHabit);
        
        await AsyncStorage.setItem('habits', JSON.stringify(habits));
        navigation.goBack();
    };
    
    return (
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Enter a habit"
            value={habit}
            onChangeText={setHabit}
        />
        <TextInput
            style={styles.input}
            placeholder="Enter a category"
            value={category}
            onChangeText={setCategory}
        />
        <Button title="Save Habit" onPress={saveHabit} />
        </View>
    );
    }

    const styles = StyleSheet.create({
        container: { flex: 1, padding: 20, backgroundColor: '#fff' },
        input: {
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            padding: 10,
            marginBottom: 16,

        },
    });