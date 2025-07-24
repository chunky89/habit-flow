import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function AnalyticsScreen() {
    const data = [2, 3, 5, 1, 4, 6, 2]; // Sample data for the chart

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Weekly Habit Progress</Text>
            <LineChart
                data={{
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [{ data }]
                }}
                width={Dimensions.get("window").width - 30}
                height={220}
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#eee",
                    color: () => `#34D399`,
                }}
                style={{ marginVertical: 8, borderRadius: 16 }}
            />
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
});
    