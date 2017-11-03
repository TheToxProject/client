import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback
} from "react-native";

const Touchable = Platform.select({
  ios: TouchableHighlight,
  android: TouchableNativeFeedback,
  windows: TouchableOpacity
});

export default class ButtonRender extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const text = this.props.text ? this.props.text : "Button";

    return (
      <Touchable
        onPress={() =>
          // This allow for the ripple effect to be visible on press.
          setTimeout(
            () => this.props.onPress && this.props.onPress(),
            this.props.onPressDelay ? this.props.onPressDelay : 100
          )}
        onLongPress={() => this.props.onLongPress && this.props.onLongPress()}
      >
        <View
          style={[
            styles.button,
            ...this._getButtonStyles(),
            this.props.style ? this.props.style : null
          ]}
        >
          <Text
            style={[
              styles.text,
              ...this._getTextStyles(),
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
    return {};
  }

  _getTextStyles() {
    return {};
  }
}

const styles = {
  button: {
    ...Platform.select({
      ios: {
        boxShadow:
          "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)"
      },
      android: {
        elevation: 2
      }
    }),
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 3
  },
  text: {
    color: "rgba(0, 0, 0, 0.87)",
    fontWeight: "bold",
    fontSize: 12
  }
};
