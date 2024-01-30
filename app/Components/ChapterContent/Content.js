import { View, Text, FlatList, Dimensions } from "react-native";
import React, { useEffect } from "react";
import ProgressBar from "./ProgressBar";
import ContentItem from "./ContentItem";

export default function Content(content) {
  useEffect(() => {
    //console.log(" content --resp", content.content);
  }, []);

  return (
    <View style={{ padding: 0 }}>
      <ProgressBar contentLenght={content.content?.length} contentIndex={0} />
      <FlatList
        data={content.content}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: Dimensions.get("screen").width,
              padding: 20,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-medium",
                fontSize: 22,
                marginTop: 5,
              }}
            >
              {item.heading}
            </Text>
            <ContentItem
              description={item?.description?.html}
              output={item?.output?.html}
            />
          </View>
        )}
      />
    </View>
  );
}
