import { useEffect } from "react";
import { StyleSheet } from "react-native";

import { queryClient } from "@/api/apiClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { SplashScreen, Stack } from "expo-router";

import { useAppStore } from "@/store/useAppStore";
import { useFonts } from "expo-font";

import { Colors, Fonts } from "@/constants/theme";

export default function RootLayout() {
  const isGuest = useAppStore((state) => state.isGuest);
  const user = useAppStore((state) => state.user);

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

  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.light.background },
          }}
        >
          <Stack.Protected guard={!user && !isGuest}>
            <Stack.Screen name="(auth)" />
          </Stack.Protected>

          <Stack.Protected guard={user || isGuest}>
            <Stack.Screen name="(app)" />
          </Stack.Protected>
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  gestureHandler: {
    flex: 1,
  },
});
