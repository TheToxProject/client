import React, { Component } from "react";
import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";

import { Link } from "./../utilities/routing/router";
import Input from "./Input";
import Button from "./Button";
import Logo from "./Logo";
import FormHeader from "./FormHeader";

export class RegisterForm extends Component {
  render() {
    const { width } = Dimensions.get("window");
    const formWidth = Platform.OS === "web" ? 400 : width - 60;
    const { disableLinks } = this.props;
    const ButtonLink = disableLinks ? View : Link;

    return (
      <View style={[styles.loginView, { width: formWidth }]}>
        <Logo
          size={"normal"}
          variant={"white"}
          align={"center"}
          style={styles.logo}
        />
        <FormHeader text="Create your Tox account 🤠" />
        <Input name="username" placeholder={"Choose your username..."} />
        <Input
          name="password"
          placeholder={"Type your password..."}
          secureTextEntry={true}
        />
        <Input
          name="password_confirm"
          placeholder={"Confirm your password..."}
          secureTextEntry={true}
        />
        <View style={styles.actions}>
          <Button
            uppercase={true}
            onPress={() => this.props.onRegisterButtonPress()}
            onPressDelay={200}
            text="Register"
          />
          <ButtonLink to="/">
            <Text style={styles.backLogin}>Back to login</Text>
          </ButtonLink>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 60,
    marginBottom: 32,
    alignSelf: "center"
  },
  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  backLogin: {
    fontSize: 16,
    color: "white",
    padding: 8,
    backgroundColor: "transparent",
    borderRadius: 3
  }
});

export default RegisterForm;
