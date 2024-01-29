import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect } from "react";
import Colors from "../../shared/Colors";
import OptionItem from "./OptionItem";
import { useFonts } from "expo-font";

export default function DetailSection(
  course,
  enrollCourse,
  UserEnrolledCourse
) {
  const [fontsLoaded] = useFonts({
    "outfit-normal": require("./../../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./../../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("./../../assets/fonts/Outfit-SemiBold.ttf"),
  });

  useEffect(() => {
    console.log(" course", course.enrollCourse);
    console.log(" course", course.UserEnrolledCourse);
  }, [course.course]);
  return (
    <View
      style={{
        padding: 10,
        marginTop: 10,
        borderRadius: 15,
        backgroundColor: Colors.white,
      }}
    >
      <Image
        source={{ uri: course.course?.banner?.url }}
        style={{
          width: Dimensions.get("screen").width * 0.9,
          height: 190,
          borderRadius: 15,
        }}
      />
      <View style={{ padding: 10 }}>
        <Text
          style={{ fontSize: 22, fontFamily: "outfit-medium", marginTop: 10 }}
        >
          {course.course.name}
        </Text>
        <View>
          <View style={styles.rowStyle}>
            <OptionItem
              value={course.course.chapters?.length + "Chapters"}
              icon={"book-outline"}
            />

            <OptionItem value={course.course.time} icon={"md-time-outline"} />
          </View>
          <View style={styles.rowStyle}>
            <OptionItem
              value={course.course?.author}
              icon={"person-circle-outline"}
            />
            <OptionItem value={course.course.level} icon={"cellular-outline"} />
          </View>
        </View>

        <View>
          <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
            Description
          </Text>
          <Text
            style={{
              fontFamily: "outfit-normal",
              color: Colors.gray,
              lineHeight: 23,
              flexShrink: 0,
            }}
          >
            {course.course.description?.markdown}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 25,
            justifyContent: "space-evenly",
          }}
        >
          {course.UserEnrolledCourse?.length == 0 ? (
            <TouchableOpacity
              onPress={() => course.enrollCourse()}
              style={{
                padding: 15,
                backgroundColor: Colors.main,
                borderRadius: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-normal",
                  color: Colors.white,
                  textAlign: "center",
                  fontSize: 16,
                }}
              >
                {" "}
                Enroll For Free
              </Text>
            </TouchableOpacity>
          ) : null}
          <TouchableOpacity
            style={{
              padding: 15,
              backgroundColor: Colors.secondary,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-normal",
                color: Colors.white,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Membership $2.99/Month
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
});
