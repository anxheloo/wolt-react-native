import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CategoryList from "./CategoryList";
import RestaurantsList from "./RestaurantsList";

import { Fonts } from "@/theme";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RestaurantsListPage = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top + 60, flexGrow: 1 }}
      >
        <Text style={styles.pageTitle}>Restaurants</Text>
        <CategoryList />
        <Text style={styles.allRestaurantsTitle}>All Restaurants</Text>
        <RestaurantsList />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    fontFamily: Fonts.bold,
    fontSize: 30,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  allRestaurantsTitle: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  scrollViewContentContainer: {},
});

export default RestaurantsListPage;
