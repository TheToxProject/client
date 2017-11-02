import React, { Component } from "react";
import { View, Text } from "react-native";

export default class MainRender extends Component {
  render() {
    return (
      <View style={styles.main}>
        <Text>Welcome from MainScreen</Text>
      </View>
    );
  }
}

const styles = {
  main: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8
  }
};
