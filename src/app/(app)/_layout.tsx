import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Layout = () => {
  return (
    <View style={styles.container}>
      <Text style={{ color: "red" }}>Inside App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Layout;
