import {
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./app/Screens/LoginScreen";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-expo";
import TabNavigation from "./app/Navigations/TabNavigation";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "outfit-normal": require("./app/assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("./app/assets/fonts/Outfit-Bold.ttf"),
    "outfit-medium": require("./app/assets/fonts/Outfit-SemiBold.ttf"),
  });

  return (
    <ClerkProvider
      publishableKey={"pk_test_Z2FtZS1maWxseS0zLmNsZXJrLmFjY291bnRzLmRldiQ"}
    >
      <SafeAreaView style={styles.container}>
        <SignedIn>
          <NavigationContainer>
            <TabNavigation />
          </NavigationContainer>
        </SignedIn>
        <SignedOut>
          <LoginScreen />
        </SignedOut>
      </SafeAreaView>
    </ClerkProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // alignItems: "center",
    // justifyContent: "center",

    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});
