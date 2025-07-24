import React from "react";
import { LineChart } from "react-native-chart-kit";
import { Dimensions, StyleSheet } from "react-native";

export default function ProgressChart({ data }) {
    return (

       <LineChart
      data={{
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [{ data }],
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
  );
}
