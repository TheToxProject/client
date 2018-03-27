import React, { Component } from "react";
import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import { Button } from "@toxclient/shathui";

import { Link } from "./../utilities/routing/router";
import Colors from "../styles/colors";
import Input from "./Input";
import FormHeader from "./FormHeader";

export class LoginForm extends Component {
  render() {
    const { width } = Dimensions.get("window");
    const formWidth = Platform.OS === "web" ? 400 : width - 60;
    const { disableLinks, onLayout, onLoginButtonPress, t } = this.props;
    const ButtonLink = disableLinks ? View : Link;

    return (
      <View
        onLayout={onLayout}
        style={[this.props.style, styles.loginView, { width: formWidth }]}
      >
        <FormHeader text={t("login:header")} />
        {/**
         * @todo Replace the username input by a profile dropdown.
         * @body Tox works with profiles files instead of hosted accounts.
         */}
        <Input
          name="username"
          placeholder={t("login:fields.username")}
          autoComplete={"off"}
        />
        <Input
          name="password"
          placeholder={t("login:fields.password")}
          secureTextEntry={true}
          autoComplete={"off"}
        />
        <View style={styles.actions}>
          <Button
            uppercase={true}
            onPress={onLoginButtonPress}
            onPressDelay={200}
            text={t("login:actions.login")}
            backgroundColor={Colors.ACCENT}
            color={Colors.TEXT}
            size={"normal"}
          />
          <ButtonLink to="/auth/register">
            <Text style={styles.createAccount}>
              {t("login:actions.register")}
            </Text>
          </ButtonLink>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loginView: {
    /*...Platform.select({
      web: {
        backgroundColor: Colors.PRIMARY_TEXT,
        padding: 32,
        borderRadius: 5
      }
    })*/
  },
  actions: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  createAccount: {
    fontSize: 16,
    color: "white",
    padding: 8,
    backgroundColor: "transparent",
    borderRadius: 3
  }
});

export default LoginForm;
