import React from "react";
import { StyleSheet, TextInput, Button, Picker } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function HabitCard({ onSave }) {
    const[habit, setHabit] = useState("");
    const[category, setCategory] = useState("");

return (
    <View style={styles.container}>
    <TextInput placeholder="Enter a habit" value="{habit}" onChangeText={setHabit} />
    <Picker selectedValue={category} onValueChange={(itemValue) => setCategory(itemValue)}>
        <Picker.Item label="Health" value="health" />
        <Picker.Item label="Productivity" value="productivity" />
        <Picker.Item label="Fitness" value="fitness" />
    </Picker>
    <Button title="Save Habit" onPress={() => onSave(habit, category)} />
    <Text>Habit: {habit}</Text>
    <Text>Category: {category}</Text>
    </View>
);
}

