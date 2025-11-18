import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Fonts } from "../../constants/theme";

import AntDesign from "@expo/vector-icons/AntDesign";

const GoogleAuthBtn = () => {
  return (
    <TouchableOpacity style={styles.googleBtn}>
      <AntDesign name="google" size={24} color="white" />
      <Text style={styles.googleBtnText}>Continue with Google</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  googleBtn: {
    backgroundColor: "#4285F4",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  googleBtnText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: "white",
  },
});

export default GoogleAuthBtn;
