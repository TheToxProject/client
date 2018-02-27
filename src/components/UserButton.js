import React, { Component } from "react";
import { View, Image, Text, Platform } from "react-native";

import Colors from "./../styles/colors";
import Touchable from "./../components/Touchable";
import Avatar from "./../components/Avatar";

const DEFAULT_SIZE = 36;

export class UserButton extends Component {
  render() {
    const { avatarUri, username, onPress } = this.props;

    return (
      <View style={styles.container} {...this.props}>
        <Touchable
          style={styles.ripple}
          activeOpacity={0.8}
          onPress={() => setTimeout(onPress, 400)}
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
