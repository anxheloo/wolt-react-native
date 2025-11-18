import { useEffect } from "react";

import { queryClient } from "@/api/apiClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SplashScreen, Stack } from "expo-router";

import { useFonts } from "expo-font";

import { Colors, Fonts } from "@/constants/theme";

export default function RootLayout() {
  const [loaded] = useFonts({
    [Fonts.light]: require("../../assets/fonts/Nunito-Light.ttf"),
    [Fonts.regular]: require("../../assets/fonts/Nunito-Regular.ttf"),
    [Fonts.medium]: require("../../assets/fonts/Nunito-Medium.ttf"),
    [Fonts.bold]: require("../../assets/fonts/Nunito-Bold.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  let isLoggedIn = false;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.light.background },
          }}
          // initialRouteName="auth"
        >
          <Stack.Protected guard={!isLoggedIn}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>

          <Stack.Protected guard={isLoggedIn}>
            <Stack.Screen name="(app)" />
          </Stack.Protected>
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
