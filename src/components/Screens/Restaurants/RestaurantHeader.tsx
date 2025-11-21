import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

import { Colors, Fonts } from "@/theme";
import Ionicons from "@expo/vector-icons/Ionicons";

import { Link } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type RestaurantHeaderProps = {
  title: string;
  scrollOffset: SharedValue<number>;
};

const SCROLL_THRESHOLD = 60;

const RestaurantHeader = ({ title, scrollOffset }: RestaurantHeaderProps) => {
  const { top } = useSafeAreaInsets();

  const header1Style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [0, SCROLL_THRESHOLD / 2],
        [1, 0],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [0, SCROLL_THRESHOLD / 2],
            [0, -10],
            Extrapolation.CLAMP
          ),
        },
      ],
    };
  });
  const header2Style = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollOffset.value,
        [0, SCROLL_THRESHOLD],
        [0, 1],
        Extrapolation.CLAMP
      ),
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [0, SCROLL_THRESHOLD / 2],
            [-10, 0],
            Extrapolation.CLAMP
          ),
        },
      ],
      boxShadow: "0px 2px 2px -2px rgba(0, 0, 0, 0.2)",
    };
  });

  return (
    <Animated.View style={[styles.headerContainer, { paddingTop: top }]}>
      {/* Header 1 */}
      <Animated.View style={[styles.header1, header1Style]}>
        <Link href={"/(app)/(modals)/location"} asChild>
          <TouchableOpacity style={styles.locationBtn}>
            <View style={styles.iconContainer}>
              <Ionicons name="business-outline" size={16} color="black" />
            </View>
            <Text style={styles.locationText}>Tirana</Text>

            <Ionicons name="chevron-down" size={16} color="black" />
          </TouchableOpacity>
        </Link>

        <View style={styles.rightIcon}>
          <Link href={"/(app)/(modals)/filter"} asChild>
            <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name="filter" size={20} color="black" />
            </TouchableOpacity>
          </Link>

          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="map-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </Animated.View>
      {/* Header 2 */}
      <Animated.View style={[styles.header2, header2Style]}>
        <Link href={"/(app)/(modals)/location"} asChild>
          <TouchableOpacity style={styles.header2LocationBtn}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.header2Inner}>
              <Text style={styles.locationText}>Tirana</Text>
              <Ionicons name="chevron-down" size={16} color="black" />
            </View>
          </TouchableOpacity>
        </Link>

        <Link href={"/(app)/(modals)/filter"} asChild>
          <TouchableOpacity style={styles.iconContainer}>
            <Ionicons name="filter" size={20} color="black" />
          </TouchableOpacity>
        </Link>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    zIndex: 100,
    // boxShadow: "0px 2px 2px -2px rgba(0, 0, 0, 0.2)",
  },

  title: {
    fontFamily: Fonts.bold,
    fontSize: 20,
  },

  header1: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
  header2: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    // backgroundColor: Colors.light.background,
  },

  locationBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconContainer: {
    backgroundColor: Colors.light.light,
    padding: 10,
    borderRadius: 50,
  },

  locationText: {
    fontSize: 12,
    fontFamily: Fonts.medium,
    color: Colors.light.muted,
  },

  rightIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  header2LocationBtn: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingLeft: 35,
  },
  header2Inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});

export default RestaurantHeader;
