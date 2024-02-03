import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { GetGradePoints, GetUserDetail } from "../services";
import Colors from "../shared/Colors";
import { useUser } from "@clerk/clerk-expo";
import Coin from "../assets/images/coin.png";

export default function GradeBoard() {
  const [gradeList, setGradeList] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    GetAllGradePoint();
    GetUser();
    // console.log("gradeList", gradeList);
    //console.log("userDetail", userDetail);
  }, []);

  const GetUser = async () => {
    GetUserDetail(user.primaryEmailAddress.emailAddress).then((resp) => {
      //console.log("resp --------------", resp.userDetail);
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
          Grade Board
        </Text>
        <View style={styles.rowStyle}>
          <Image source={Coin} style={{ width: 35, height: 35 }} />
          <Text style={styles.mainText}>
            {userDetail?.point} {userDetail?.point < 2 ? "Point" : "Points"}
          </Text>
        </View>
      </View>
      <View style={{ marginTop: -40, height: "85%" }}>
        <FlatList
          data={gradeList}
          renderItem={({ item, index }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 23,
                backgroundColor: Colors.white,
                margin: 8,
                marginRight: 15,
                marginLeft: 15,
                borderRadius: 15,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "outfit-bold",
                    fontSize: 24,
                    color: Colors.gray,
                  }}
                >
                  {index + 1}
                </Text>
                <Image
                  source={
                    userDetail?.point >= item.minPoint
                      ? { uri: userDetail?.profileImage }
                      : { uri: item.profileImage }
                  }
                  style={{ width: 60, height: 60, borderRadius: 99 }}
                />
                <View>
                  <Text style={{ fontFamily: "outfit-medium", fontSize: 20 }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "outfit-normal",
                      fontSize: 16,
                      color: Colors.gray,
                    }}
                  >
                    {item.minPoint} {item.minPoint < 2 ? "Point" : "Points"}
                  </Text>
                </View>
              </View>
              <Image
                source={
                  userDetail?.point >= item.minPoint
                    ? { uri: item?.icon?.url }
                    : null
                }
                style={{ width: 40, height: 40 }}
              />
            </View>
          )}
        />
      </View>
    </View>
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
