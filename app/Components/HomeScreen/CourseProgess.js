import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
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
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  useEffect(() => {
    user && GetAllProgressCourseList();
  }, [user]);

  const GetAllProgressCourseList = () => {
    GetAllProgressCourse(user.primaryEmailAddress.emailAddress)
      .then((resp) => {
        setprogressCousrseList(resp.userEnrolledCourses);
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false when course list is fetched
      });
  };

  return (
    <View>
      {isLoading ? ( // Display loader while loading
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : (
        progressCousrseList?.length > 0 && (
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
        )
      )}
    </View>
  );
}
