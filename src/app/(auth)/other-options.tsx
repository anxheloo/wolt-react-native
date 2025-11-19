import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Animated, { FadeInDown } from "react-native-reanimated";

import AppleAuthBtn from "@/components/Auth/AppleAuthBtn";
import GoogleAuthBtn from "@/components/Auth/GoogleAuthBtn";

import { useRouter } from "expo-router";

import { Colors, Fonts } from "@/constants/theme";

import FacebookAuthBtn from "@/components/Auth/FacebookAuthBtn";
import { useAppStore } from "@/store/useAppStore";
import AntDesign from "@expo/vector-icons/AntDesign";

const OtherOptions = () => {
  const router = useRouter();
  const updateUserSlice = useAppStore((state) => state.updateUserSlice);

  const continueAsGuest = () => {
    updateUserSlice({ isGuest: true });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => router.dismiss()}
      >
        <AntDesign name="close" size={22} color="black" />
      </TouchableOpacity>

      <Text style={styles.title}>Log in or create a Wolt account</Text>

      <View style={styles.btnContainer}>
        <Animated.View entering={FadeInDown.delay(200)}>
          <AppleAuthBtn />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(100)}>
          <GoogleAuthBtn />
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(100)}>
          <FacebookAuthBtn />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400)}>
          <TouchableOpacity style={styles.guestBtn} onPress={continueAsGuest}>
            <Text style={styles.guestBtnText}>Continue as Guest</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  closeBtn: {
    backgroundColor: Colors.light.light,
    borderRadius: 50,
    padding: 8,
    alignSelf: "flex-end",
  },

  title: {
    fontSize: 30,
    fontFamily: Fonts.bold,
    marginVertical: 22,
  },

  btnContainer: {
    gap: 12,
    width: "100%",
  },
  guestBtn: {
    backgroundColor: "transparent",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
  },
  guestBtnText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: Colors.light.secondary,
  },

  facebookBtnText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: "#fff",
  },
});

export default OtherOptions;
