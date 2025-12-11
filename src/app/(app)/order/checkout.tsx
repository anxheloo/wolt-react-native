import type { OrderData } from "@/api/services/orderService";
import { orderService } from "@/api/services/orderService";
import { PurchaseButton } from "@/components/Buttons/PurchaseButton";
import { useAppStore } from "@/store/useAppStore";
import { Colors } from "@/theme";
import { Host, Picker } from "@expo/ui/swift-ui";
import { Ionicons } from "@expo/vector-icons";
import { AppleMaps } from "expo-maps";
import { Link, Stack, useRouter } from "expo-router";
import { useState } from "react";
import {
  Platform,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const MAP_HEIGHT = 250;

const Page = () => {
  const router = useRouter();
  const clearCart = useAppStore((state) => state.clearCart);
  const selectedRestaurant = useAppStore((state) => state.selectedRestaurant);
  const total = useAppStore((state) => state.total);
  const items = useAppStore((state) => state.items);
  const scrollOffset = useSharedValue(0);

  // State
  const [deliveryMode, setDeliveryMode] = useState<"delivery" | "pickup">(
    "delivery"
  );
  const [leaveAtDoor, setLeaveAtDoor] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState<
    "standard" | "schedule" | null
  >(null);
  const [tipAmount, setTipAmount] = useState(0);

  // Calculate fees
  const { serviceFee, deliveryFee } = orderService.calculateFees(total);
  const grandTotal = total + serviceFee + deliveryFee + tipAmount;

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const mapStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollOffset.value,
      [-100, 0, 200],
      [1.3, 1, 0.9],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      scrollOffset.value,
      [0, 200],
      [0, -50],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const handleCheckout = async () => {
    if (!deliveryTime) return;

    try {
      const orderData: OrderData = {
        items,
        restaurantId: selectedRestaurant?.id!,
        deliveryMode,
        leaveAtDoor,
        sendAsGift: false,
        deliveryTime,
        tipAmount,
        paymentMethod: "applepay" as const,
        subtotal: total,
        serviceFee,
        deliveryFee,
        total: grandTotal,
      };

      const result = await orderService.createOrder(orderData);
      console.log("order created: ", result);
      clearCart();
      router.dismissTo("/restaurants");
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: selectedRestaurant?.name }} />
      {Platform.OS === "ios" && (
        <Animated.View style={[styles.mapContainer, mapStyle]}>
          <AppleMaps.View
            style={StyleSheet.absoluteFill}
            cameraPosition={{
              coordinates: {
                latitude: selectedRestaurant?.location.latitude,
                longitude: selectedRestaurant?.location.longitude,
              },
              zoom: 15,
            }}
            markers={[
              {
                id: "restaurant",
                coordinates: {
                  latitude: selectedRestaurant?.location.latitude,
                  longitude: selectedRestaurant?.location.longitude,
                },
                title: selectedRestaurant?.name,
              },
            ]}
          />
        </Animated.View>
      )}

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: MAP_HEIGHT },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <Host matchContents>
              <Picker
                options={["Delivery", "Pickup"]}
                selectedIndex={deliveryMode === "delivery" ? 0 : 1}
                variant="segmented"
              />
            </Host>
          </View>

          {/* Delivery Address */}
          <TouchableOpacity style={styles.section}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Text style={styles.sectionTitle}>
                  Choose a delivery address
                </Text>
                <Text style={styles.sectionSubtitle}>Tap here to continue</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </TouchableOpacity>

          {/* Additional Options */}
          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.optionText}>Leave order at the door</Text>
              <Switch value={leaveAtDoor} onValueChange={setLeaveAtDoor} />
            </View>
          </View>

          <TouchableOpacity style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.optionText}>Send as a gift</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </TouchableOpacity>

          {/* When? Section */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>When?</Text>

            <TouchableOpacity
              style={styles.radioRow}
              onPress={() => setDeliveryTime("standard")}
              disabled
            >
              <View style={styles.radioLeft}>
                <View style={styles.radioCircle}>
                  {deliveryTime === "standard" && (
                    <View style={styles.radioSelected} />
                  )}
                </View>
                <View>
                  <Text style={[styles.radioLabel, styles.disabledText]}>
                    Standard
                  </Text>
                  <Text style={[styles.radioSubtext, styles.disabledText]}>
                    Currently unavailable
                  </Text>
                </View>
              </View>
            </TouchableOpacity>

            <Link href="/order/schedule" asChild>
              <TouchableOpacity
                style={styles.radioRow}
                onPress={() => setDeliveryTime("schedule")}
              >
                <View style={styles.radioLeft}>
                  <View style={styles.radioCircle}>
                    {deliveryTime === "schedule" && (
                      <View style={styles.radioSelected} />
                    )}
                  </View>
                  <View>
                    <Text style={styles.radioLabel}>Schedule</Text>
                    <Text style={styles.radioSubtext}>
                      Choose a delivery time
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          </View>

          {/* Payment Section */}
          <View style={styles.section}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <View style={styles.paymentIcon}>
                  <Ionicons name="logo-apple" size={24} color="#000" />
                </View>
                <Text style={styles.optionText}>Apple Pay</Text>
              </View>
              <Text style={styles.paymentAmount}>
                {grandTotal.toFixed(2)} €
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.optionText}>Redeem code</Text>
              <Ionicons name="chevron-forward" size={20} color="#999" />
            </View>
          </TouchableOpacity>

          {/* Add Courier Tip */}
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Add courier tip</Text>
            <Text style={styles.tipDescription}>
              100% of your tip goes to your courier. Its an easy way to say
              thanks for great service.
            </Text>

            <View style={styles.tipButtons}>
              {[0, 1, 2, 5].map((amount) => (
                <TouchableOpacity
                  key={amount}
                  style={[
                    styles.tipButton,
                    tipAmount === amount && styles.tipButtonActive,
                  ]}
                  onPress={() => setTipAmount(amount)}
                >
                  <Text
                    style={[
                      styles.tipButtonText,
                      tipAmount === amount && styles.tipButtonTextActive,
                    ]}
                  >
                    {amount === 0 ? "No tip" : `${amount} €`}
                  </Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.tipButton}>
                <Text style={styles.tipButtonText}>Custom</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Summary */}
          <View style={styles.section}>
            <TouchableOpacity style={styles.summaryHeader}>
              <Text style={styles.summaryHeaderText}>How fees work</Text>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={Colors.light.secondary}
              />
            </TouchableOpacity>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Item subtotal</Text>
              <Text style={styles.summaryValue}>{total.toFixed(2)} €</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Service fee</Text>
              <Text style={styles.summaryValue}>{serviceFee.toFixed(2)} €</Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery fee</Text>
              <Text style={styles.summaryValue}>
                {deliveryFee.toFixed(2)} €
              </Text>
            </View>

            {tipAmount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Courier tip</Text>
                <Text style={styles.summaryValue}>
                  {tipAmount.toFixed(2)} €
                </Text>
              </View>
            )}

            <View style={[styles.summaryRow, styles.summaryTotal]}>
              <Text style={styles.summaryTotalText}>Total</Text>
              <Text style={styles.summaryTotalValue}>
                {grandTotal.toFixed(2)} €
              </Text>
            </View>
          </View>

          {/* Bottom spacing for button */}
          <View style={{ height: 100 }} />
        </View>
      </Animated.ScrollView>

      <PurchaseButton
        onPress={handleCheckout}
        deliveryTimeSelected={deliveryTime === "schedule"}
      />
    </View>
  );
};
export default Page;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
  },
  headerTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
    marginHorizontal: 12,
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
  },
  mapContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: MAP_HEIGHT,
    zIndex: 0,
  },
  scrollContent: {
    paddingBottom: 16,
  },
  contentContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
    paddingTop: 8,
  },
  section: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#e8e8e8",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowLeft: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#999",
  },
  optionText: {
    fontSize: 16,
    color: "#000",
  },
  pickerContainer: {
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 4,
  },
  pickerOption: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  pickerOptionActive: {
    backgroundColor: "#fff",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
  },
  pickerOptionText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#666",
  },
  pickerOptionTextActive: {
    color: "#000",
    fontWeight: "600",
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginBottom: 16,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  radioLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.light.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.secondary,
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  radioSubtext: {
    fontSize: 14,
    color: "#666",
  },
  disabledText: {
    color: "#ccc",
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  tipDescription: {
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 16,
  },
  tipButtons: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  tipButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
  },
  tipButtonActive: {
    borderColor: Colors.light.secondary,
    backgroundColor: "#f0f9ff",
  },
  tipButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  tipButtonTextActive: {
    color: Colors.light.secondary,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginBottom: 16,
  },
  summaryHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.secondary,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 15,
    color: "#666",
  },
  summaryValue: {
    fontSize: 15,
    color: "#000",
  },
  summaryTotal: {
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e8e8e8",
    marginTop: 4,
  },
  summaryTotalText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
});
