import React from "react";
import { StyleSheet } from "react-native";

import { Colors, Fonts } from "@/theme";

import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors.light.background },
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          headerLargeTitle: true,
          headerTransparent: true,
          headerTitle: "Profile",
          headerLargeTitleStyle: {
            fontFamily: Fonts.bold,
            fontWeight: "900",
            color: Colors.light.dark,
          },
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({});

export default Layout;
