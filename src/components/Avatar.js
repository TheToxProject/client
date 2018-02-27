import React, { Component } from "react";
import { View, Image, Text } from "react-native";

import Presence from "./../utilities/enums/Presence";
import Colors from "./../styles/colors";

const DEFAULT_SIZE = 46;
const DEFAULT_LETTER_SIZE = 18;
const SCALE_FACTOR = 0.6;

export class Avatar extends Component {
  constructor(props, context) {
    super(props, context);

    this.getPresenceImage = this.getPresenceImage.bind(this);
  }

  getPresenceImage(presence) {
    switch (presence) {
      case Presence.ONLINE:
        return require("./../assets/presence/presence-online.png");
      case Presence.AWAY:
        return require("./../assets/presence/presence-away.png");
      case Presence.BUSY:
        return require("./../assets/presence/presence-busy.png");
      default:
        return require("./../assets/presence/presence-offline.png");
    }
  }

  render() {
    const {
      presence,
      presenceBackgroundColor,
      username,
      source,
      size
    } = this.props;
    const sizeStyle = size
      ? { width: size, height: size, borderRadius: size * 2 }
      : null;
    const presenceStyle = presenceBackgroundColor
      ? {
          borderColor: presenceBackgroundColor,
          backgroundColor: presenceBackgroundColor
        }
      : null;

    const ratio = styles.letter.fontSize / (size || DEFAULT_SIZE);
    const letterSizeStyle = {
      fontSize: DEFAULT_LETTER_SIZE / ratio * SCALE_FACTOR
    };

    return (
      <View style={styles.container}>
        {source ? (
          <View style={styles.avatarWrapper}>
            <Image
              fadeDuration={0}
              source={source.uri ? { uri: source.uri } : source}
              style={[styles.avatar, sizeStyle]}
            />
          </View>
        ) : (
          <View style={[styles.noAvatar, sizeStyle]}>
            <Text style={[styles.letter, letterSizeStyle]}>{username[0]}</Text>
          </View>
        )}
        {presence != null && (
          <View style={[styles.presenceWrapper, presenceStyle]}>
            <Image
              fadeDuration={0}
              source={this.getPresenceImage(presence)}
              style={styles.presence}
            />
          </View>
        )}
      </View>
    );
  }
}

export default Avatar;

const styles = {
  container: {
    position: "relative"
  },
  avatarWrapper: {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
    borderRadius: DEFAULT_SIZE,
    overflow: "hidden",
    marginRight: 16
  },
  avatar: {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
    resizeMode: "contain",
    borderRadius: DEFAULT_SIZE * 2,
    overflow: "hidden"
  },
  presenceWrapper: {
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 4,
    overflow: "hidden",
    borderRadius: 18
  },
  presence: {
    width: 14,
    height: 14,
    borderRadius: 14,
    resizeMode: "contain"
  },
  noAvatar: {
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
    resizeMode: "contain",
    borderRadius: DEFAULT_SIZE * 2,
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
