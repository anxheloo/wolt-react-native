import { useDish } from "@/api/queries/useMenu";
import { useAppStore } from "@/store/useAppStore";
import { Colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const dishId = parseInt(id || "0");
  const addItem = useAppStore((state) => state.addItem);

  const { data: dish, isLoading } = useDish(dishId);

  const [quantity, setQuantity] = useState(1);

  const addonOptions = [
    { id: "yogurt", label: "With mild yogurt", price: 0 },
    { id: "extra-spicy", label: "Extra spicy", price: 0 },
    { id: "extra-sauce", label: "Extra sauce", price: 0.5 },
  ];

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color={Colors.light.secondary} />
      </View>
    );
  }

  if (!dish) {
    return (
      <View>
        <Text>Dish not found</Text>
      </View>
    );
  }

  const totalPrice = dish.price * quantity;

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const onAddToOrder = () => {
    addItem(dish, quantity);
    router.dismiss();
  };

  return (
    <>
      <View style={[styles.container]}>
        {/* Close Button */}
        <TouchableOpacity
          style={[styles.closeButton]}
          onPress={() => router.back()}
        >
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>

        {/* Scrollable Content */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ marginBottom: 100 }}
        >
          {/* Dish Image */}
          <View style={styles.imageContainer}>
            <Image source={dish.image!} style={styles.image} />
          </View>

          {/* Dish Info */}
          <View style={styles.infoSection}>
            <Text style={styles.dishName}>{dish.name}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{dish.price.toFixed(2)} €</Text>
              {dish.isPopular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>★ POPULAR</Text>
                </View>
              )}
              <View style={styles.veganBadge}>
                <Text style={styles.veganText}>🌱 VEGAN</Text>
              </View>
            </View>
            <Text style={styles.description}>{dish.description}</Text>
          </View>

          {/* Addon Options */}
          <View style={styles.optionsSection}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionTitle}>Your ingredients</Text>
              <TouchableOpacity>
                <Ionicons
                  name="information-circle-outline"
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            {addonOptions.map((option) => (
              <TouchableOpacity key={option.id} style={styles.checkboxOption}>
                <View style={styles.checkboxLeft}>
                  <View style={styles.checkbox}></View>
                  <Text style={styles.checkboxLabel}>{option.label}</Text>
                </View>
                {option.price > 0 && (
                  <Text style={styles.optionPrice}>
                    +{option.price.toFixed(2)} €
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Fixed Bottom Buttons */}
      <View style={[styles.bottomBar]}>
        {/* Quantity Controls */}
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleDecrement}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={handleIncrement}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Order Button */}
        <TouchableOpacity style={styles.addButton} onPress={onAddToOrder}>
          <Text style={styles.addButtonText}>Add to order</Text>
          <Text style={styles.addButtonPrice}>{totalPrice.toFixed(2)} €</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};
export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  errorText: {
    fontSize: 16,
    color: "#ff4444",
  },
  closeButton: {
    position: "absolute",
    top: 16,
    right: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.15)",
  },

  imageContainer: {
    alignItems: "center",
    paddingVertical: 32,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#e0e0e0",
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  dishName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#000",
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.secondary,
  },
  popularBadge: {
    backgroundColor: Colors.light.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  popularText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  veganBadge: {
    backgroundColor: "#4caf50",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  veganText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },
  optionsSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 8,
    borderTopColor: "#f5f5f5",
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
  },
  optionPrice: {
    fontSize: 14,
    color: "#666",
    fontWeight: "500",
  },
  checkboxOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
  },
  checkboxLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.light.secondary,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#000",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    flexDirection: "row",
    gap: 12,
    boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 4,
  },
  quantityButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  quantityButtonText: {
    fontSize: 24,
    fontWeight: "600",
    color: Colors.light.secondary,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    minWidth: 30,
    textAlign: "center",
  },
  addButton: {
    flex: 1,
    backgroundColor: Colors.light.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  addButtonPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: "#fff",
  },
});
