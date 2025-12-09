import { Colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface RestaurantHeaderProps {
  scrollOffset: SharedValue<number>;
}

const SCROLL_THRESHOLD_START = 50;
const SCROLL_THRESHOLD_END = 80;

const RestaurantDetailsHeader = ({ scrollOffset }: RestaurantHeaderProps) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const headerStyle = useAnimatedStyle(() => {
    const backgroundOpacity = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD_START, SCROLL_THRESHOLD_END],
      [0, 1],
      Extrapolation.CLAMP
    );

    const shadowOpacity = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD_START, SCROLL_THRESHOLD_END],
      [0, 0.1],
      Extrapolation.CLAMP
    );

    return {
      backgroundColor: `rgba(255,255,255, ${backgroundOpacity})`,
      shadowOpacity,
    };
  });

  const searchBarStyle = useAnimatedStyle(() => {
    const backgroundOpacity = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD_START],
      [0.8, 1],
      Extrapolation.CLAMP
    );

    return {
      backgroundColor: `rgba(230, 230, 230, ${backgroundOpacity})`,
    };
  });

  const buttonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD_END],
      [1, 0],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD_END],
      [20, -20],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const buttonStyle2 = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollOffset.value,
      [SCROLL_THRESHOLD_START * 0.3, SCROLL_THRESHOLD_END],
      [0, 1],
      Extrapolation.CLAMP
    );

    const translateY = interpolate(
      scrollOffset.value,
      [0, SCROLL_THRESHOLD_END],
      [20, -20],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View
      style={[styles.headerContainer, headerStyle, { paddingTop: insets.top }]}
    >
      <View style={[styles.headerContent]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={25} />
        </TouchableOpacity>

        <Animated.View style={[styles.searchBar, searchBarStyle]}>
          <Ionicons name="search" size={20} color={Colors.light.muted} />
          <TextInput
            style={{ fontSize: 15 }}
            placeholder="Search"
            placeholderTextColor={Colors.light.muted}
          />
        </Animated.View>

        <View
          style={{
            width: 40,
            height: 40,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Animated.View style={[styles.iconButton, buttonStyle]}>
            <Ionicons name="heart-outline" size={24} />
          </Animated.View>

          <Animated.View style={[styles.iconButton, buttonStyle2]}>
            <Ionicons name="ellipsis-horizontal" size={24} />
            {/* <Host matchContents>
            <ContextMenu>
              <ContextMenu.Items>
                <Button
                  systemImage="info.circle.fill"
                  onPress={() => console.log("Pressed1")}
                >
                  More info
                </Button>
                <Button systemImage="heart">Add to favorites</Button>
                <Button systemImage="square.and.arrow.up">Share venue</Button>
              </ContextMenu.Items>
              <ContextMenu.Trigger>
                <Button systemImage="ellipsis" color={Colors.light.dark} />
              </ContextMenu.Trigger>
            </ContextMenu>
          </Host> */}
          </Animated.View>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.05)",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.light,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.1)",
  },
  searchBar: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 8,
  },
  iconButton: {
    // position: "absolute",
    // top: 12,
    // right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.light.light,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.1)",
  },
});
export default RestaurantDetailsHeader;
