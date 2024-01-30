import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import RenderHtml from "react-native-render-html";
import Colors from "../../shared/Colors";

export default function ContentItem({ description, output }) {
  const { width } = useWindowDimensions();
  const [isRun, setIsRun] = useState(false);

  //   useEffect(() => {
  //     console.log("output", output);
  //   }, []);

  const descriptionSource = {
    html: description,
  };

  const outputSource = {
    html: output,
  };

  return (
    <View>
      <RenderHtml
        contentWidth={width}
        source={descriptionSource}
        tagsStyles={tagsStyles}
      />
      {output != null ? (
        <TouchableOpacity
          onPress={() => setIsRun(true)}
          style={{ marginTop: -20, marginBottom: 20 }}
        >
          <Text
            style={{
              padding: 15,
              backgroundColor: Colors.main,
              borderRadius: 10,
              fontFamily: "outfit-normal",
              width: 100,
              fontSize: 15,
              color: Colors.white,
              textAlign: "center",
            }}
          >
            Run
          </Text>
        </TouchableOpacity>
      ) : null}

      {isRun ? (
        <>
          <Text
            style={{
              fontFamily: "outfit-medium",
              fontSize: 17,
              marginBottom: 10,
            }}
          >
            Output
          </Text>

          <RenderHtml
            contentWidth={width}
            source={outputSource}
            tagsStyles={outputStyles}
          />
        </>
      ) : null}
    </View>
  );
}

const tagsStyles = {
  body: {
    fontFamily: "outfit-normal",
    fontSize: 17,
  },

  code: {
    backgroundColor: Colors.black,
    color: Colors.white,
    padding: 20,
    borderRadius: 15,
  },
};

const outputStyles = {
  body: {
    fontFamily: "outfit-normal",
    fontSize: 17,
    backgroundColor: Colors.black,
    color: Colors.white,
    padding: 20,
    borderRadius: 15,
  },

  code: {
    backgroundColor: Colors.black,
    color: Colors.white,
    padding: 20,
    borderRadius: 15,
  },
};
