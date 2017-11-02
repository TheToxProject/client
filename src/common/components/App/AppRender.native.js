import React, { Component } from "react";
import { StyleSheet, View, Text, Platform } from "react-native";

import styles from "./styles";

export default class AppRender extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.h1}>Tox: {"\n"}Secure messenger.</Text>
        <Text style={styles.subtitle}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa quod
          illo inventore, molestias, officiis quibusdam nesciunt vero neque,
          deleniti repellendus, quis nisi sequi sunt alias est sapiente
          blanditiis iusto. Enim.
        </Text>
      </View>
    );
  }
}
