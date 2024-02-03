import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import SubHeading from "../SubHeading";
import Colors from "../../shared/Colors";
import { useUser } from "@clerk/clerk-expo";
import { GetAllProgressCourse } from "../../services";
import CourseItem from "./CourseItem";
import { useNavigation } from "@react-navigation/native";

export default function CourseProgess() {
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
      <SubHeading text={"In Progress"} color={Colors.white} />
      <FlatList
        data={progressCousrseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("course-detail", {
                course: item.course,
              })
            }
          >
            <CourseItem
              item={item.course}
              completedChapter={item?.completedChapter?.length}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
