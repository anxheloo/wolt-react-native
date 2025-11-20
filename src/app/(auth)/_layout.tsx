import { Stack } from "expo-router";
import React from "react";

import { Colors } from "@/constants/theme";

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: Colors.light.background },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="other-options"
        options={{
          title: "",
          presentation: "formSheet",
          sheetAllowedDetents: [0.6],
          sheetCornerRadius: 12,
        }}
      />
    </Stack>
  );
};

export default Layout;
