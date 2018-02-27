import React from "react";
import { Platform, StyleSheet, View } from "react-native";

import Routing from "./../utilities/routing";
import { withRouter } from "./../utilities/routing/router";
import Presence from "./../utilities/enums/Presence";
import Colors from "./../styles/colors";

import ContactsList from "./../components/ContactsList";
import { ChatScreen } from "./ChatScreen";

const Route = Routing.Route;

const fakeUsers = [
  {
    username: "Ogromny | FNC",
    status: "Vive les vaches normandes! 🤠 🐮",
    presence: Presence.ONLINE,
    avatarUri: "https://avatars.githubusercontent.com/Ogromny?size=46",
    lastMessageTimestamp: 1519659888,
    unread: true
  },
  {
    username: "Sean Perkins",
    status:
      "I think this idea could work, I just need to put more energy into it.",
    presence: Presence.BUSY,
    avatarUri: "https://personagenerator.com/user-sean.png",
    lastMessageTimestamp: 1519647578,
    unread: false
  },
  {
    username: "Joan Perez",
    status: "My students come first in everything I do. 🙂",
    presence: Presence.AWAY,
    avatarUri: "https://personagenerator.com/user-7.png",
    lastMessageTimestamp: 1519647032,
    unread: false
  },
  {
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
    history.push("/chat/" + contact.username, { contact: contact });
  }

  onContactLongPress(contact) {
    alert("Long pressed " + contact.username);
  }

  render() {
    //const ContactState = { MUTED: 0, BLOCKED: 1, DELETED: 2, NEW: 3 };

    return (
      <View style={styles.container}>
        <ContactsList
          contacts={fakeUsers}
          onContactSelectionChange={this.onContactSelectionChange}
          onContactLongPress={this.onContactLongPress}
          onUserButtonPress={this.onUserButtonPress}
        />
        {Platform.OS === "web" /* Mobile nav is defined in /index.js */ && (
          <View style={styles.section}>
            <Route>
              <Route exact path="/chat/:pubkey" component={ChatScreen} />
            </Route>
          </View>
        )}
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 400
  },
  itworks: {
    fontSize: 48,
    fontWeight: "bold",
    color: Colors.PRIMARY_TEXT,
    margin: 16
  }
});

export default withRouter(RecentsScreen);
