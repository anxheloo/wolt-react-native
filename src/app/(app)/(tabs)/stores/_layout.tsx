import React from "react";
import { StyleSheet } from "react-native";

import { Colors } from "@/theme";

import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: Colors.light.background },
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
};

const styles = StyleSheet.create({});

export default Layout;
