import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import AntDesign from "@expo/vector-icons/AntDesign";

import { Fonts } from "../../constants/theme";

const AppleAuthBtn = () => {
  return (
    <TouchableOpacity style={styles.appleAuthBtn}>
      <AntDesign name="apple" size={24} color="white" />
      <Text style={styles.appleAuthBtnText}>Sign in with Apple</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appleAuthBtn: {
    backgroundColor: "#000",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
  },
  appleAuthBtnText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: "white",
  },
});

export default AppleAuthBtn;
