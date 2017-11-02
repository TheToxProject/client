import React, { Component } from "react";
import { View, Text, Button } from "react-native";

export default class AuthRender extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.main}>
        <Text style={styles.h1}>Welcome from AuthScreen</Text>
        <Button
          onPress={() => this.props.onLoginButtonPress()}
          title="Go to MainScreen"
        />
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
    paddingVertical: 8,
    backgroundColor: "white"
  },
  h1: {
    fontSize: 32,
    color: "black",
    marginBottom: 16,
    fontWeight: "bold",
    textAlign: "center"
  }
};
