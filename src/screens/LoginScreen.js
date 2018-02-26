import React from "react";
import { StyleSheet, View } from "react-native";
import { withRouter } from "./../utilities/routing/router";

import Colors from "./../styles/colors";
import LoginForm from "./../components/LoginForm";

class LoginScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
  }

  onLoginButtonPress() {
    /**
     * @todo Handle the magic here.
     */

    const { history } = this.props;
    history.replace("/recents");
  }

  render() {
    return (
      <View style={styles.container}>
        <LoginForm
          onLoginButtonPress={this.onLoginButtonPress}
        />
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

export default withRouter(LoginScreen);
