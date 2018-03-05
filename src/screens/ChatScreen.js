import React from "react";
import {
  Platform,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Keyboard
} from "react-native";

import Colors from "./../styles/colors";
import ContactItem from "./../components/ContactItem";
import IconButton from "./../components/IconButton";
import WelcomePlaceholder from "./../components/WelcomePlaceholder";

const MAX_INPUT_EXPAND = 120;

export class ChatScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      inputHeight: 24
    };

    this.onBackButtonPress = this.onBackButtonPress.bind(this);
    this.onContentSizeChange = this.onContentSizeChange.bind(this);
    this.onKeyboardHideRequest = this.onKeyboardHideRequest.bind(this);
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
      const height =
        this.input._node.scrollHeight <= MAX_INPUT_EXPAND
          ? this.input._node.scrollHeight
          : MAX_INPUT_EXPAND;
      this.setState({ inputHeight: 1 }, () => {
        this.setState({ inputHeight: height });
      });
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

  onKeyboardHideRequest() {
    Keyboard.dismiss();
  }

  render() {
    const { t } = this.props;
    const { contact } = this.props.location.state || { contact: null };

    if (Platform.OS === "web" && contact == null) {
      return <WelcomePlaceholder t={t} />;
    }

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {Platform.OS !== "web" && (
            <IconButton
              title={t("chat:labels.back_button")}
              name={"arrow-back"}
              style={styles.backIcon}
              onPress={() => requestAnimationFrame(this.onBackButtonPress)}
            />
          )}
          {contact && (
            <ContactItem
              style={{ flex: 1, width: "100%" }}
              unread={false}
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
          <IconButton
            style={styles.headerIcon}
            title={t("chat:labels.start_audio_call")}
            name={"call"}
            size={Platform.OS === "web" ? 30 : 24}
            color={Platform.OS === "web" ? Colors.SECONDARY_TEXT : Colors.TEXT}
          />
          <IconButton
            style={styles.headerIcon}
            title={t("chat:labels.start_video_call")}
            name={"videocam"}
            size={Platform.OS === "web" ? 30 : 24}
            color={Platform.OS === "web" ? Colors.SECONDARY_TEXT : Colors.TEXT}
          />
          <IconButton
            style={styles.headerIcon}
            title={t("chat:labels.more_infos")}
            name={"info-outline"}
            size={Platform.OS === "web" ? 30 : 24}
            color={Platform.OS === "web" ? Colors.SECONDARY_TEXT : Colors.TEXT}
          />
        </View>
        <ScrollView
          contentContainerStyle={styles.chatView}
          onMomentumScrollBegin={this.onKeyboardHideRequest}
        >
          <Text>Chat happens here</Text>
        </ScrollView>
        <View style={styles.inputView}>
          <View style={styles.actions}>
            <IconButton
              name={"photo-camera"}
              size={24}
              color={Colors.SECONDARY_TEXT}
            />
            <IconButton
              name={"videocam"}
              size={24}
              color={Colors.SECONDARY_TEXT}
            />
            <IconButton
              name={"sticker-emoji"}
              size={24}
              color={Colors.SECONDARY_TEXT}
              pack={"community"}
            />
            <IconButton name={"gif"} size={24} color={Colors.SECONDARY_TEXT} />
            <IconButton name={"mic"} size={24} color={Colors.SECONDARY_TEXT} />
            {Platform.OS !== "web" ? (
              <IconButton
                name={"more-horiz"}
                size={24}
                color={Colors.SECONDARY_TEXT}
              />
            ) : (
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 36,
                  backgroundColor: "rgba(0,0,0,.1)",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <IconButton
                  name={"send"}
                  size={20}
                  color={Colors.DARK_BACKGROUND}
                />
              </View>
            )}
          </View>
          <View style={styles.inputRow}>
            {Platform.OS !== "web" ? (
              <IconButton
                name={"emoticon-happy"}
                size={24}
                color={Colors.SECONDARY_TEXT}
                pack={"community"}
              />
            ) : null}
            <TextInput
              ref={input => (this.input = input)}
              multiline={true}
              autoFocus={true}
              autoCapitalize={"sentences"}
              autoCorrect={true}
              underlineColorAndroid={"rgba(0,0,0,0)"}
              style={[
                styles.input,
                { height: Math.max(24, this.state.inputHeight) }
              ]}
              placeholder={"Enter a message..."}
              onContentSizeChange={this.onContentSizeChange}
              onChange={Platform.OS === "web" ? this.onContentSizeChange : null}
              onBlur={this.onKeyboardHideRequest}
            />
            {Platform.OS !== "web" ? (
              <IconButton
                name={"send"}
                size={24}
                color={Colors.SECONDARY_TEXT}
              />
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
    justifyContent: "flex-start",
    backgroundColor: Platform.OS === "web" ? Colors.BACKGROUND : Colors.ACCENT,
    paddingHorizontal: Platform.OS === "web" ? 0 : 16,
    paddingRight: Platform.OS === "web" ? 8 : 12,
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
    marginLeft: 0,
    justifyContent: "center"
  },
  headerIcon: {
    paddingHorizontal: 8
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
    minHeight: 44,
    backgroundColor: Colors.BACKGROUND,
    color: Colors.PRIMARY_TEXT,
    paddingVertical: 12,
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
        width: 260
      }
    })
  }
});

export default ChatScreen;
