import React from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";

import Routing from "./../utilities/routing";
import Presence from "./../utilities/enums/Presence";
import Colors from "./../styles/colors";

import ContactsList from "./../components/ContactsList";
import ChatScreen from "./../containers/ChatScreenContainer";
import WelcomePlaceholder from "./../components/WelcomePlaceholder";

const Route = Routing.Route;

const fakeUsers = [
  {
    pubkey: "3GE0HU76J6KHHNMBKPYD3S7LOJ5PFLFPIIEHFXDKV0KFQCPRZP2HDTGNLS9ZAF26",
    username: "Ogromny | FNC",
    status: "Vive les vaches normandes! 🤠 🐮",
    presence: Presence.ONLINE,
    avatarUri: "https://avatars.githubusercontent.com/Ogromny?size=46",
    lastMessageTimestamp: 1519659888,
    unread: true
  },
  {
    pubkey: "14DDWYA1XW454N564PQ1LV5JJD44NWFJWCPUEDFG9FV6MB0FKTFCFVEDADKO5HXS",
    username: "Sean Perkins",
    status:
      "I think this idea could work, I just need to put more energy into it.",
    presence: Presence.BUSY,
    avatarUri: "https://personagenerator.com/user-sean.png",
    lastMessageTimestamp: 1519647578,
    unread: false
  },
  {
    pubkey: "IWJK4K5VZZ70E9X1DA724PFX3THR6N7GTHN4UKXZAVLKPNRJTEARS649QQ6M8JC3",
    username: "Joan Perez",
    status: "My students come first in everything I do. 🙂",
    presence: Presence.AWAY,
    avatarUri: "https://personagenerator.com/user-7.png",
    lastMessageTimestamp: 1519647032,
    unread: false
  },
  {
    pubkey: "NOYGLAIMCQL5IJKQIGPEOBJI7APNJC1BIZFR6VK2JSFZRV01NNMYZSVULTKXUNIW",
    username: "Ricky Metzger",
    status: "I love this idea, and I can't wait to test it with our customers!",
    presence: Presence.OFFLINE,
    avatarUri: "https://personagenerator.com/user-ricky.png",
    lastMessageTimestamp: 1519642102,
    unread: false
  }
];

export class RecentsScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onUserButtonPress = this.onUserButtonPress.bind(this);
    this.onContactSelectionChange = this.onContactSelectionChange.bind(this);
    this.onContactLongPress = this.onContactLongPress.bind(this);
    this.onLogoutButtonPress = this.onLogoutButtonPress.bind(this);
  }

  onUserButtonPress() {
    /**
     * @todo Navigate to the user profile screen.
     */
    alert("Navigate to the user profile.");
  }

  onContactSelectionChange(contact) {
    /**
     * @todo Navigate to the contact chat screen.
     */
    //alert("Navigate to " + contact.username + " chat screen.");
    const { history } = this.props;
    history.push("/chat/" + contact.pubkey, { contact: contact });
    this.setState({ updated: true }); // Force update.
  }

  onContactLongPress(contact) {
    alert("Long pressed " + contact.username);
  }

  onLogoutButtonPress() {
    const { history } = this.props;
    history.replace("/");
  }

  renderSection() {
    if (Platform.OS !== "web") {
      return null;
    }

    const { match: { isExact, path }, t } = this.props;
    if (isExact && path === "/chat") {
      return <WelcomePlaceholder t={t} style={{ zIndex: 9000 }} />;
    } else {
      return (
        <View style={styles.section}>
          <Route>
            <Route exact path="/chat/:pubkey" component={ChatScreen} />
          </Route>
        </View>
      );
    }
  }

  render() {
    const { t, match: { isExact, path, params } } = this.props;
    const selectedContactPubkey =
      isExact && path !== "/chat" ? params.pubkey : null;

    return (
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.DARKER_ACCENT}
          barStyle={"light-content"}
          translucent={false}
        />
        <ContactsList
          t={t}
          contacts={fakeUsers}
          onContactSelectionChange={this.onContactSelectionChange}
          onContactLongPress={this.onContactLongPress}
          onUserButtonPress={this.onUserButtonPress}
          onLogoutButtonPress={this.onLogoutButtonPress}
          selectedContactPubkey={selectedContactPubkey}
        />
        {this.renderSection()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  noSelect: {
    ...Platform.select({
      web: {
        userSelect: "none"
      }
    })
  },
  container: {
    display: "flex",
    flex: 1,
    height: "100%",
    maxWidth: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  section: {
    height: "100%",
    flex: 1,
    backgroundColor: Colors.BACKGROUND,
    zIndex: 4000
  }
});

export default RecentsScreen;
