import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { fontFamily } from "../constants/fonts";

export default function RootLayout() {
  const [loaded] = useFonts({
    [fontFamily.light]: require("../../assets/fonts/Nunito-Light.ttf"),
    [fontFamily.regular]: require("../../assets/fonts/Nunito-Regular.ttf"),
    [fontFamily.medium]: require("../../assets/fonts/Nunito-Medium.ttf"),
    [fontFamily.bold]: require("../../assets/fonts/Nunito-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="(app)"
    >
      <Stack.Screen name="(app)" />
      <Stack.Screen name="(auth)" />
    </Stack>
  );
}
