"use strict";

import React, { Component } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";

export default function() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Konv: {"\n"}Secure messenger.</Text>
    </View>
  );
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red"
  },
  h1: {
    fontFamily: "sans-serif",
    fontWeight: "bold",
    fontSize: 32,
    textAlign: "center",
    color: "white"
  }
});
