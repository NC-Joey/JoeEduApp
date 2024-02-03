import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../shared/Colors";
import Coin from "../assets/images/coin.png";
import { GetGradePoints, GetUserDetail } from "../services";
import {
  useUser,
  ClerkProvider,
  SignedIn,
  SignedOut,
  useAuth,
} from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {} from "@clerk/clerk-expo";

// Inside the ProfileScreen component

export default function ProfileScreen() {
  const [userDetail, setUserDetail] = useState([]);
  const [gradeList, setGradeList] = useState([]);
  const { user } = useUser();
  const navigation = useNavigation();
  const { signOut } = useAuth(); // Destructure the signOut function from useAuth

  useEffect(() => {
    GetUser();
    GetAllGradePoint();
    console.log("userDetail", userDetail);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  const GetUser = async () => {
    GetUserDetail(user.primaryEmailAddress.emailAddress).then((resp) => {
      setUserDetail(resp.userDetail);
    });
  };

  const GetAllGradePoint = () => {
    GetGradePoints().then((resp) => {
      resp && setGradeList(resp?.gradePoints);
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
          Profile
        </Text>
      </View>
      <View
        style={{
          height: 200,

          alignItems: "center",
          marginTop: "-13%",
          display: "flex",
        }}
      >
        <Image
          source={{
            uri: userDetail?.profileImage,
          }}
          style={{ width: 100, height: 100, borderRadius: 99 }}
        />
        <Text
          style={{
            fontFamily: "outfit-normal",
            color: Colors.black,
            fontSize: 30,
            lineHeight: 37.8,
          }}
        >
          {userDetail?.userName}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            marginTop: 25,
          }}
        >
          <Image
            source={
              userDetail?.point >= gradeList[0]?.minPoint
                ? { uri: gradeList[0]?.profileImage }
                : userDetail?.point >= gradeList[1]?.minPoint
                ? { uri: gradeList[1]?.profileImage }
                : userDetail?.point >= gradeList[2]?.minPoint
                ? { uri: gradeList[2]?.profileImage }
                : { uri: gradeList[3]?.profileImage }
            }
            style={{ width: 35, height: 35 }}
          />
          <Text
            style={{
              color: Colors.gray,
              fontSize: 20,
              fontFamily: "outfit-normal",
            }}
          >
            {userDetail?.point} {userDetail?.point < 2 ? "Point" : "Points"}
          </Text>
        </View>
      </View>
      <View style={{ padding: 30, marginTop: 20 }}>
        <TouchableOpacity
          style={{
            borderStyle: "solid",

            borderBottomWidth: 1,
            paddingBottom: 20,
            margin: 10,
            borderBottomColor: Colors.black,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("my-course")}
        >
          <Ionicons name="book-outline" size={25} color={Colors.black} />
          <Text
            style={{
              fontSize: 20,
              marginLeft: 15,
              fontFamily: "outfit-medium",
            }}
          >
            My Course
          </Text>
        </TouchableOpacity>
        <View
          style={{
            borderStyle: "solid",

            borderBottomWidth: 1,
            paddingBottom: 20,
            margin: 10,
            borderBottomColor: Colors.black,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="shield-checkmark-outline"
            size={25}
            color={Colors.black}
          />
          <Text
            style={{
              fontSize: 20,
              marginLeft: 15,
              fontFamily: "outfit-medium",
            }}
          >
            Edit Profile
          </Text>
        </View>
        <TouchableOpacity
          style={{
            borderStyle: "solid",

            borderBottomWidth: 1,
            paddingBottom: 20,
            margin: 10,
            borderBottomColor: Colors.black,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => navigation.navigate("grade-board")}
        >
          <EvilIcons name="chart" size={35} color={Colors.black} />
          <Text
            style={{
              fontSize: 20,
              marginLeft: 5,
              fontFamily: "outfit-medium",
            }}
          >
            Ranking
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderStyle: "solid",

            borderBottomWidth: 1,
            paddingBottom: 20,
            margin: 10,
            borderBottomColor: Colors.black,
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={handleSignOut}
        >
          <SimpleLineIcons name="logout" size={25} color={Colors.black} />
          <Text
            style={{
              fontSize: 20,
              marginLeft: 15,
              fontFamily: "outfit-medium",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
