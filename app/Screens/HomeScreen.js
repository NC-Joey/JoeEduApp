import { View, Text, ScrollView } from "react-native";
import React, { useContext, useEffect } from "react";
import Header from "../Components/HomeScreen/Header";
import Colors from "../shared/Colors";
import CourseList from "../Components/HomeScreen/CourseList";
import { useUser } from "@clerk/clerk-expo";
import { UserPointsContext } from "../Context/UserPointsContext";
import { CreateNewUser, GetUserDetail } from "../services";
import CourseProgess from "../Components/HomeScreen/CourseProgess";

export default function HomeScreen() {
  const { user } = useUser();
  const { UserPoints, setUserPoints } = useContext(UserPointsContext);

  const createUser = async () => {
    if (user) {
      CreateNewUser(
        user.firstName,
        user.primaryEmailAddress.emailAddress,
        user.imageUrl
      ).then((resp) => {
        if (resp) {
          GetUser();
        }
      });
    }
  };

  useEffect(() => {
    user && createUser();
  }, [user]);

  const GetUser = async () => {
    GetUserDetail(user.primaryEmailAddress.emailAddress).then((resp) => {
      console.log("points", resp.userDetail?.point);
      setUserPoints(resp.userDetail?.point);
    });
  };
  return (
    <ScrollView>
      <View
        style={{
          padding: 20,
          backgroundColor: Colors.main,
          height: 250,
        }}
      >
        <Header />
      </View>
      <View style={{ padding: 20 }}>
        <View style={{ marginTop: -90, marginBottom: 20 }}>
          <CourseProgess />
          <CourseList level={"Basic"} />
        </View>
        <CourseList level={"Advance"} />
      </View>
    </ScrollView>
  );
}
