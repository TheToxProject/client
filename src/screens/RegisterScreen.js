import React from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import RegisterForm from "../components/RegisterForm";

import Colors from "./../styles/colors";

export class RegisterScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.DARK_BACKGROUND}
          barStyle={"light-content"}
        />
        <RegisterForm />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.DARK_BACKGROUND
  }
});

export default RegisterScreen;
