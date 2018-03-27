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
      active,
      onPress,
      onLongPress,
      unread
    } = this.props;

    const time = timestamp ? unixToDate(timestamp) : null;
    const timeDisplay = time ? [time.hours, time.minutes].join("h") : null;
    const unreadStyle = unread ? { fontWeight: "bold" } : null;
    const colorStyle = color ? { color: color } : null;
    const activeStyle = active
      ? null /*{ backgroundColor: Colors.ACTIVE_ITEM } */
      : null;

    active && console.log(`Active contact is ${username}`);

    return (
      <View style={[styles.container, activeStyle]}>
        <Touchable
          activeOpacity={0.8}
          onPress={() => onPress && setTimeout(onPress, 300)}
          onLongPress={onLongPress}
        >
          <View style={[styles.row, styles.noSelect]}>
            <Avatar
              presence={presence}
              presenceBackgroundColor={presenceBackgroundColor}
              {...(avatarUri && avatarUri.length >= 1
                ? { source: { uri: avatarUri } }
                : null)}
              title={username}
              letter={username}
              letterColor={Colors.ACCENT}
              noAvatarBackgroundColor={Colors.DIVIDE}
              style={styles.avatar}
              size={avatarSize}
            />
            <View style={styles.column}>
              <View style={styles.textRow}>
                <Text
                  title={username}
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
                  title={status}
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
    flex: 1,
    ...Platform.select({
      web: {
        cursor: "pointer"
      }
    })
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
