import { View, Text } from "react-native";
import React from "react";
import Header from "../Components/HomeScreen/Header";
import Colors from "../shared/Colors";
import CourseList from "../Components/HomeScreen/CourseList";

export default function HomeScreen() {
  return (
    <View>
      <View
        style={{
          padding: 20,
          backgroundColor: Colors.main,
          height: 250,
        }}
      >
        <Header />
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ marginTop: -90, marginBottom: 20 }}>
          <CourseList level={"Basic"} />
        </View>
        <CourseList level={"Advance"} />
      </View>
    </View>
  );
}
