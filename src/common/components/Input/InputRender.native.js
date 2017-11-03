import React, { Component } from "react";
import { StyleSheet, TextInput, Platform, Animated } from "react-native";

import Style from "../../style.js";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

export default class InputRender extends Component {
  setNativeProps = nativeProps => {
    this._input.setNativeProps(nativeProps);
  };

  constructor(props) {
    super(props);

    this.state = {
      active: false,
      color: new Animated.Value(0)
    };
  }

  render() {
    const inputStyles = this.state.active ? styles.input_active : styles.input;

    const backgroundColor = this.state.color.interpolate({
      inputRange: [0, 1],
      outputRange: ["rgba(51,51,51,1.0)", "rgba(34,34,34,1.0)"]
    });

    const elevation = this.state.color.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 2]
    });

    return (
      <AnimatedTextInput
        ref={"input"}
        {...this.props}
        style={[inputStyles, this.props.style, { backgroundColor, elevation }]}
        placeholderTextColor={Style.DARK_TEXT_LIGHT_COLOR}
        placeholder={this.props.placeholder && this.props.placeholder}
        underlineColorAndroid="rgba(255, 255, 255, 0)"
        onFocus={() => this._onFocus()}
        onBlur={() => this._onBlur()}
      />
    );
  }

  _onFocus() {
    Animated.timing(this.state.color, {
      delay: 0,
      duration: 280,
      toValue: 1
    }).start();
    this.setState({ active: true });
  }

  _onBlur() {
    Animated.timing(this.state.color, {
      delay: 0,
      duration: 280,
      toValue: 0
    }).start();
    this.setState({ active: false });
  }
}

const styles = {
  input: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    backgroundColor: Style.PRIMARY_DARK_COLOR,
    color: "white",
    borderRadius: 3
  },
  input_active: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginVertical: 8,
    backgroundColor: Style.PRIMARY_DARK_HOVER_COLOR,
    color: "white",
    borderRadius: 3,
    ...Platform.select({
      ios: {
        boxShadow:
          "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)"
      },
      android: {
        elevation: 2
      }
    })
  }
};
