import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

import Animated, {
  scrollTo,
  useAnimatedReaction,
  useAnimatedRef,
  useSharedValue,
} from "react-native-reanimated";

const iconDataSets = {
  set1: [
    { emoji: "🍕", color: "#FFE5CC" },
    { emoji: "🍔", color: "#F4D03F" },
    { emoji: "🍟", color: "#F8D7DA" },
    { emoji: "🌮", color: "#D5EDDA" },
    { emoji: "🍗", color: "#FADBD8" },
  ],
  set2: [
    { emoji: "🎮", color: "#D1ECF1" },
    { emoji: "🎧", color: "#E2E3E5" },
    { emoji: "☕", color: "#F4D03F" },
    { emoji: "🍿", color: "#FFE5CC" },
    { emoji: "🥤", color: "#F8D7DA" },
  ],
  set3: [
    { emoji: "🍰", color: "#FADBD8" },
    { emoji: "🍦", color: "#D1ECF1" },
    { emoji: "🍪", color: "#FFE5CC" },
    { emoji: "🎲", color: "#D5EDDA" },
    { emoji: "🕹️", color: "#E2E3E5" },
  ],
};

const ITEM_HEIGHT = 160;
const SCROLL_SPEED = 20; // pixels per second
const GAP = 10; // gap between items from styles
const FRAME_RATE = 60; // frames per second

interface SmoothInfiniteScrollProps {
  scrollDirection?: "up" | "down";
  iconSet?: "set1" | "set2" | "set3";
}

const SmoothInfiniteAnimated = ({
  scrollDirection = "down",
  iconSet = "set1",
}: SmoothInfiniteScrollProps) => {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollY = useSharedValue(0);

  const iconData = iconDataSets[iconSet];
  const items = [...iconData, ...iconData];
  const totalContentHeight =
    iconData.length * ITEM_HEIGHT + iconData.length * GAP;

  useEffect(() => {
    if (scrollDirection === "up") {
      scrollY.value = totalContentHeight;
    } else {
      scrollY.value = 0;
    }

    const interval = setInterval(() => {
      const increment =
        (SCROLL_SPEED / FRAME_RATE) * (scrollDirection === "up" ? -1 : 1);
      scrollY.value = scrollY.value + increment;
    }, 1000 / FRAME_RATE);

    return () => clearInterval(interval);
  }, [scrollDirection, scrollY, totalContentHeight]);

  useAnimatedReaction(
    () => scrollY.value,

    (currentValue, previousValue) => {
      if (scrollDirection === "down") {
        if (currentValue >= totalContentHeight) {
          scrollY.value = 0;
          scrollTo(scrollRef, 0, 0, false);
        } else {
          scrollTo(scrollRef, 0, currentValue, false);
        }
      } else {
        if (currentValue <= 0) {
          scrollY.value = totalContentHeight;
          scrollTo(scrollRef, 0, totalContentHeight, false);
        } else {
          scrollTo(scrollRef, 0, currentValue, false);
        }
      }
    }
  );

  return (
    <Animated.ScrollView
      ref={scrollRef}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollViewContainer}
    >
      {items.map((item, index) => (
        <View
          key={index}
          style={[styles.iconContainer, { backgroundColor: item.color }]}
        >
          <Text style={styles.iconItemText}>{item.emoji}</Text>
        </View>
      ))}
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    paddingVertical: 20,
    gap: 10,
  },

  iconContainer: {
    width: 160,
    height: ITEM_HEIGHT,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
  },
  iconItemText: {
    fontSize: 50,
  },
});

export default SmoothInfiniteAnimated;
