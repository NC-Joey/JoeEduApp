import { View, Text } from "react-native";
import React from "react";
import Colors from "../shared/Colors";

export default function SubHeading({ text, color = Colors.black }) {
  return (
    <View>
      <Text style={{ color: color, fontFamily: "outfit-bold", fontSize: 24 }}>
        {text}
      </Text>
    </View>
  );
}
