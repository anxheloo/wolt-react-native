import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Id = () => {
  const { id } = useLocalSearchParams();

  console.log("This is id:", id);

  return (
    <View style={styles.container}>
      <Text>Restaurant Id: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Id;
