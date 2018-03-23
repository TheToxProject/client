import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  Platform,
  Easing,
  Image
} from "react-native";

//import { Link } from "./../utilities/routing/router";
import { unixToDate, containsEmojisOnly } from "./../utilities";
import Avatar from "./../components/Avatar";
import Touchable from "./../components/Touchable";
import Colors from "./../styles/colors";

export class Message extends Component {
  constructor(props) {
    super(props);

    this.animateTime = this.animateTime.bind(this);

    this.state = {
      timeAnimated: new Animated.Value(0),
      timeShown: false
    };
  }

  animateTime() {
    requestAnimationFrame(() => {
      const { timeShown } = this.state;
      Animated.timing(this.state.timeAnimated, {
        duration: 200,
        toValue: timeShown ? 0 : 1,
        tension: 4,
        useNativeDriver: false,
        easing: Easing.in(Easing.elastic(1.2))
      }).start(({ finished }) => {
        if (finished) {
          this.setState({ timeShown: !this.state.timeShown });
          if (this.state.timeShown) {
            setTimeout(() => {
              this.animateTime();
            }, 3000);
          }
        }
      });
    });
  }

  renderMessage(message, bubbleStyle, bubbleTextStyle) {
    switch (message.type) {
      case "image":
        return (
          <Touchable
            onPress={() => Platform.OS !== "web" && this.animateTime}
            style={{
              maxWidth: Platform.OS !== "web" ? "100%" : "90%",
              borderRadius: 12,
              overflow: "hidden"
            }}
          >
            <View style={[styles.imageBubble, bubbleStyle]}>
              <Image
                source={message.source}
                resizeMode={"cover"}
                style={{
                  maxWidth: "100%",
                  width: 250,
                  height: 250
                }}
              />
            </View>
          </Touchable>
        );
      default:
        if (containsEmojisOnly(message.text)) {
          return (
            <Touchable
              onPress={() => Platform.OS !== "web" && this.animateTime}
              style={{
                maxWidth: Platform.OS !== "web" ? "100%" : "90%",
                borderRadius: 0,
                overflow: "hidden"
              }}
            >
              <View style={styles.emojiBubble}>
                <Text style={styles.emojiTextStyle} selectable={true}>
                  {message.text}
                </Text>
              </View>
            </Touchable>
          );
        } else {
          return (
            <Touchable
              onPress={() => Platform.OS !== "web" && this.animateTime}
              style={{
                maxWidth: Platform.OS !== "web" ? "100%" : "90%",
                borderRadius: 12,
                overflow: "hidden"
              }}
            >
              <View style={[styles.messageBubble, bubbleStyle]}>
                <Text style={bubbleTextStyle} selectable={true}>
                  {message.text}
                </Text>
              </View>
            </Touchable>
          );
        }
    }
  }

  render() {
    const { fromSelf, author, message, time, showAvatar } = this.props;

    const timeObj = unixToDate(time);
    const formatedTimestamp = [timeObj.hours, timeObj.minutes].join(":");

    const bubbleStyle = {
      backgroundColor: fromSelf ? "#ddd" : Colors.ACCENT
    };

    const bubbleTextStyle = {
      color: fromSelf ? "black" : "white"
    };

    const timeInterpolateHeight = this.state.timeAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 20],
      extrapolate: "clamp"
    });

    const timeInterpolateY = this.state.timeAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [-20, 0],
      extrapolate: "clamp"
    });

    const timeStyle = {
      opacity: this.state.timeAnimated,
      height: timeInterpolateHeight,
      transform: [{ translateY: timeInterpolateY }]
    };
    return (
      <View
        style={[styles.container]}
        onMouseEnter={this.animateTime}
        onMouseLeave={this.animateTime}
      >
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
          {this.renderMessage(message, bubbleStyle, bubbleTextStyle)}
          <Animated.View style={[styles.timestamp, timeStyle]}>
            <Text style={styles.time}>{formatedTimestamp}</Text>
          </Animated.View>
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
    marginVertical: 4,
    width: "100%"
  },
  messageWrapper: {
    display: "flex",
    flexDirection: Platform.OS === "web" ? "row" : "column",
    alignItems: Platform.OS === "web" ? "flex-start" : "flex-start",
    justifyContent: Platform.OS === "web" ? "space-between" : "flex-start",
    flex: 1,
    maxWidth: "98%"
  },
  messageBubble: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    width: "auto",
    overflow: "hidden"
  },
  imageBubble: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 12,
    width: "auto",
    overflow: "hidden",
    maxWidth: "100%"
  },
  emojiBubble: {
    borderRadius: 0,
    overflow: "hidden"
  },
  emojiTextStyle: {
    fontSize: Platform.OS === "web" ? 44 : 30,
    color: "white",
    opacity: 1
  },
  time: {
    fontSize: 14,
    color: "#414141",
    ...Platform.select({
      web: {
        userSelect: "none"
      }
    })
  }
});

export default Message;
