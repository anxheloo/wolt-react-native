import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import { Stack } from "@/components/ScreenTransition/Stack";
import { useRouter } from "expo-router";
import Transition from "react-native-screen-transitions";

import { Colors } from "@/theme";
import { AntDesign } from "@expo/vector-icons";

const Layout = () => {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
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
      <Stack.Screen
        name="(modals)/map"
        options={{
          // presentation: "formSheet",
          // sheetAllowedDetents: [0.8],
          // sheetCornerRadius: 12,
          // sheetGrabberVisible: true,
          ...Transition.presets.ZoomIn(),
          contentStyle: { backgroundColor: Colors.light.background },
        }}
      />
      <Stack.Screen
        name="(modals)/(restaurant)/[id]"
        options={{
          ...Transition.presets.ZoomIn(),
          // headerShown: true,
          // title: "",
          // // presentation: "formSheet",
          // // sheetAllowedDetents: [0.8],
          // // sheetCornerRadius: 12,
          // sheetGrabberVisible: true,
          // contentStyle: { backgroundColor: Colors.light.background },
          // headerRight: () => (
          //   <TouchableOpacity
          //     style={styles.closeBtn}
          //     onPress={() => router.dismiss()}
          //   >
          //     <AntDesign name="close" size={20} color="black" />
          //   </TouchableOpacity>
          // ),
        }}
      />
      <Stack.Screen
        name="(modals)/(menu)/[id]"
        options={{
          headerShown: false,
          title: "",
          presentation: "formSheet",
          sheetAllowedDetents: [0.9],
          sheetCornerRadius: 12,
          sheetGrabberVisible: true,
          contentStyle: { backgroundColor: Colors.light.background },
        }}
      />
      <Stack.Screen
        name="order"
        options={{
          // enableTransitions: true,
          ...Transition.presets.SharedXImage(),
          contentStyle: { backgroundColor: "transparent" },
        }}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  closeBtn: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
  },
});

export default Layout;
