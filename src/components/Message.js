import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Platform,
  Easing
} from "react-native";

import { Link } from "./../utilities/routing/router";
import { unixToDate } from "../utilities";
import Avatar from "./../components/Avatar";
import Colors from "./../styles/colors";

export class Message extends Component {
  constructor(props) {
    super(props);

    this.animateTime = this.animateTime.bind(this);

    this.state = {
      timeAnimated: new Animated.Value(0)
    };
  }

  animateTime() {
    const { timeAnimated } = this.state;
    timeAnimated.setValue(0);
    Animated.timing(timeAnimated, {
      duration: 4000,
      toValue: 1,
      tension: 4,
      useNativeDriver: true,
      easing: Easing.in(Easing.elastic(1.2))
    }).start();
  }

  render() {
    const { fromSelf, author, message, time, showAvatar } = this.props;
    const { timeAnimated } = this.state;

    const timeObj = unixToDate(time);
    const formatedTimestamp = [timeObj.hours, timeObj.minutes].join(":");

    const bubbleStyle = {
      backgroundColor: fromSelf ? "#ddd" : Colors.ACCENT
    };

    const bubbleTextStyle = {
      color: fromSelf ? "black" : "white"
    };

    const timeInterpolateY = timeAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, 0],
      extrapolate: "clamp"
    });

    const timeStyle = {
      opacity: timeAnimated
      //transform: [{ translateY: timeInterpolateY }]
    };
    return (
      <View style={[styles.container]}>
        {showAvatar ? (
          <Avatar
            source={{ uri: author.avatarUri }}
            size={36}
            username={author.name}
          />
        ) : (
          <View style={{ width: 36, height: 36, marginRight: 16 }} />
        )}
        <View style={styles.messageWrapper}>
          <View style={[styles.messageBubble, bubbleStyle]}>
            <Text style={bubbleTextStyle} onPress={() => this.animateTime()}>
              {message}
            </Text>
          </View>
          <View style={[styles.timestamp, timeStyle]}>
            <Text
              onMouseEnter={this.animateTime}
              onMouseLeave={this.animateTime}
            >
              {formatedTimestamp}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginVertical: 8
  },
  messageWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1
  },
  messageBubble: {
    padding: 12,
    borderRadius: 4
  },
  time: {
    fontSize: 14,
    color: "#414141"
  }
});

export default Message;
