import { View, Text } from "react-native";
import React, { useEffect } from "react";
import Content from "../Components/ChapterContent/Content";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function ChapterContentScreen() {
  const param = useRoute().params;

  useEffect(() => {
    //console.log(" param --", param);
  }, []);

  return (
    param.content.chapterContent && (
      <View>
        <Content content={param.content.chapterContent} />
      </View>
    )
  );
}
