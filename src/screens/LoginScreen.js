import React from "react";
import { StyleSheet, View } from "react-native";
import LoginForm from "./../components/LoginForm";

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <LoginForm />
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
    backgroundColor: "#414141"
  }
});

export default LoginScreen;
