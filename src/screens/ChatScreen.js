import React from "react";
import { Platform, StyleSheet, View, Text, TextInput } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import CommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

import { withRouter } from "./../utilities/routing/router";

import Colors from "./../styles/colors";
import Button from "./../components/Button";
import { ContactItem } from "./../components/ContactItem";
import Touchable from "./../components/Touchable";

const MAX_INPUT_EXPAND = 120;

export class ChatScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      inputHeight: 35
    };

    this.onBackButtonPress = this.onBackButtonPress.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
  }

  onBackButtonPress() {
    /**
     * @todo Handle the magic here.
     */

    const { history } = this.props;
    history.goBack();
  }

  onContentSizeChange(event) {
    if (Platform.OS === "web") {
      const { nativeEvent: { target } } = event;
      if (target) {
        const height =
          target.scrollHeight <= MAX_INPUT_EXPAND
            ? target.scrollHeight
            : MAX_INPUT_EXPAND;
        target.style.height = 0;
        target.style.height = `${height}px`;
      }
    } else if (Platform.OS === "android" || Platform.OS === "ios") {
      const { nativeEvent: { contentSize } } = event;
      if (contentSize) {
        const height =
          contentSize.height <= MAX_INPUT_EXPAND
            ? contentSize.height
            : MAX_INPUT_EXPAND;
        this.setState({ inputHeight: height });
      }
    }
  }

  render() {
    const { contact } = this.props.location.state || { contact: null };
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {Platform.OS !== "web" && (
            <Touchable
              onPress={() => requestAnimationFrame(this.onBackButtonPress)}
              style={{ backgroundColor: Colors.ACCENT }}
            >
              <Icon
                style={styles.backIcon}
                name={"arrow-back"}
                size={24}
                color={Colors.TEXT}
              />
            </Touchable>
          )}
          {contact && (
            <ContactItem
              unread={contact.unread || false}
              username={contact.username}
              status={Platform.OS === "web" ? contact.status : null}
              avatarUri={contact.avatarUri}
              avatarSize={Platform.OS === "web" ? 46 : 32}
              color={Platform.OS === "web" ? Colors.PRIMARY_TEXT : Colors.TEXT}
              presence={Platform.OS === "web" ? contact.presence : null}
              presenceBackgroundColor={
                Platform.OS === "web" ? Colors.BACKGROUND : Colors.ACCENT
              }
            />
          )}
        </View>
        <View style={styles.chatView}>
          <Text>Chat happens here</Text>
        </View>
        <View style={styles.inputView}>
          <View style={styles.actions}>
            <Icon
              name={"photo-camera"}
              size={24}
              color={Colors.SECONDARY_TEXT}
            />
            <Icon name={"videocam"} size={24} color={Colors.SECONDARY_TEXT} />
            <CommunityIcon
              name={"sticker-emoji"}
              size={24}
              color={Colors.SECONDARY_TEXT}
            />
            <Icon name={"gif"} size={24} color={Colors.SECONDARY_TEXT} />
            <Icon name={"mic"} size={24} color={Colors.SECONDARY_TEXT} />
            {Platform.OS !== "web" ? (
              <Icon
                name={"more-horiz"}
                size={24}
                color={Colors.SECONDARY_TEXT}
              />
            ) : (
              <Icon
                name={"send"}
                size={Platform.OS === "web" ? 36 : 24}
                color={Colors.SECONDARY_TEXT}
              />
            )}
          </View>
          <View style={styles.inputRow}>
            {Platform.OS !== "web" ? (
              <CommunityIcon
                name={"emoticon-happy"}
                size={24}
                color={Colors.SECONDARY_TEXT}
              />
            ) : null}
            <TextInput
              multiline={true}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              style={[
                styles.input,
                Platform.OS !== "web"
                  ? { height: Math.max(35, this.state.inputHeight) }
                  : null
              ]}
              placeholder={"Enter a message..."}
              onContentSizeChange={this.onContentSizeChange}
              onChange={Platform.OS === "web" ? this.onContentSizeChange : null}
            />
            {Platform.OS !== "web" ? (
              <Icon name={"send"} size={24} color={Colors.SECONDARY_TEXT} />
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: Colors.BACKGROUND
  },
  header: {
    height: Platform.OS === "web" ? 64 : 56,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Platform.OS === "web" ? Colors.BACKGROUND : Colors.ACCENT,
    paddingHorizontal: Platform.OS === "web" ? 0 : 16,
    ...Platform.select({
      ios: {
        boxShadow:
          "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)"
      },
      android: {
        elevation: 4
      },
      web: {
        boxShadow:
          "0 2px 6px rgba(0, 0, 0, 0.16), 0 2px 6px rgba(0, 0, 0, 0.23)"
      }
    })
  },
  backIcon: {
    marginLeft: 24,
    justifyContent: "center"
  },
  chatView: {
    flex: 1,
    width: "100%",
    padding: 16
  },
  inputView: {
    width: "100%",
    flexDirection: Platform.OS === "web" ? "row-reverse" : "column-reverse",
    borderTopColor: Colors.DIVIDE,
    borderTopWidth: 1
  },
  inputRow: {
    flex: Platform.OS === "web" ? 1 : 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 16
  },
  input: {
    backgroundColor: Colors.BACKGROUND,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 16,
    ...Platform.select({
      web: {
        width: "30%"
      }
    })
  }
});

export default withRouter(ChatScreen);
