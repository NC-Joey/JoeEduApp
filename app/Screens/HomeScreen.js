import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
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
  const [isLoading, setIsLoading] = useState(true); // State to track loading status

  const createUser = async () => {
    if (user) {
      setIsLoading(true); // Set loading state to true when creating user
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
    GetUserDetail(user.primaryEmailAddress.emailAddress)
      .then((resp) => {
        setUserPoints(resp?.userDetail?.point);
      })
      .finally(() => {
        setIsLoading(false); // Set loading state to false when user details are fetched
      });
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? ( // Display loader while loading
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ flex: 1, justifyContent: "center" }}
        />
      ) : (
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
      )}
    </View>
  );
}
