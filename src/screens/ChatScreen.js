import React from "react";
import { Platform, StyleSheet, View, Text } from "react-native";
import { withRouter } from "./../utilities/routing/router";

import Colors from "./../styles/colors";
import Button from "./../components/Button";

export class ChatScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onBackButtonPress = this.onBackButtonPress.bind(this);
  }

  componentDidMount() {
    //alert(JSON.stringify(this.props));
    console.log(this.props);
  }

  onBackButtonPress() {
    /**
     * @todo Handle the magic here.
     */

    const { history } = this.props;
    history.goBack();
  }

  render() {
    const { contact } = this.props.location.state || { contact: null };

    return (
      <View style={styles.container}>
        <Text>Go chat with {contact ? contact.username : "someone"}</Text>
        {Platform.OS !== "web" && (
          <Button
            text="Back"
            backgroundColor={Colors.ACCENT}
            color={Colors.TEXT}
            onPress={this.onBackButtonPress}
          />
        )}
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
    backgroundColor: Colors.BACKGROUND
  }
});

export default withRouter(ChatScreen);
