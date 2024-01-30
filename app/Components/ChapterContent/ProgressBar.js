import { View, Text } from "react-native";
import Colors from "../../shared/Colors";
import React, { useEffect } from "react";

export default function ProgressBar({ contentLenght, contentIndex }) {
  const arraySize = Array.from(
    { length: contentLenght },
    (_, index) => index + 1
  );
  const width = 100 / contentLenght;

  useEffect(() => {
    // console.log(" contentLenght", contentLenght);
    // console.log(" contentIndex", contentIndex);
  }, []);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        padding: 20,
      }}
    >
      {arraySize.map((item, index) => (
        <View
          key={index} // Add unique key prop here
          style={{
            backgroundColor: `${
              index <= contentIndex ? Colors.main : Colors.gray
            }`,
            width: width + "%",
            borderRadius: 10,
            height: 10,
            margin: 5,
            flex: 1,
          }}
        ></View>
      ))}
    </View>
  );
}
