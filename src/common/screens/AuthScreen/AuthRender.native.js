import React, { Component } from "react";
import { Dimensions, View, Text, Image, TextInput } from "react-native";

import Button from "../../components/Button";
import Input from "../../components/Input";

export default class AuthRender extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { width, height } = Dimensions.get("window");
    const formWidth = width - 60;

    return (
      <View style={styles.authScreen}>
        <Image
          style={styles.logo}
          resizeMode={"contain"}
          source={require("../../../assets/tox-logo.png")}
        />
        <View style={[styles.loginForm, { width: formWidth }]}>
          <Input placeholder="Username..." />
          <Input placeholder="Password..." secureTextEntry={true} />
          <View style={styles.actions}>
            <Button
              uppercase={true}
              onPress={() => this.props.onLoginButtonPress()}
              onPressDelay={200}
              text="Sign in"
            />
            <Text
              onPress={() => this.props.onRegisterButtonPress()}
              style={styles.createAccount}
            >
              Create an account
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = {
  authScreen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#414141"
  },
  logo: {
    width: 150,
    height: 60,
    marginBottom: 32
  },
  loginForm: {},

  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  createAccount: {
    fontSize: 16,
    color: "white"
  }
};
