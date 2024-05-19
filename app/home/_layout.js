import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";

export default function _layout() {
  const params = useLocalSearchParams();
  const query = params.category;

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: !false,
          headerTintColor: "#00A3FF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          title: query, // should be changing dynamically
          headerStyle: {
            backgroundColor: "#191E31",
          },
        }}
      />
      <Stack.Screen
        name="anime"
        options={{
          headerShown: !false,
          headerTintColor: "#00A3FF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          title: query, // should be changing dynamically
          headerStyle: {
            backgroundColor: "#191E31",
          },
        }}
      />
      <Stack.Screen
        name="search"
        options={{
          headerShown: !false,
          headerTintColor: "#00A3FF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          headerTitleAlign: "center",
          title: query, // should be changing dynamically
          headerStyle: {
            backgroundColor: "#191E31",
          },
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({});
