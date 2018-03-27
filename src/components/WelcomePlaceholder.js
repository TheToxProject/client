import React, { Component } from "react";
import { View, Text, Image } from "react-native";

import { noSelect } from "./../utilities";
import Colors from "./../styles/colors";
const TOX_ILLUSTRATION = require("./../assets/tox-illustration.png");

export class WelcomePlaceholder extends Component {
  render() {
    const { t } = this.props;
    return (
      <View style={styles.emptyContainer}>
        <Image source={TOX_ILLUSTRATION} style={styles.illustration} />
        <Text style={styles.tagline}>{t("chat:headers.welcome_back")}</Text>
        <Text style={styles.infoText}>
          {t("chat:headers.info_text").toUpperCase()}
        </Text>
      </View>
    );
  }
}

export default WelcomePlaceholder;

const styles = {
  emptyContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND,
    zIndex: 9000
  },
  illustration: {
    height: 200,
    width: "60%",
    resizeMode: "contain",
    ...noSelect
  },
  tagline: {
    fontSize: 30,
    fontWeight: "lighter",
    color: Colors.PRIMARY_TEXT,
    padding: 12,
    ...noSelect
  },
  infoText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.SECONDARY_TEXT,
    padding: 4,
    width: "60%",
    textAlign: "center",
    lineHeight: 24,
    ...noSelect
  }
};
