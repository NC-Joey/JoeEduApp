import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useEffect } from "react";
import ProgressBar from "./ProgressBar";
import ContentItem from "./ContentItem";

export default function Content(content) {
  useEffect(() => {
    //console.log(" content --resp", content.content);
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <ProgressBar contentLenght={content.content?.length} contentIndex={0} />
      <FlatList
        data={content.content}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: Dimensions.get("screen").width * 0.92,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 22,
                marginTop: 15,
              }}
            >
              {item.heading}
            </Text>
            <ContentItem description={item?.description?.html} />
          </View>
        )}
      />
    </View>
  );
}
