import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { Video, ResizeMode } from "expo-av";

export default function ContentItemVideo({ description }) {
  function hasVideoTags(htmlString) {
    const regex = /<video[^>]*>[\s\S]*?<\/video>/gi;
    return regex.test(htmlString);
  }

  const hasVideo = hasVideoTags(description);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
  }, [description]);

  const windowWidth = useWindowDimensions().width;
  const aspectRatio = 16 / 9;
  const videoHeight = windowWidth / aspectRatio;

  const [status, setStatus] = useState({});

  return (
    hasVideo && (
      <View style={{ flex: 1 }}>
        <Video
          source={{ uri: "https://media.graphassets.com/nFojymvCQGaS2GMdTX9o" }}
          style={{
            width: windowWidth,
            height: videoHeight,
          }}
          resizeMode={ResizeMode.CONTAIN}
          isLooping={false}
          shouldPlay={false}
          useNativeControls
          onPlaybackStatusUpdate={setStatus}
          onLoad={() => setIsLoading(false)} // Hide loader when video is loaded
        />
        {isLoading && (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="white" />
          </View>
        )}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});
