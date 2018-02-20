import React, { Component } from "react";
import { Platform, View, Text } from "react-native";

export class FormHeader extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { text } = this.props;

    /**
     * TODO: Handle variant (color: white, black, muted, colors).
     */
    return <Text style={styles.header}>{text}</Text>;
  }
}

const styles = {
  header: {
    color: "rgba(255,255,255,.87)",
    fontSize: 22,
    marginBottom: 8,
    paddingBottom: 12,
    textAlign: "center",
    ...Platform.select({
      web: {
        borderBottom: "3px solid rgba(255, 255, 255, .2)"
      },
      default: {
        borderBottomColor: "rgba(255, 255, 255, .3)",
        borderBottomWidth: 2
      }
    })
  }
};

export default FormHeader;
