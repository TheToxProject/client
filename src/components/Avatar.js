import React, { Component } from "react";
import { View, Image } from "react-native";

import Presence from "./../utilities/enums/Presence";

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
    const { presence, presenceBackgroundColor, source, size } = this.props;
    const sizeStyle = size
      ? { width: size, height: size, borderRadius: size * 2 }
      : null;
    const presenceStyle = presenceBackgroundColor
      ? {
          borderColor: presenceBackgroundColor,
          backgroundColor: presenceBackgroundColor
        }
      : null;

    return (
      <View style={styles.container}>
        <Image
          fadeDuration={0}
          source={source.uri ? { uri: source.uri } : source}
          style={[styles.avatar, sizeStyle]}
        />
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
  avatar: {
    width: 46,
    height: 46,
    resizeMode: "contain",
    borderRadius: 46 * 2,

    overflow: "hidden",
    marginRight: 16
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
  }
};
