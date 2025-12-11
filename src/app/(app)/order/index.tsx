import { usePopularDishes } from "@/api/queries/useMenu";
import CheckoutButton from "@/components/Buttons/CheckoutButton";
import OrderItem from "@/components/OrderItem";
import { RecommendedDish } from "@/components/RecommendedDish";
import { useAppStore } from "@/store/useAppStore";
import { Colors } from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const Page = () => {
  const router = useRouter();
  const { top } = useSafeAreaInsets();
  const items = useAppStore((state) => state.items);
  const selectedRestaurant = useAppStore((state) => state.selectedRestaurant);

  const { data: recommendedDishes } = usePopularDishes("rest_001");

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: top }]}>
        <View style={styles.restaurantInfo}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.dismiss()}
          >
            <Ionicons name="chevron-down" size={24} />
          </TouchableOpacity>
          <View style={styles.restaurantTextContainer}>
            <Text style={styles.restaurantName} numberOfLines={1}>
              {selectedRestaurant?.name}
            </Text>
            <Text style={styles.orderSubtitle}>Your Order</Text>
          </View>
        </View>
      </View>

      {/* Order items */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectiontitle}>Order items</Text>
            <TouchableOpacity onPress={() => router.dismiss()}>
              <Text style={styles.addMoreLink}>+ Add more</Text>
            </TouchableOpacity>
          </View>
          {items.map((item) => (
            <OrderItem key={item.dish.id} item={item} />
          ))}
        </View>

        {/* Recommended dishes */}
        {recommendedDishes && recommendedDishes.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectiontitle}>Recommended for your</Text>
            </View>
            <View style={styles.recommendedGrid}>
              {recommendedDishes.map((dish) => (
                <RecommendedDish key={dish.id} dish={dish} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Checkout button */}
      <CheckoutButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 12,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1,
  },
  restaurantInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  restaurantTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 48,
  },
  restaurantName: {
    fontSize: 15,
    fontWeight: 700,
    marginBottom: 2,
  },
  orderSubtitle: {
    fontSize: 13,
    color: Colors.light.muted,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  section: {
    paddingTop: 16,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  sectiontitle: {
    fontSize: 20,
    fontWeight: 700,
  },
  addMoreLink: {
    fontSize: 16,
    fontWeight: 600,
    color: Colors.light.secondary,
  },
  recommendedGrid: {
    backgroundColor: "#fff",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 16,
  },
});
export default Page;
