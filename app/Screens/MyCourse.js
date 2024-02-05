import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../shared/Colors";
import { GetAllProgressCourse } from "../services";
import { useUser } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import CourseItem from "../Components/HomeScreen/CourseItem";
import CourseProgressItem from "../Components/MyCourse/CourseProgressItem";

export default function MyCourse() {
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
      {isLoading ? ( // Display loader while loading
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={progressCousrseList}
          style={{ marginTop: -50 }}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ margin: 8, padding: 5 }}
              onPress={() =>
                navigation.navigate("course-detail", {
                  course: item.course,
                })
              }
            >
              <CourseProgressItem
                item={item.course}
                completedChapter={item?.completedChapter?.length}
              />
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
