import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../shared/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import DetailSection from "../Components/CourseDetailScreen/DetailSection";
import ChatperSection from "../Components/CourseDetailScreen/ChatperSection";
import { enrollCourse, getUserEnrolledCourse } from "../services";
import { useUser } from "@clerk/clerk-expo";
import { CompleteChapterContext } from "../Context/CompleteChapterContext";

export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const params = useRoute().params;
  const { isChapterComplete, setIsChapterComplete } = useContext(
    CompleteChapterContext
  );
  const [UserEnrolledCourse, setUserEnrolledCourse] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const { user } = useUser();

  useEffect(() => {
    if (user && params.course) {
      GetUserEnrolledCourse();
    }
  }, [params.course]);

  useEffect(() => {
    isChapterComplete && GetUserEnrolledCourse();
  }, [isChapterComplete]);

  const UserEnrollCourse = () => {
    setIsLoading(true); // Set loading state to true when enrolling course
    enrollCourse(params.course.id, user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        if (resp) {
          ToastAndroid.show("Course Enrolled successfully!", ToastAndroid.LONG);
          GetUserEnrolledCourse();
        }
      }
    );
  };

  const GetUserEnrolledCourse = () => {
    setIsLoading(true); // Set loading state to true when fetching enrolled course
    getUserEnrolledCourse(
      params.course.id,
      user.primaryEmailAddress.emailAddress
    ).then((resp) => {
      setUserEnrolledCourse(resp.userEnrolledCourses);
      setIsLoading(false); // Set loading state to false when course details are fetched
    });
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? ( // Display loader while loading
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (
        params.course && (
          <ScrollView style={{ padding: 10 }}>
            <TouchableOpacity onPress={() => navigate.goBack()}>
              <Ionicons
                name="ios-arrow-back-circle"
                size={24}
                color={Colors.black}
              />
            </TouchableOpacity>

            <DetailSection
              course={params.course}
              UserEnrolledCourse={UserEnrolledCourse}
              enrollCourse={() => UserEnrollCourse()}
            />
            <ChatperSection
              chapters={params.course.chapters}
              UserEnrolledCourse={UserEnrolledCourse}
            />
          </ScrollView>
        )
      )}
    </View>
  );
}
