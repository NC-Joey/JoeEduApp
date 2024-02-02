import {
  View,
  Text,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../shared/Colors";
import { useNavigation } from "@react-navigation/native";
import { CompleteChapterContext } from "../../Context/CompleteChapterContext";

export default function ChatperSection(props) {
  useEffect(() => {
    // console.log(" chapterList", props.UserEnrolledCourse);
    // console.log(
    //   " course",
    //   props.UserEnrolledCourse[0]?.completedChapter?.length
    // );
  }, [props.chapters]);
  // const [UserCompletedCourses, setUserCompletedCourse] = useState([]);

  const { isChapterComplete, setIsChapterComplete } = useContext(
    CompleteChapterContext
  );

  const navigation = useNavigation();

  const OnChapterPress = (chapter) => {
    if (props.UserEnrolledCourse == 0) {
      ToastAndroid.show("Please Enroll Course!", ToastAndroid.LONG);
      return;
    } else {
      setIsChapterComplete(false);
      navigation.navigate("chapter-content", {
        content: chapter,
        chapterId: chapter.id,
        userCourseRecordId: props.UserEnrolledCourse[0]?.id,
        completedChapters: props.UserEnrolledCourse[0]?.completedChapter,
      });
    }
  };

  const checkIsChapterCompleted = (chapterId) => {
    let _courses = props.UserEnrolledCourse;
    if (_courses[0]?.completedChapter?.length <= 0) {
      return false;
    }
    const resp = _courses[0]?.completedChapter.find(
      (item) => item.chapterId == chapterId
    );
    // if (resp) {
    //   setUserCompletedCourse(resp);
    // }
    console.log("-- resp", resp);
    return resp;
  };

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
          <TouchableOpacity
            key={index} // Add this line to assign a unique key
            style={[
              checkIsChapterCompleted(item.id)
                ? styles.CompeleteChapter
                : styles.inCompeleteChapter,
            ]}
            onPress={() => OnChapterPress(item)}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
              }}
            >
              {checkIsChapterCompleted(item.id) ? (
                <Ionicons
                  name="checkmark-circle"
                  size={30}
                  color={Colors.darkgreen}
                />
              ) : (
                <Text
                  style={{
                    fontFamily: "outfit-medium",
                    fontSize: 27,
                    color: Colors.gray,
                  }}
                >
                  {index + 1}
                </Text>
              )}
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

            {props.UserEnrolledCourse == 0 ? (
              <Ionicons name="md-lock-closed" size={25} color={Colors.gray} />
            ) : (
              <Ionicons
                name="play"
                size={25}
                color={
                  checkIsChapterCompleted(item.id)
                    ? Colors.darkgreen
                    : Colors.gray
                }
              />
            )}
          </TouchableOpacity>
        ))}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  inCompeleteChapter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderColor: Colors.gray,
  },
  CompeleteChapter: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderColor: Colors.darkgreen,
    backgroundColor: Colors.green,
  },
});
