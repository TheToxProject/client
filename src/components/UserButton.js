import React, { Component } from "react";
import { View, Platform } from "react-native";
import { Avatar, Touchable } from "@toxclient/shathui";

const DEFAULT_SIZE = 36;
const DEFAULT_PRESS_DELAY = 300;

export class UserButton extends Component {
  render() {
    const { avatarUri, username, onPress } = this.props;

    return (
      <View style={styles.container}>
        <Touchable
          style={styles.ripple}
          onPress={() => setTimeout(onPress, DEFAULT_PRESS_DELAY)}
        >
          <Avatar
            source={{ uri: avatarUri }}
            size={DEFAULT_SIZE}
            username={username}
          />
        </Touchable>
      </View>
    );
  }
}

export default UserButton;

const styles = {
  noSelect: {
    ...Platform.select({
      web: {
        userSelect: "none"
      }
    })
  },
  container: {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
    borderRadius: DEFAULT_SIZE,
    overflow: "hidden",
    ...Platform.select({
      web: {
        cursor: "pointer"
      },
      default: {
        elevation: 2
      }
    })
  },
  ripple: {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
    borderRadius: DEFAULT_SIZE
  }
};
