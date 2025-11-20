import React from "react";

import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Image } from "expo-image";
import Animated, { FadeInDown } from "react-native-reanimated";

import AppleAuthBtn from "@/components/Auth/AppleAuthBtn";
import GoogleAuthBtn from "@/components/Auth/GoogleAuthBtn";
import SmoothInfiniteAnimated from "@/components/Auth/SmoothInfiniteAnimated";

import { Colors, Fonts } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";

const Login = () => {
  const router = useRouter();

  const openWebBrowser = () => {
    Linking.openURL("https://wolt.com");
  };

  return (
    <View style={styles.container}>
      <View style={styles.infiniteContainer}>
        <View>
          <SmoothInfiniteAnimated scrollDirection="down" iconSet="set1" />
        </View>
        <View>
          <SmoothInfiniteAnimated scrollDirection="up" iconSet="set2" />
        </View>
        <View>
          <SmoothInfiniteAnimated scrollDirection="down" iconSet="set3" />
        </View>

        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.1)", "#fff"]}
          style={styles.gradient}
        />
      </View>
      <View style={styles.contentContainer}>
        <Image
          source={require("../../../assets/images/wolt-logo.png")}
          style={styles.brandLogo}
          contentFit="contain"
          transition={1000}
        />
        <Animated.Text style={styles.tagLine} entering={FadeInDown}>
          Almost everything delivered
        </Animated.Text>

        {/* Login Buttons */}
        <View style={styles.btnContainer}>
          <Animated.View entering={FadeInDown.delay(100)}>
            <GoogleAuthBtn />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(200)}>
            <AppleAuthBtn />
          </Animated.View>
          <Animated.View entering={FadeInDown.delay(300)}>
            <Link href={"/(auth)/other-options"} asChild push>
              <TouchableOpacity style={styles.otherBtn}>
                <Text style={styles.otherBtnText}>Other Options</Text>
              </TouchableOpacity>
            </Link>
          </Animated.View>
        </View>

        <Animated.Text
          style={styles.privacyContainer}
          entering={FadeInDown.delay(400)}
        >
          <Text style={styles.privacyText}>
            Please visit{" "}
            <Text style={styles.privacyLink} onPress={openWebBrowser}>
              Wolt Privacy Policy
            </Text>{" "}
            to learn about personal data processing at Wolt.
          </Text>
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  infiniteContainer: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },

  gradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
    paddingVertical: 20,
    backgroundColor: Colors.light.background,
  },
  brandLogo: {
    width: "100%",
    height: 50,
  },

  tagLine: {
    fontSize: 30,
    fontFamily: Fonts.bold,
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 35,
    marginTop: 20,
  },

  btnContainer: {
    gap: 12,
    width: "100%",
  },
  otherBtn: {
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    width: "100%",
  },
  otherBtnText: {
    fontSize: 16,
    fontFamily: Fonts.bold,
    color: "#666",
  },

  privacyContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  privacyText: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    lineHeight: 18,
  },
  privacyLink: {
    color: "#4285F4",
    textDecorationLine: "underline",
  },
});

export default Login;
