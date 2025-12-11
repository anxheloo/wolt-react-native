import { useAppStore } from "@/store/useAppStore";
import { Colors } from "@/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const CheckoutButton = () => {
  const insets = useSafeAreaInsets();
  const totalItems = useAppStore((state) => state.totalItems);
  const total = useAppStore((state) => state.total);

  return (
    <>
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 0)",
          "rgba(255, 255, 255, 0.7)",
          "rgba(255, 255, 255, 1)",
        ]}
        style={[
          styles.gradientContainer,
          { paddingBottom: insets.bottom || 16 },
        ]}
        pointerEvents="none"
      />
      <View
        style={[
          styles.viewOrderContainer,
          { paddingBottom: insets.bottom || 16 },
        ]}
      >
        <Link href={"/order/checkout"} asChild>
          <TouchableOpacity style={styles.viewOrderButton}>
            <View style={styles.viewOrderLeft}>
              <View style={styles.itemCountBadge}>
                <Text style={styles.itemCountText}>{totalItems}</Text>
              </View>
              <Text style={styles.viewOrderText}>Go to checkout</Text>
            </View>
            <Text style={styles.viewOrderPrice}>{total.toFixed(2)}</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
};
export default CheckoutButton;

const styles = StyleSheet.create({
  gradientContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
    paddingTop: 40,
  },
  viewOrderContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  viewOrderButton: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px 4px 12px rgba(0, 157, 224, 0.3)",
  },
  viewOrderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  itemCountBadge: {
    backgroundColor: "#fff",
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  itemCountText: {
    fontSize: 14,
    fontWeight: 700,
    color: Colors.light.secondary,
  },
  viewOrderText: {
    fontSize: 16,
    fontWeight: 600,
    color: "#fff",
  },
  viewOrderPrice: {
    fontSize: 16,
    fontWeight: 700,
    color: "#fff",
  },
});
