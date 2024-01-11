import { View, Text } from "react-native";
import React from "react";
import Header from "../Components/HomeScreen/Header";
import Colors from "../shared/Colors";

export default function HomeScreen() {
  return (
    <View>
      <View style={{ backgroundColor: Colors.main, height: 250, padding: 20 }}>
        <Header />
      </View>
    </View>
  );
}
