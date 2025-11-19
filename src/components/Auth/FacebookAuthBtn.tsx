import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

import { Fonts } from "../../constants/theme";

import FontAwesome from "@expo/vector-icons/FontAwesome";

const FacebookAuthBtn = () => {
  return (
    <TouchableOpacity style={styles.facebookBtn}>
      <FontAwesome name="facebook-square" size={24} color="blue" />
      <Text style={styles.facebookBtnText}>Continue with Facebook</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  facebookBtn: {
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
  },
  facebookBtnText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: "#666",
  },
});

export default FacebookAuthBtn;
