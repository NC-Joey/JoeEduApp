import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import app from "./../assets/images/app.png";
import google from "./../assets/images/google.png";
import Colors from "../shared/Colors";
import { useFonts } from "expo-font";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/warmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  const [fontsLoaded] = useFonts({
    "outfit-normal": require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("../assets/fonts/Outfit-SemiBold.ttf"),
  });

  return (
    <View style={{ display: "flex", alignItems: "center" }}>
      <Image source={app} style={styles.pic} />

      <View
        style={{
          height: 400,
          backgroundColor: Colors.main,
          width: "100%",
          marginTop: -100,
          padding: 20,
        }}
      >
        <Text style={styles.productname}>JOE-LEARN</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            marginTop: 20,
            color: Colors.light,
          }}
        >
          Your Best Online Learning Platform
        </Text>

        <TouchableOpacity
          onPress={onPress}
          style={{
            backgroundColor: Colors.white,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "center",
            padding: 10,
            borderRadius: 99,
            marginTop: 25,
          }}
        >
          <Image source={google} style={{ width: 40, height: 40 }} />
          <Text
            style={{
              fontSize: 20,
              color: Colors.main,
              fontFamily: "outfit-normal",
            }}
          >
            Sign In with Google
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  productname: {
    textAlign: "center",
    color: Colors.white,
    fontFamily: "outfit-bold",
    fontSize: 35,
    marginTop: 25,
  },
  pic: {
    width: 250,
    height: 500,
    objectFit: "contain",
    marginTop: 40,
  },
});
