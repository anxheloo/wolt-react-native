import { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Link, useRouter } from "expo-router";

import {
  useRestaurantMarkers,
  useRestaurants,
} from "@/api/queries/useRestaurants";

import { Colors } from "@/theme";

import { AppleMaps, GoogleMaps } from "expo-maps";

import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as Location from "expo-location";
import { AppleMapsMapType } from "expo-maps/build/apple/AppleMaps.types";
import { GoogleMapsMapType } from "expo-maps/build/google/GoogleMaps.types";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Map = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const appleMapRef = useRef<AppleMaps.MapView | null>(null);
  const googleMapRef = useRef<GoogleMaps.MapView | null>(null);
  const { data: restaurants, isLoading: restaurantsLoading } = useRestaurants();
  const { data: restaurantMarkers, isLoading: restaurantMarkersLoading } =
    useRestaurantMarkers();

  const locateMe = async () => {
    let location = await Location.getCurrentPositionAsync();
    const mapRef = Platform.OS === "ios" ? appleMapRef : googleMapRef;
    mapRef.current?.setCameraPosition({
      coordinates: {
        latitude: location.coords.latitude ?? 60.1699,
        longitude: location.coords.longitude ?? 24.9384,
      },
      zoom: 14,
    });
  };

  useEffect(() => {
    async function getCurrentLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        await locateMe();
      } else {
        Alert.alert(
          "Permission Required",
          `Please enable ${name} permissions in your device settings.`,
          [
            { text: "OK" },
            {
              text: "Settings",
              onPress: () => Linking.openSettings(),
            },
          ]
        );
      }
    }

    getCurrentLocation();
  }, []);

  const markers: AppleMaps.Marker[] =
    restaurantMarkers?.map((marker) => ({
      id: marker.id,
      systemImage: "circle.fill",
      tintColor: Colors.light.muted,
      coordinates: {
        latitude: marker.latitude,
        longitude: marker.longitude,
      },
      title: marker.name,
    })) || [];

  const markerSelected = (e: any) => {
    router.push(`/(modal)/(restaurant)/${e.id}`);
  };

  if (restaurantMarkersLoading || restaurantsLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </View>
    );
  }

  return (
    <>
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.dismiss()}
        >
          <Ionicons name="chevron-back" size={22} color={Colors.light.muted} />
        </TouchableOpacity>
        <View style={styles.headerRight}>
          <Link href={"/(app)/(auth)/(modal)/filter"} asChild>
            <TouchableOpacity style={styles.backButton}>
              <Ionicons name="filter" size={22} />
            </TouchableOpacity>
          </Link>
          <TouchableOpacity style={styles.backButton} onPress={locateMe}>
            <Ionicons name="locate-outline" size={22} />
          </TouchableOpacity>
        </View>
      </View>

      {Platform.OS === "ios" ? (
        <AppleMaps.View
          ref={appleMapRef}
          style={StyleSheet.absoluteFill}
          markers={markers}
          properties={{
            isTrafficEnabled: false,
            mapType: AppleMapsMapType.STANDARD,
            selectionEnabled: false,
            isMyLocationEnabled: false,
          }}
          uiSettings={{
            myLocationButtonEnabled: false,
            compassEnabled: false,
          }}
          onMarkerClick={markerSelected}
        />
      ) : (
        <GoogleMaps.View
          ref={googleMapRef}
          style={StyleSheet.absoluteFill}
          markers={markers}
          properties={{
            isTrafficEnabled: false,
            mapType: GoogleMapsMapType.NORMAL,
            selectionEnabled: false,
            isMyLocationEnabled: false,
          }}
          uiSettings={{
            myLocationButtonEnabled: false,
            compassEnabled: false,
          }}
          onMarkerClick={markerSelected}
        />
      )}

      <View style={styles.footerScroll}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {restaurants?.map((restaurant) => (
            <TouchableOpacity
              key={restaurant.id}
              style={styles.card}
              onPress={() =>
                router.push(`/(modal)/(restaurant)/${restaurant.id}`)
              }
            >
              <Image source={restaurant.image!} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle} numberOfLines={1}>
                    {restaurant.name}
                  </Text>
                  {restaurant.tags.includes("Wolt+") && (
                    <View style={styles.woltBadge}>
                      <Text style={styles.woltBadgeText}>W+</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.cardDescription} numberOfLines={1}>
                  {restaurant.description}
                </Text>
                <View style={styles.cardFooter}>
                  <Ionicons name="bicycle-outline" size={14} color="#666" />
                  <Text style={styles.cardFooterText}>
                    {restaurant.deliveryFee === 0
                      ? "Free delivery"
                      : `${restaurant.deliveryFee.toFixed(2)} €`}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: Colors.light.background,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0px 4px 2px -2px rgba(0, 0, 0, 0.1)",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  footerScroll: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    paddingBottom: 20,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
    marginVertical: 16,
  },
  card: {
    width: 280,
    backgroundColor: "#fff",
    borderRadius: 16,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
    flexDirection: "row",
  },
  cardImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    margin: 10,
  },
  cardContent: {
    flex: 1,
    padding: 12,
    paddingLeft: 0,
    justifyContent: "center",
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    flex: 1,
  },
  woltBadge: {
    backgroundColor: "#009de0",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  woltBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#fff",
  },
  cardDescription: {
    fontSize: 13,
    color: "#666",
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  cardFooterText: {
    fontSize: 12,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});

export default Map;
