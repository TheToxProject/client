import React, { Component } from "react";
import {
  View,
  Image,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback
} from "react-native";

const Touchable = Platform.select({
  ios: TouchableHighlight,
  android: TouchableNativeFeedback,
  windows: TouchableOpacity,
  web: TouchableOpacity
});

export class UserButton extends Component {
  render() {
    const { avatarUri, onPress } = this.props;

    return (
      <View style={styles.container} {...this.props}>
        <Touchable activeOpacity={0.8} onPress={onPress}>
          <Image
            fadeDuration={0}
            source={{
              uri: avatarUri
            }}
            style={[styles.avatar, styles.noSelect]}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    height: "100%",
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
    borderRadius: 36,
    overflow: "hidden"
  }
};
