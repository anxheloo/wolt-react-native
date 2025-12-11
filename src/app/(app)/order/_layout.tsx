import { Stack } from "@/components/ScreenTransition/Stack";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
const Layout = () => {
  const router = useRouter();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
          contentStyle: {
            // backgroundColor: '#fff',
          },
        }}
      />
      <Stack.Screen
        name="checkout"
        options={{
          title: "",
          headerBackButtonDisplayMode: "minimal",
          contentStyle: {
            backgroundColor: "#fff",
          },
        }}
      />
      <Stack.Screen
        name="schedule"
        options={{
          title: "Schedule delivery",
          presentation: "formSheet",
          // headerShown: false,
          sheetCornerRadius: 24,
          sheetGrabberVisible: true,
          sheetAllowedDetents: [0.5],
          contentStyle: {
            backgroundColor: "#fff",
          },
          headerRight: () => (
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => router.dismiss()}
            >
              <Ionicons name="close" size={28} color={"#000"} />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};
const styles = StyleSheet.create({
  closeButton: {
    marginLeft: 4,
  },
});
export default Layout;
