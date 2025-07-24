import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HabitCard({ habit, category }) {
    const[checked, setChecked] = useState(false);

    const toggleCheck = () => {
        setChecked(prev => !prev);

    };

return (
<View>
        <Text style={styles.habitText}>{habit}</Text>
        <Text style={styles.categoryText}>{category}</Text>
        <TouchableOpacity onPress={toggleCheck} style={styles.checkbox}>
            {checked && <Text style={styles.checkmark}>✓</Text>}
        </TouchableOpacity>
    </View>
);

}

const styles = StyleSheet.create({
    card: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    habitText: {
        fontSize: 18,
        fontWeight: "bold",
    },
    categoryText: {
        fontSize: 14,
        color: "#666",
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 1,
        borderColor: "#ccc",
        alignItems: "center",
        justifyContent: "center",
    },
    checkmark: {
        fontSize: 18,
        color: "green",
    },
});
