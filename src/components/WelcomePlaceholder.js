import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Colors from "./../styles/colors";

const BACKGROUND_PATTERN = require("./../assets/playstation-pattern.png");

export class UserButton extends Component {
  render() {
    const { t } = this.props;
    return (
      <View style={styles.emptyContainer}>
        <View style={[StyleSheet.absoluteFill, { zIndex: -10 }]}>
          <Image source={BACKGROUND_PATTERN} style={styles.background} />
        </View>
        <Icon name={"emoticon-happy"} size={120} color={Colors.DIVIDE} />
        <Text style={styles.tagline}>{t("chat:headers.welcome_back")}</Text>
        <Text style={styles.infoText}>
          {t("chat:headers.info_text").toUpperCase()}
        </Text>
      </View>
    );
  }
}

export default UserButton;

const styles = {
  emptyContainer: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.BACKGROUND
  },
  background: {
    ...StyleSheet.absoluteFill,
    flex: 1,
    resizeMode: "repeat"
  },
  tagline: {
    fontSize: 30,
    fontWeight: "lighter",
    color: Colors.PRIMARY_TEXT,
    padding: 12
  },
  infoText: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.SECONDARY_TEXT,
    padding: 4
  }
};
