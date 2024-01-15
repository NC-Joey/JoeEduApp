import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../shared/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import DetailSection from "../Components/CourseDetailScreen/DetailSection";
import ChatperSection from "../Components/CourseDetailScreen/ChatperSection";
import { enrollCourse } from "../services";
import { useUser } from "@clerk/clerk-expo";

export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const params = useRoute().params;
  const { user } = useUser();

  useEffect(() => {
    console.log("params.course", params.course.id);
    console.log("params.course", user.primaryEmailAddress.emailAddress);
    //  UserEnrollCourse();
    // console.log("UserEnrollCourse", UserEnrollCourse());
  }, [params.course]);

  const UserEnrollCourse = () => {
    enrollCourse(params.course.id, user.primaryEmailAddress.emailAddress).then(
      (resp) => {
        console.log("resp", resp);
      }
    );
  };

  return (
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
          enrollCourse={() => UserEnrollCourse()}
        />
        <ChatperSection chapters={params.course.chapters} />
      </ScrollView>
    )
  );
}
