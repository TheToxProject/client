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
    const { disableLinks, t } = this.props;
    const ButtonLink = disableLinks ? View : Link;

    return (
      <View style={[styles.loginView, { width: formWidth }]}>
        <Logo
          size={"normal"}
          variant={"white"}
          align={"center"}
          style={styles.logo}
        />
        <FormHeader text={t("register:header")} />
        <Input name="username" placeholder={t("register:fields.username")} />
        <Input
          name="password"
          placeholder={t("register:fields.password")}
          secureTextEntry={true}
        />
        <Input
          name="password_confirm"
          placeholder={t("register:fields.password_confirm")}
          secureTextEntry={true}
        />
        <View style={styles.actions}>
          <Button
            uppercase={true}
            onPress={() => this.props.onRegisterButtonPress()}
            onPressDelay={200}
            text={t("register:actions.register")}
          />
          <ButtonLink to="/">
            <Text style={styles.backLogin}>{t("register:actions.login")}</Text>
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
