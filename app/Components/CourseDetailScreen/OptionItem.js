import { View, Text, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../shared/Colors";

export default function OptionItem(props) {
  // useEffect(() => {
  //   console.log(" icon", value);
  // }, [icon]);

  return (
    <View style={styles.courseTextView}>
      <Ionicons name={props.icon} size={18} color={Colors.black} />
      <Text>{props.value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  courseTextView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
    fontFamily: "outfit-medium",
  },
});
