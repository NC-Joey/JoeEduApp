import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../shared/Colors";
import { GetAllProgressCourse } from "../services";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";

export default function MyCourse() {
  const { user } = useUser();
  const navigation = useNavigation();
  const [progressCousrseList, setprogressCousrseList] = useState();
  useEffect(() => {
    user && GetAllProgressCourseList();
  }, [user]);

  const GetAllProgressCourseList = () => {
    GetAllProgressCourse(user.primaryEmailAddress.emailAddress).then((resp) => {
      setprogressCousrseList(resp.userEnrolledCourses);
    });
  };
  return (
    <View>
      <View style={{ height: 160, backgroundColor: Colors.main, padding: 30 }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            color: Colors.white,
            fontSize: 30,
          }}
        >
          My Course
        </Text>
      </View>
    </View>
  );
}
