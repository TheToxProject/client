import React, { Component } from "react";
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback
} from "react-native";

import Colors from "./../styles/colors";

const Touchable = Platform.select({
  ios: TouchableHighlight,
  android: TouchableNativeFeedback,
  windows: TouchableOpacity,
  web: TouchableOpacity
});

export default class Button extends Component {
  render() {
    const text = this.props.text ? this.props.text : "Button";

    return (
      <Touchable
        onPress={() =>
          // This allow for the ripple effect to be visible on press.
          setTimeout(
            () => this.props.onPress && this.props.onPress(),
            this.props.onPressDelay ? this.props.onPressDelay : 100
          )
        }
        onLongPress={() => this.props.onLongPress && this.props.onLongPress()}
      >
        <View
          style={[
            styles.button,
            this._getButtonStyles(),
            this.props.style ? this.props.style : null
          ]}
        >
          <Text
            style={[
              styles.text,
              this._getTextStyles(),
              this.props.textStyle ? this.props.textStyle : null
            ]}
          >
            {this._transformText(text)}
          </Text>
        </View>
      </Touchable>
    );
  }

  _transformText(text) {
    if (this.props.uppercase) {
      return String(text).toUpperCase();
    }

    return text;
  }

  _getButtonStyles() {
    const raised = this.props.raised ? this.props.raised : false;
    const size = this.props.size
      ? styles.buttonSizes[this.props.size] || styles.buttonSizes.normal
      : styles.buttonSizes.normal;
    const backgroundColor = this.props.backgroundColor
      ? this.props.backgroundColor
      : Colors.BACKGROUND;

    if (raised) {
      return {
        backgroundColor: "rgba(0,0,0,0)"
      };
    }

    return {
      backgroundColor: backgroundColor,
      paddingHorizontal: size.paddingHorizontal || size.padding,
      paddingVertical: size.paddingVertical || size.padding
    };
  }

  _getTextStyles() {
    const raised = this.props.raised ? this.props.raised : false;
    const size = this.props.size
      ? styles.buttonSizes[this.props.size] || styles.buttonSizes.normal
      : styles.buttonSizes.normal;
    const color = this.props.color ? this.props.color : Colors.PRIMARY_TEXT;

    if (raised) {
      return {
        color: "white"
      };
    }

    return {
      color: color,
      fontSize: size.fontSize
    };
  }
}

const styles = {
  buttonSizes: {
    small: {
      fontSize: 10,
      paddingHorizontal: 6,
      paddingVertical: 4
    },
    normal: {
      fontSize: 14,
      paddingHorizontal: 12,
      paddingVertical: 8
    },
    medium: {
      fontSize: 16,
      paddingHorizontal: 16,
      paddingVertical: 10
    }
  },
  button: {
    ...Platform.select({
      ios: {
        boxShadow:
          "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)"
      },
      android: {
        elevation: 2
      },
      web: {
        boxShadow:
          "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)"
      }
    }),
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 3,
    width: "auto",
    flex: 0
  },
  text: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: "bold",
    fontSize: 12
  }
};
