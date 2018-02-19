import React from "react";
import { StyleSheet, View } from "react-native";
import RegisterForm from "../components/RegisterForm";

class RegisterScreen extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <View style={styles.container}>
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
    backgroundColor: "#414141"
  }
});

export default RegisterScreen;
