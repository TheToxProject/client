import React, { Component } from "react";
import { View, Text, Platform } from "react-native";

import { unixToDate } from "./../utilities";
import Colors from "./../styles/colors";
import Avatar from "./../components/Avatar";
import Touchable from "./../components/Touchable";

export class ContactItem extends Component {
  render() {
    const {
      username,
      status,
      timestamp,
      presence,
      presenceBackgroundColor,
      avatarUri,
      avatarSize,
      color,
      onPress,
      onLongPress,
      unread
    } = this.props;

    const time = timestamp ? unixToDate(timestamp) : null;
    const timeDisplay = time ? [time.hours, time.minutes].join("h") : null;
    const unreadStyle = unread ? { fontWeight: "bold" } : null;
    const colorStyle = color ? { color: color } : null;

    return (
      <View style={styles.container}>
        <Touchable
          activeOpacity={0.8}
          onPress={() => setTimeout(onPress, 200)}
          onLongPress={onLongPress}
        >
          <View style={[styles.row, styles.noSelect]}>
            <Avatar
              username={username}
              presence={presence}
              presenceBackgroundColor={presenceBackgroundColor}
              source={{ uri: avatarUri }}
              style={styles.avatar}
              size={avatarSize}
            />
            <View style={styles.column}>
              <View style={styles.textRow}>
                <Text
                  numberOfLines={1}
                  style={[styles.username, unreadStyle, colorStyle]}
                >
                  {username}
                </Text>
                {time && (
                  <Text style={[styles.timestamp, unreadStyle, colorStyle]}>
                    {timeDisplay}
                  </Text>
                )}
              </View>
              {status && (
                <Text
                  numberOfLines={1}
                  style={[styles.status, unreadStyle, colorStyle]}
                >
                  {status}
                </Text>
              )}
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
    color: Colors.PRIMARY_TEXT,
    fontWeight: "bold",
    marginBottom: Platform.OS === "web" ? 4 : 2,
    flex: 1
  },
  status: {
    color: Colors.PRIMARY_TEXT
  },
  timestamp: {
    color: Colors.SECONDARY_TEXT,
    fontSize: 12
  }
};
