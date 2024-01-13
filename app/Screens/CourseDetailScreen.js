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

export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const params = useRoute().params;

  useEffect(() => {
    // console.log("params.course", params.course);
  }, [params.course]);

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

        <DetailSection course={params.course} />
        <ChatperSection chapters={params.course.chapters} />
      </ScrollView>
    )
  );
}
