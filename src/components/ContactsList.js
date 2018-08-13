import React from "react";
import { Platform, View, ScrollView, Dimensions } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { TabsView, Logo } from "@toxclient/shathui";

import Colors from "./../styles/colors";
import UserButton from "./../components/UserButton";
import IconButton from "./../components/IconButton";
import ContactItem from "./../components/ContactItem";

export class ContactsList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onPopupEvent = this.onPopupEvent.bind(this);

    this.state = {
      width: Platform.OS === "web" ? 320 : Dimensions.get("window").width
    };
  }

  onPopupEvent = (eventName, index) => {
    if (eventName !== "itemSelected") return;
    alert("Press item " + index);
  };

  render() {
    const {
      onUserButtonPress,
      onContactSelectionChange,
      onContactLongPress,
      onLogoutButtonPress,
      selectedContactPubkey,
      contacts
    } = this.props;

    return (
      <View style={styles.contactsList}>
        <View style={styles.header}>
          <View style={styles.appBar}>
            <Logo
              size={"small"}
              style={[{ paddingLeft: 16, width: "auto" }, styles.noSelect]}
            />
            <UserButton
              username={"SkyzohKey"}
              avatarUri={"https://avatars2.githubusercontent.com/u/8523159"}
              onPress={onUserButtonPress}
            />
            <View style={styles.icons}>
              <IconButton
                title={"Search"}
                name="search"
                style={styles.icon}
                onPress={() => alert("Trigger searchbar opening")}
              />
              <IconButton
                title={Platform.OS === "web" ? "Settings" : "More"}
                name={Platform.OS === "web" ? "more-vert" : "more-vert"}
                style={styles.icon}
                onPress={onLogoutButtonPress}
              />
            </View>
          </View>
        </View>
        <TabsView
          width={this.state.width}
          defaultTabIndex={1}
          swipeTolerance={6}
          tabsColor={Colors.ACCENT}
          textColor={Colors.TEXT}
        >
          <View
            icon={<Icon name="access-time" size={24} title={"Recent"} />}
            text={"Recent"}
          >
            <ScrollView contentContainerStyle={styles.scrolledView}>
              {contacts.map(contact => (
                <ContactItem
                  key={contact.username + Math.random()}
                  unread={contact.unread}
                  username={contact.username}
                  status={contact.status}
                  timestamp={contact.lastMessageTimestamp}
                  avatarUri={contact.avatarUri}
                  presence={contact.presence}
                  presenceBackgroundColor={Colors.BACKGROUND}
                  active={selectedContactPubkey === contact.pubkey}
                  onPress={() => onContactSelectionChange(contact)}
                  onLongPress={() => onContactLongPress(contact)}
                />
              ))}
            </ScrollView>
          </View>
          <View
            icon={<Icon name="group" size={24} title={"Contacts"} />}
            text={"Contacts"}
          >
            <ScrollView contentContainerStyle={styles.scrolledView}>
              {contacts
                .reverse()
                .map(contact => (
                  <ContactItem
                    key={contact.username}
                    unread={contact.unread}
                    username={contact.username}
                    status={contact.status}
                    timestamp={contact.lastMessageTimestamp}
                    avatarUri={contact.avatarUri}
                    presence={contact.presence}
                    presenceBackgroundColor={Colors.BACKGROUND}
                    active={selectedContactPubkey === contact.pubkey}
                    onPress={() => onContactSelectionChange(contact)}
                    onLongPress={() => onContactLongPress(contact)}
                  />
                ))}
            </ScrollView>
          </View>
          <View
            icon={<Icon name="call-missed" size={24} title={"Missed calls"} />}
            text={"Calls"}
          >
            <ScrollView contentContainerStyle={styles.scrolledView}>
              <ContactItem
                key={contacts[1].username}
                unread={contacts[1].unread}
                username={contacts[1].username}
                status={contacts[1].status}
                timestamp={contacts[1].lastMessageTimestamp}
                avatarUri={contacts[1].avatarUri}
                presence={contacts[1].presence}
                presenceBackgroundColor={Colors.BACKGROUND}
                active={selectedContactPubkey === contacts[1].pubkey}
                onPress={() => onContactSelectionChange(contacts[1])}
                onLongPress={() => onContactLongPress(contacts[1])}
              />
            </ScrollView>
          </View>
        </TabsView>
      </View>
    );
  }
}

export default ContactsList;

const styles = {
  contactsList: {
    width: Platform.OS === "web" ? 320 : "100%",
    height: "100%",
    backgroundColor: Colors.BACKGROUND,
    zIndex: 900,
    ...Platform.select({
      default: {
        borderRightWidth: 1,
        borderRightColor: Colors.DIVIDE
      },
      ios: {
        boxShadow:
          "0 9px 18px rgba(0, 0, 0, 0.16), 0 9px 18px rgba(0, 0, 0, 0.23)"
      },
      android: {
        elevation: 6
      }
    })
  },
  scrolledView: {
    paddingVertical: 8
  },
  header: {
    height: Platform.OS === "web" ? 64 : 56,
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    zIndex: 400,
    backgroundColor: Colors.ACCENT
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 8
  },
  icon: {
    margin: 8
  },
  appBar: {
    height: Platform.OS === "web" ? 64 : 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  }
};
