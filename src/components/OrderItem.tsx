import { CartItem } from "@/hooks/use-cartstore";
import { useAppStore } from "@/store/useAppStore";
import { Colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  Easing,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

interface OrderItemProps {
  item: CartItem;
}
const THRESHOLD = 50;

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const hasReachedThresholdUp = useSharedValue(false);
  const hasReachedThresholdDown = useSharedValue(false);

  useAnimatedReaction(
    () => {
      return drag.value;
    },
    (dragValue) => {
      if (Math.abs(dragValue) > THRESHOLD && !hasReachedThresholdUp.value) {
        scheduleOnRN(Haptics.impactAsync, Haptics.ImpactFeedbackStyle.Medium);
        hasReachedThresholdUp.value = true;
        hasReachedThresholdDown.value = false;
      } else if (
        Math.abs(dragValue) < THRESHOLD &&
        !hasReachedThresholdDown.value
      ) {
        scheduleOnRN(Haptics.impactAsync, Haptics.ImpactFeedbackStyle.Medium);
        hasReachedThresholdUp.value = false;
        hasReachedThresholdDown.value = true;
      }
    }
  );

  const iconStyleAnimation = useAnimatedStyle(() => {
    const translateX = drag.value > -THRESHOLD ? drag.value + THRESHOLD : 0;

    return {
      transform: [{ translateX }],
    };
  });

  return (
    <Reanimated.View style={styles.rightActionContainer}>
      <Reanimated.View style={[styles.rightActionIcon, iconStyleAnimation]}>
        <Ionicons name="trash" size={24} color={"#fff"} />
      </Reanimated.View>
    </Reanimated.View>
  );
}

const OrderItem = ({ item }: OrderItemProps) => {
  const reanimatedRef = useRef<SwipeableMethods>(null);
  const heightAnim = useSharedValue(90);
  const opacityAnim = useSharedValue(1);
  const removeItem = useAppStore((state) => state.removeItem);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: heightAnim.value,
      opacity: opacityAnim.value,
    };
  });

  const onSwipeableOpen = () => {
    heightAnim.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
    opacityAnim.value = withTiming(
      0,
      {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      },
      () => {
        scheduleOnRN(removeItem, item.dish.id);
      }
    );
    console.log("Opened");
  };

  return (
    <Reanimated.View style={[animatedStyle, { overflow: "hidden" }]}>
      <ReanimatedSwipeable
        ref={reanimatedRef}
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={RightAction}
        onSwipeableWillOpen={onSwipeableOpen}
      >
        <View style={styles.orderItem}>
          <View style={styles.quantityControl}>
            <Text style={styles.quantityText}>{item.quantity}</Text>
          </View>

          <View style={styles.itemDetails}>
            <Text style={styles.itemName}>{item.dish.name}</Text>
            <Text style={styles.itemMeta}>
              {item.quantity} x {item.dish.price.toFixed(2)} €
            </Text>
            <Text style={styles.itemPrice}>
              {(item.dish.price * item.quantity).toFixed(2)} €
            </Text>
          </View>

          <Image source={item.dish.image!} style={styles.itemImage} />
        </View>
      </ReanimatedSwipeable>
    </Reanimated.View>
  );
};
export default OrderItem;

const styles = StyleSheet.create({
  orderItem: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    backgroundColor: "#fff",
  },
  quantityControl: {
    width: 40,
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 600,
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
    gap: 4,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 600,
  },
  itemMeta: {
    fontSize: 13,
    color: Colors.light.muted,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: 600,
    color: Colors.light.secondary,
  },
  rightActionContainer: {
    backgroundColor: "#ff3b30",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  rightActionIcon: {
    width: 50,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
