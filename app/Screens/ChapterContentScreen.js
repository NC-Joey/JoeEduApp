import {
  View,
  Text,
  ToastAndroid,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Content from "../Components/ChapterContent/Content";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GetUserDetail, markChapterCompleted } from "../services";
import { CompleteChapterContext } from "../Context/CompleteChapterContext";
import { useUser } from "@clerk/clerk-expo";
import { UserPointsContext } from "../Context/UserPointsContext";

export default function ChapterContentScreen() {
  const param = useRoute().params;
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  let _userPoint = 0;

  const GetUser = async () => {
    GetUserDetail(user.primaryEmailAddress.emailAddress)
      .then((resp) => {
        _userPoint = resp.userDetail?.point;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
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

    const totalPoints = _userPoint + param.content?.chapterContent?.length * 10;

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
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (
        param.content.chapterContent && (
          <ScrollView>
            <Content
              content={param.content.chapterContent}
              onChapterFinish={() => onChapterFinish()}
            />
          </ScrollView>
        )
      )}
    </View>
  );
}
