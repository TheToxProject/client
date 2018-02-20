import React, { Component } from "react";
import { Platform, View, Image } from "react-native";

const ORIGINAL_WIDTH = 149;
const ORIGINAL_HEIGHT = 60;

export class Logo extends Component {
  render() {
    const { size, align } = this.props;

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
          style={styles[size] || styles.normal}
          resizeMode={"contain"}
          fadeDuration={0}
          source={
            Platform.OS === "web"
              ? require("../assets/tox-logo.svg")
              : require("../assets/tox-logo.png")
          }
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
