import React, { Component } from "react";
import { Dimensions, View, Text, Image, TextInput } from "react-native";

import Button from "../../components/Button";

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
          <TextInput
            ref={input => (this.inputUsername = input)}
            style={styles.authInput}
            placeholder="Username..."
            placeholderTextColor="rgba(255, 255, 255, 0.56)"
            underlineColorAndroid="rgba(255, 255, 255, 0)"
          />
          <TextInput
            ref={input => (this.inputPassword = input)}
            style={styles.authInput}
            placeholder="Password..."
            secureTextEntry={true}
            placeholderTextColor="rgba(255, 255, 255, 0.56)"
            underlineColorAndroid="rgba(255, 255, 255, 0)"
          />
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
  authInput: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    backgroundColor: "#333333",
    color: "white",
    borderRadius: 3
  },
  authInput_active: {
    backgroundColor: "#222222",
    elevation: 2
  },
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
