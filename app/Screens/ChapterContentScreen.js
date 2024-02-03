import { View, Text, ToastAndroid, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import Content from "../Components/ChapterContent/Content";
import { useNavigation, useRoute } from "@react-navigation/native";
import { markChapterCompleted } from "../services";
import { CompleteChapterContext } from "../Context/CompleteChapterContext";
import { useUser } from "@clerk/clerk-expo";
import { UserPointsContext } from "../Context/UserPointsContext";

export default function ChapterContentScreen() {
  const param = useRoute().params;
  const { user } = useUser();

  useEffect(() => {
    console.log(" param --", param);
  }, [param]);

  const navigation = useNavigation();
  const { isChapterComplete, setIsChapterComplete } = useContext(
    CompleteChapterContext
  );
  const { UserPoints, setUserPoints } = useContext(UserPointsContext);

  const onChapterFinish = () => {
    const _resp = param.completedChapters.find(
      (item) => item.chapterId == param.chapterId
    );
    if (_resp) {
      ToastAndroid.show("Course Already Completed", ToastAndroid.LONG);

      navigation.goBack();
      return;
    }

    const totalPoints = Number(UserPoints) + param.content?.length * 10;
    markChapterCompleted(
      param.chapterId,
      param.userCourseRecordId,
      user.primaryEmailAddress.emailAddress,
      totalPoints
    ).then((resp) => {
      ToastAndroid.show("Course Completed!", ToastAndroid.LONG);
      setIsChapterComplete(true);
      navigation.goBack();
    });
  };

  return (
    param.content.chapterContent && (
      <ScrollView>
        <Content
          content={param.content.chapterContent}
          onChapterFinish={() => onChapterFinish()}
        />
      </ScrollView>
    )
  );
}
