import React, { Component } from "react";
import { Platform, View, Image } from "react-native";

const ORIGINAL_WIDTH = 149;
const ORIGINAL_HEIGHT = 60;
const SCALE_RATIO = ORIGINAL_WIDTH / ORIGINAL_HEIGHT;

const VARIANTS = {
  ...Platform.select({
    web: {
      muted: require("../assets/logo-muted.svg"),
      white: require("../assets/logo-white.svg"),
      black: require("../assets/logo-black.svg")
    },
    default: {
      muted: require("../assets/logo-muted.png"),
      white: require("../assets/logo-white.png"),
      black: require("../assets/logo-black.png")
    }
  })
};

export class Logo extends Component {
  render() {
    const { size, align, variant, height } = this.props;

    /**
     * TODO: Handle variant (color: white, black, muted, colors).
     */
    return (
      <View
        style={{
          width: "100%",
          alignItems:
            align === "center"
              ? "center"
              : align === "right" ? "flex-end" : "flex-start"
        }}
        {...this.props}
      >
        <Image
          {...this.props}
          style={
            height
              ? { height: height, width: height * SCALE_RATIO }
              : styles[size] || styles.normal
          }
          resizeMode={"contain"}
          {...Platform.select({
            android: { fadeDuration: 0 },
            ios: { fadeDuration: 0 }
          })}
          draggable={false}
          source={VARIANTS[variant] || VARIANTS.white}
        />
      </View>
    );
  }
}

const styles = {
  small: {
    width: ORIGINAL_WIDTH / 2,
    height: ORIGINAL_HEIGHT / 2
  },
  medium: {
    width: ORIGINAL_WIDTH / 1.5,
    height: ORIGINAL_HEIGHT / 1.5
  },
  normal: {
    width: ORIGINAL_WIDTH,
    height: ORIGINAL_HEIGHT
  },
  big: {
    width: ORIGINAL_WIDTH * 1.5,
    height: ORIGINAL_HEIGHT * 1.5
  },
  bigger: {
    width: ORIGINAL_WIDTH * 2,
    height: ORIGINAL_HEIGHT * 2
  }
};

export default Logo;
