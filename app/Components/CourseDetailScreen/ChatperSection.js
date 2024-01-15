import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../shared/Colors";

export default function ChatperSection(props) {
  useEffect(() => {
    // console.log(" chapterList", props.chapters);
  }, [props.chapters]);

  return (
    props.chapters && (
      <View
        style={{
          padding: 10,
          backgroundColor: Colors.white,
          marginTop: 20,
          borderRadius: 15,
        }}
      >
        <Text style={{ fontFamily: "outfit-medium", fontSize: 22 }}>
          Chapters
        </Text>
        {props.chapters.map((item, index) => (
          <View
            key={index} // Add this line to assign a unique key
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 15,
              borderWidth: 1,
              borderRadius: 10,
              marginTop: 10,
              borderColor: Colors.gray,
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-medium",
                  fontSize: 27,
                  color: Colors.gray,
                }}
              >
                {index + 1}
              </Text>
              <Text
                style={{
                  fontFamily: "outfit-normal",
                  fontSize: 21,
                  color: Colors.gray,
                }}
              >
                {item.title}
              </Text>
            </View>
            <Ionicons name="md-lock-closed" size={25} color={Colors.gray} />
          </View>
        ))}
      </View>
    )
  );
}
