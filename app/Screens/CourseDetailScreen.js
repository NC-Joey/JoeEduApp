import { View, Text, Touchable, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../shared/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function CourseDetailScreen() {
  const navigate = useNavigation();
  const params = useRoute().params;

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => navigate.goBack()}>
        <Ionicons name="ios-arrow-back-circle" size={24} color={Colors.black} />
      </TouchableOpacity>
    </View>
  );
}
