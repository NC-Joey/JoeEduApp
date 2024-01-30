import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import RenderHtml from "react-native-render-html";

export default function ContentItem({ description }) {
  const { width } = useWindowDimensions();
  const descriptionSource = {
    html: description,
  };
  return (
    <View>
      <RenderHtml contentWidth={width} source={descriptionSource} />
    </View>
  );
}
