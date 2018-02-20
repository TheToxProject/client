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

import { Link } from "./../utilities/routing/router";
import Input from "./Input";
import Button from "./Button";
import Logo from "./Logo";
import FormHeader from "./FormHeader";

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
        <FormHeader text="Login to your Tox profile" />
        {/**
         * @todo Replace the username input by a profile dropdown.
         * @body Tox works with profiles files instead of hosted accounts.
         */}
        <Input
          name="username"
          placeholder={"Username..."}
          autoComplete={false}
        />
        <Input
          name="password"
          placeholder={"Password..."}
          secureTextEntry={true}
          autoComplete={false}
        />
        <View style={styles.actions}>
          <Button
            uppercase={true}
            onPress={() => this.props.onLoginButtonPress()}
            onPressDelay={200}
            text="Sign in"
          />
          <Link to="/auth/register">Create a profile</Link>
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
