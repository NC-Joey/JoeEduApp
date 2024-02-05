import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import ProgressBar from "./ProgressBar";
import ContentItem from "./ContentItem";
import Colors from "../../shared/Colors";
import { useNavigation } from "@react-navigation/native";
import ContentItemVideo from "./ContentItemVideo";

export default function Content(content, onChapterFinish) {
  useEffect(() => {
    // console.log(" contentRef", content);
  }, []);

  let contentRef;
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);
  const onNextBtnPress = (index) => {
    // console.log("num", index);
    // console.log("content.content?.length", content.content?.length);
    if (content.content?.length <= index + 1) {
      content.onChapterFinish();
      //navigation.goBack();
      return;
    }
    setActiveIndex(index + 1);
    contentRef.scrollToIndex({ animated: true, index: index + 1 });
  };

  function hasVideoTags(htmlString) {
    const regex = /<video[^>]*>[\s\S]*?<\/video>/gi;
    return regex.test(htmlString);
  }

  return (
    <View style={{ padding: 0, height: Dimensions.get("screen").height }}>
      <ProgressBar
        contentLenght={content.content?.length}
        contentIndex={activeIndex}
      />
      <FlatList
        data={content.content}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={(ref) => {
          contentRef = ref;
        }}
        renderItem={({ item, index }) => (
          <ScrollView
            style={{
              width: Dimensions.get("screen").width,
              padding: 20,
              marginBottom: 40,
              height: "100%",
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
            {/* <ContentItem
              description={item?.description?.html}
              output={item?.output?.html}
            /> */}
            {!hasVideoTags(item?.description?.html) ? (
              <ContentItem
                description={item?.description?.html}
                output={item?.output?.html}
              />
            ) : (
              <ContentItemVideo description={item?.description?.html} />
            )}
            <TouchableOpacity
              style={{ marginTop: 10 }}
              onPress={() => onNextBtnPress(index)}
            >
              <Text
                style={{
                  padding: 15,

                  backgroundColor: Colors.main,
                  color: Colors.white,
                  textAlign: "center",
                  fontFamily: "outfit-normal",
                }}
              >
                {content.content?.length > index + 1 ? "Next" : "Finish"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      />
    </View>
  );
}
