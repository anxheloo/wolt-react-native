import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useRestaurants } from "@/api/queries/useRestaurants";
import { Colors } from "@/theme";
import { Image } from "expo-image";
import { Link } from "expo-router";

import { Restaurant } from "@/data/restaurants";
import Ionicons from "@expo/vector-icons/Ionicons";

const RestaurantsList = () => {
  const { data: restaurants, isLoading, error } = useRestaurants();

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={Colors.light.secondary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 16, alignItems: "center" }}>
        <Text style={{ color: Colors.light.dark, marginBottom: 8 }}>
          Failed to load restaurants
        </Text>
        <Text style={{ color: Colors.light.muted }}>
          {error instanceof Error ? error.message : "Please try again later"}
        </Text>
      </View>
    );
  }

  const renderRestaurants = ({ item }: { item: Restaurant }) => (
    <View key={item.id}>
      <Link href={`/(modals)/(restaurant)/${item.id}`} asChild>
        <TouchableOpacity style={styles.card}>
          <Image source={item.image!} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
          <View style={styles.metadata}>
            <Ionicons
              name="bicycle-outline"
              size={16}
              color={Colors.light.muted}
            />
            <Text style={styles.metadataText}>
              €{item.deliveryFee.toFixed(2)}
            </Text>
            <Text style={styles.dot}>•</Text>
            <Text style={styles.metadataText}>€€€€</Text>
            <Text style={styles.dot}>•</Text>
            <Ionicons
              name="happy-outline"
              size={16}
              color={Colors.light.muted}
            />
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );

  return (
    // <>
    //   {restaurants?.map((item) => (
    //     <View key={item.id}>
    //       <Link href={`/(modal)/(restaurant)/${item.id}`} asChild>
    //         <TouchableOpacity style={styles.card}>
    //           <Image source={item.image!} style={styles.image} />
    //           <View style={styles.info}>
    //             <Text style={styles.name}>{item.name}</Text>
    //             <Text style={styles.description} numberOfLines={2}>
    //               {item.description}
    //             </Text>
    //           </View>
    //           <View style={styles.metadata}>
    //             <Ionicons
    //               name="bicycle-outline"
    //               size={16}
    //               color={Colors.light.muted}
    //             />
    //             <Text style={styles.metadataText}>
    //               €{item.deliveryFee.toFixed(2)}
    //             </Text>
    //             <Text style={styles.dot}>•</Text>
    //             <Text style={styles.metadataText}>€€€€</Text>
    //             <Text style={styles.dot}>•</Text>
    //             <Ionicons
    //               name="happy-outline"
    //               size={16}
    //               color={Colors.light.muted}
    //             />
    //           </View>
    //         </TouchableOpacity>
    //       </Link>
    //     </View>
    //   ))}
    // </>

    <FlatList
      showsVerticalScrollIndicator={false}
      data={restaurants}
      renderItem={renderRestaurants}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.light.light,
    overflow: "hidden",
    boxShadow: "0px 4px 2px -2px rgba(0,0,0, 0.2)",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.light.muted,
  },
  metadata: {
    borderTopColor: Colors.light.light,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 10,
  },
  metadataText: {
    fontSize: 13,
    color: Colors.light.muted,
  },
  dot: {
    color: "#999",
    fontSize: 13,
  },
});

export default RestaurantsList;
