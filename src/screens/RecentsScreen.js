import React from "react";
import { Platform, StyleSheet, View, StatusBar } from "react-native";

import Routing from "./../utilities/routing";
import { getContactsMock } from "./../utilities/MockData/ContactsMock";
import Colors from "./../styles/colors";

import ContactsList from "./../components/ContactsList";
import ChatScreen from "./../containers/ChatScreenContainer";
import WelcomePlaceholder from "./../components/WelcomePlaceholder";

const Route = Routing.Route;

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
    const { history } = this.props;
    history.push("/chat/" + contact.pubkey, { contact: contact });
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
    const { t } = this.props;
    const recentContacts = getContactsMock();

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
          contacts={recentContacts}
          onContactSelectionChange={this.onContactSelectionChange}
          onContactLongPress={this.onContactLongPress}
          onUserButtonPress={this.onUserButtonPress}
          onLogoutButtonPress={this.onLogoutButtonPress}
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
