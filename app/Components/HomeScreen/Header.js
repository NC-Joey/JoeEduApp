import { View, Text, Image, StyleSheet, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import Colors from "../../shared/Colors";
import { useFonts } from "expo-font";
import Coin from "../../assets/images/coin.png";
import { Ionicons } from "@expo/vector-icons";
import { GetUserDetail } from "../../services";

export default function Header() {
  const [fontsLoaded] = useFonts({
    "outfit-normal": require("./../../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./../../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("./../../assets/fonts/Outfit-SemiBold.ttf"),
  });

  const [userPoint, setUserPoints] = useState(0);

  var _userPoint = 0;
  useEffect(() => {
    // console.log(" contentLenght", contentLenght);
    // console.log(" contentIndex", contentIndex);
    GetUser();
    // console.log("_userPoint ------", _userPoint);
  }, [userPoint]);

  const { isLoaded, isSignedIn, user } = useUser();

  const GetUser = async () => {
    GetUserDetail(user.primaryEmailAddress.emailAddress).then((resp) => {
      _userPoint = resp.userDetail?.point;
      setUserPoints(resp.userDetail?.point);
      // console.log("_userPoint -", _userPoint);
    });
  };
  return (
    isLoaded &&
    GetUser() && (
      <View>
        <View style={[{ justifyContent: "space-between" }, styles.rowStyle]}>
          <View style={styles.rowStyle}>
            <Image
              source={{ uri: user?.imageUrl }}
              style={{ width: 50, height: 50, borderRadius: 99 }}
            />
            <View>
              <Text
                style={{ color: Colors.white, fontFamily: "outfit-normal" }}
              >
                Welcome,
              </Text>
              <Text style={styles.mainText}>{user?.firstName}</Text>
            </View>
          </View>
          <View style={styles.rowStyle}>
            <Image source={Coin} style={{ width: 35, height: 35 }} />
            <Text style={styles.mainText}>{userPoint}</Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Colors.white,
            paddingLeft: 20,
            paddingRight: 5,
            borderRadius: 99,
            marginTop: 25,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            placeholder="Search Courses"
            style={{ fontFamily: "outfit-normal", fontSize: 18 }}
          />
          <Ionicons name="search-circle" size={50} color={Colors.main} />
        </View>
      </View>
    )
  );
}

const styles = StyleSheet.create({
  mainText: {
    color: Colors.white,
    fontSize: 20,
    fontFamily: "outfit-normal",
  },
  rowStyle: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
