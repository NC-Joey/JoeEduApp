import { View, Text, ToastAndroid, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import Content from "../Components/ChapterContent/Content";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GetUserDetail, markChapterCompleted } from "../services";
import { CompleteChapterContext } from "../Context/CompleteChapterContext";
import { useUser } from "@clerk/clerk-expo";
import { UserPointsContext } from "../Context/UserPointsContext";

export default function ChapterContentScreen() {
  const param = useRoute().params;
  const { user } = useUser();
  let _userPoint = 0;

  const GetUser = async () => {
    GetUserDetail(user.primaryEmailAddress.emailAddress).then((resp) => {
      _userPoint = resp.userDetail?.point;
      //console.log("_userPoint -", param.content?.chapterContent?.length);
    });
  };

  useEffect(() => {
    console.log(" param --", param);
    GetUser();
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
    //console.log("_userPoint --", _userPoint);

    const totalPoints = _userPoint + param.content?.chapterContent?.length * 10;
    console.log("totalPoints ---", totalPoints);
    markChapterCompleted(
      param.chapterId,
      param.userCourseRecordId,
      user.primaryEmailAddress.emailAddress,
      totalPoints
    ).then((resp) => {
      // console.log("-------", resp);
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
