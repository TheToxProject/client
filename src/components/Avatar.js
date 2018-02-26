import React, { Component } from "react";
import { View, Image } from "react-native";

import Colors from "../styles/colors";

export class Avatar extends Component {
  render() {
    const { presence, presenceBackgroundColor, source, size } = this.props;
    const sizeStyle = size
      ? { width: size, height: size, borderRadius: size * 2 }
      : null;
    const presenceStyle = presenceBackgroundColor
      ? {
          borderColor: presenceBackgroundColor,
          backgroundColor: Colors.ACCENT
        }
      : null;

    return (
      <View style={styles.container}>
        <Image
          fadeDuration={0}
          source={source.uri ? { uri: source.uri } : source}
          style={[styles.avatar, sizeStyle]}
        />
        <View style={[styles.presence, presenceStyle]} />
        {/*<Presence
          presence={presence}
          presenceBackgroundColor={presenceBackgroundColor}
        />*/}
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
    borderRadius: 100,
    overflow: "hidden",
    marginRight: 16
  },
  presence: {
    width: 18,
    height: 18,
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
    right: 8,
    borderWidth: 3
  }
};
