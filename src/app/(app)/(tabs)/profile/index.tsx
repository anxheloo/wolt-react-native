import React from "react";
import { ScrollView, StyleSheet } from "react-native";

const Index = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.scrollViewContainer}
    ></ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
});

export default Index;
