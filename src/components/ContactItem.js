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
import Avatar from "./../components/Avatar";

const Touchable = Platform.select({
  ios: TouchableHighlight,
  android: TouchableNativeFeedback,
  windows: TouchableOpacity,
  web: TouchableOpacity
});

export class ContactItem extends Component {
  render() {
    const {
      username,
      status,
      timestamp,
      presence,
      presenceBackgroundColor,
      avatarUri,
      onPress
    } = this.props;

    return (
      <View style={styles.container}>
        <Touchable activeOpacity={0.8} onPress={onPress}>
          <View style={[styles.row, styles.noSelect]}>
            <Avatar
              presence={presence}
              presenceBackgroundColor={presenceBackgroundColor}
              fadeDuration={0}
              source={{ uri: avatarUri }}
              style={styles.avatar}
            />
            <View style={styles.column}>
              <View style={styles.textRow}>
                <Text numberOfLines={1} style={styles.username}>
                  {username}
                </Text>
                {timestamp && <Text style={styles.timestamp}>{timestamp}</Text>}
              </View>
              <Text numberOfLines={1} style={styles.status}>
                {status}
              </Text>
            </View>
          </View>
        </Touchable>
      </View>
    );
  }
}

export default ContactItem;

const styles = {
  noSelect: {
    ...Platform.select({
      web: {
        userSelect: "none"
      }
    })
  },
  container: {
    ...Platform.select({
      web: {
        cursor: "pointer"
      }
    }),
    width: "100%",
    maxWidth: "100%"
  },
  avatar: {
    width: 46,
    height: 46,
    resizeMode: "contain",
    borderRadius: 100,
    overflow: "hidden",
    marginRight: 16
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    paddingVertical: 12
  },
  textRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  column: {
    flexDirection: "column",
    flex: 1
  },
  username: {
    color: Platform.OS === "web" ? Colors.TEXT : Colors.PRIMARY_TEXT,
    fontWeight: "bold",
    marginBottom: Platform.OS === "web" ? 4 : 2,
    flex: 1
  },
  status: {
    color: Platform.OS === "web" ? Colors.TEXT : Colors.PRIMARY_TEXT
  },
  timestamp: {
    color: Platform.OS === "web" ? Colors.TEXT : Colors.SECONDARY_TEXT,
    fontSize: 12
  }
};
