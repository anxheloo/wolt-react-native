import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Stack, useRouter } from "expo-router";

import { Colors } from "@/theme";
import { AntDesign } from "@expo/vector-icons";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="(modals)/location"
        options={{
          headerShown: true,
          title: "",
          presentation: "formSheet",
          sheetAllowedDetents: [0.7],
          sheetCornerRadius: 12,
          sheetGrabberVisible: true,
          contentStyle: { backgroundColor: Colors.light.background },
          headerRight: () => (
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => router.dismiss()}
            >
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/filter"
        options={{
          headerShown: true,
          title: "",
          presentation: "formSheet",
          sheetAllowedDetents: [0.8],
          sheetCornerRadius: 12,
          sheetGrabberVisible: true,
          contentStyle: { backgroundColor: Colors.light.background },
          headerRight: () => (
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => router.dismiss()}
            >
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  closeBtn: {
    // backgroundColor: Colors.light.light,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    // padding: 10,
  },
});

export default Layout;
