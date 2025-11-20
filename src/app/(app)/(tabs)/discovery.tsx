import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { useAppStore } from "@/store/useAppStore";

import { Colors } from "@/theme";

const Discovery = () => {
  const updateUserSlice = useAppStore((state) => state.updateUserSlice);

  return (
    <View style={styles.container}>
      <Text style={{ color: "red" }}>Inside App</Text>
      <Text
        style={{ color: "red" }}
        onPress={() => updateUserSlice({ isGuest: false })}
      >
        Go To Login
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
});

export default Discovery;
