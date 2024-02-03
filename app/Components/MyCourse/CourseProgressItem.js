import { View, Text, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Colors from "../../shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import CourseProgressBar from "../HomeScreen/CourseProgressBar";

export default function CourseProgressItem({ item, completedChapter }) {
  useEffect(() => {
    // console.log("item", item?.icon);
    // console.log(" contentIndex", contentIndex);
  }, []);
  return (
    <View
      style={{
        padding: 10,
        backgroundColor: Colors.white,
        marginRight: 15,
        borderRadius: 15,
      }}
    >
      <Image source={{ uri: item?.banner?.url }} style={styles.courseImage} />
      <View style={{ padding: 7 }}>
        <Text style={{ fontFamily: "outfit-medium", fontSize: 17 }}>
          {item.name}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={styles.courseTextView}>
            <Ionicons name="book-outline" size={18} color={Colors.black} />
            <Text>{item?.chapters?.length} Chapters</Text>
          </View>
          <View style={styles.courseTextView}>
            <Ionicons name="md-time-outline" size={18} color={Colors.black} />
            <Text>{item?.time} </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingTop: 3,
          }}
        >
          <Text
            style={{
              marginTop: 5,
              color: Colors.main,
              fontFamily: "outfit-medium",
            }}
          >
            {item.price == 0 ? "Free" : item.price}
          </Text>

          <Image
            style={{ width: 30, height: 30, flexShrink: 0 }}
            source={{ uri: item?.icon?.url }}
          />
        </View>
      </View>
      {completedChapter != undefined ? (
        <CourseProgressBar
          totalChapter={item?.chapters?.length}
          completedChapter={completedChapter}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  courseImage: {
    width: "100%",
    height: 170,
    borderRadius: 15,
  },
  courseTextView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
  },
});
