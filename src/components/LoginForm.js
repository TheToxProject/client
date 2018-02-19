import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  Image,
  TextInput,
  Dimensions
} from "react-native";

import Input from "./Input";
import Button from "./Button";
import Logo from "./Logo";

export class LoginForm extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { width, height } = Dimensions.get("window");
    const formWidth = Platform.OS === "web" ? 400 : width - 60;

    return (
      <View style={[styles.loginView, { width: formWidth }]}>
        <Logo
          size={"normal"}
          variant={"white"}
          align={"center"}
          style={styles.logo}
        />
        <Text style={styles.title}>Login to your Tox profile</Text>
        <Input
          name="username"
          placeholder={"Username..."}
          autocomplete={false}
        />
        <Input
          name="password"
          placeholder={"Password..."}
          secureTextEntry={true}
          autocomplete={false}
        />
        <View style={styles.actions}>
          <Button
            uppercase={true}
            onPress={() => this.props.onLoginButtonPress()}
            onPressDelay={200}
            text="Sign in"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginView: {
    ...Platform.select({
      web: {
        backgroundColor: "#555",
        padding: 32,
        borderRadius: 5
      }
    })
  },
  logo: {
    marginBottom: 32,
    alignSelf: "center"
  },
  title: {
    color: "rgba(255,255,255,.87)",
    fontSize: 22,
    marginBottom: 8,
    paddingBottom: 12,
    textAlign: "center",
    ...Platform.select({
      web: {
        borderBottom: "3px solid rgba(255, 255, 255, .2)"
      },
      default: {
        borderBottomColor: "rgba(255, 255, 255, .3)",
        borderBottomWidth: 2
      }
    })
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
});

export default LoginForm;
