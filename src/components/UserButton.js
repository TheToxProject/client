import React, { Component } from "react";
import { View, Image, Text, Platform } from "react-native";

import Touchable from "./../components/Touchable";
import Colors from "../styles/colors";

export class UserButton extends Component {
  render() {
    const { avatarUri, username, onPress } = this.props;

    return (
      <View style={styles.container} {...this.props}>
        <Touchable activeOpacity={0.8} onPress={() => setTimeout(onPress, 400)}>
          {avatarUri ? (
            <Image
              fadeDuration={0}
              source={{
                uri: avatarUri
              }}
              style={[styles.avatar, styles.noSelect]}
            />
          ) : username ? (
            <View style={styles.noAvatar}>
              <Text style={styles.letter}>{username[0]}</Text>
            </View>
          ) : null}
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
    width: 36,
    height: 36,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    ...Platform.select({
      web: {
        cursor: "pointer"
      },
      default: {
        elevation: 2
      }
    })
  },
  avatar: {
    width: 36,
    height: 36,
    resizeMode: "contain",
    borderRadius: 36 * 2,
    overflow: "hidden"
  },
  noAvatar: {
    width: 36,
    height: 36,
    resizeMode: "contain",
    borderRadius: 36 * 2,
    overflow: "hidden",
    backgroundColor: Colors.LIGHT_PRIMARY,
    justifyContent: "center",
    alignItems: "center"
  },
  letter: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.ACCENT
  }
};
