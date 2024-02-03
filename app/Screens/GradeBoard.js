import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { GetGradePoints } from "../services";
import Colors from "../shared/Colors";

export default function GradeBoard() {
  const [gradeList, setGradeList] = useState([]);

  useEffect(() => {
    GetAllGradePoint();
    console.log("gradeList", gradeList);
  }, []);

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
                  source={{ uri: item.profileImage }}
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
                    {item.minPoint} Point
                  </Text>
                </View>
              </View>
              <Image
                source={{ uri: item?.icon?.url }}
                style={{ width: 40, height: 40 }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}
