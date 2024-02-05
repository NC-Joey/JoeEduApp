import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { getCourseList } from "../../services";
import SubHeading from "../SubHeading";
import Colors from "../../shared/Colors";
import { Ionicons } from "@expo/vector-icons";
import CourseItem from "./CourseItem";

export default function CourseList(level) {
  const [courseList, setCourseList] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const navigation = useNavigation();
  useEffect(() => {
    setIsLoading(true); // Set loading state to true when fetching courses
    getCourses();
    setIsLoading(false); // Set loading state to false when courses are fetched
  }, []);

  const getCourses = () => {
    getCourseList(level).then((res) => {
      //  console.log("level--", level);
      //console.log("res--", res);
      setCourseList(res?.courses);
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
        <>
          <SubHeading
            text={level.level + " Courses"}
            // color={level.level == " Basic" && Colors.white}
          />
          <FlatList
            data={courseList}
            key={courseList.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("course-detail", {
                    course: item,
                  })
                }
              >
                <CourseItem item={item} />
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
}
