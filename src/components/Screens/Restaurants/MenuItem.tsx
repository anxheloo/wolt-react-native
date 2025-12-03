import type { Dish } from "@/data/restaurant_menu";
import { Colors } from "@/theme";
import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface MenuItemProps {
  dish: Dish;
}

export const MenuItem = ({ dish }: MenuItemProps) => {
  return (
    <Link href={`/(modals)/(menu)/${dish.id}`} asChild>
      <TouchableOpacity style={styles.container} activeOpacity={0.7}>
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {dish.description}
            </Text>
            <View style={styles.priceRow}>
              <Text style={styles.price}>{dish.price.toFixed(2)} €</Text>
              {dish.isPopular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>POPULAR</Text>
                </View>
              )}
            </View>
          </View>
          <Image source={dish.image!} style={styles.image} />
        </View>
      </TouchableOpacity>
    </Link>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.light.primary,
  },
  popularBadge: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  popularText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: 0.5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
  },
});
