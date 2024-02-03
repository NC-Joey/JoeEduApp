import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Colors from "../../shared/Colors";

export default function CourseProgressBar(params) {
  const width = (params.completedChapter / params.totalChapter) * 100 + "%";

  useEffect(() => {
    // console.log(" completedChapter", params.completedChapter);
    // console.log(" totalChapter", params.totalChapter);
  }, []);

  return (
    <View
      style={{
        width: "100%",
        height: 7,
        backgroundColor: Colors.gray,
        borderRadius: 99,
      }}
    >
      <View
        style={{
          width: width,
          height: 7,
          backgroundColor: Colors.main,
          borderRadius: 99,
        }}
      ></View>
    </View>
  );
}
