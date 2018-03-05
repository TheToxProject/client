import React from "react";
import { Platform, View, Text, ScrollView } from "react-native";

import Colors from "./../styles/colors";
import Button from "./../components/Button";
import Logo from "./../components/Logo";
import UserButton from "./../components/UserButton";
import IconButton from "./../components/IconButton";
import ContactItem from "./../components/ContactItem";

export class ContactsList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onPopupEvent = this.onPopupEvent.bind(this);
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
                onPress={() => alert("More...")}
              />
            </View>
          </View>
          <View style={styles.tabs}>
            <View style={[styles.tab, styles.selectedTab]}>
              <Text style={styles.tabText}>
                <IconButton name="access-time" size={24} title={"Recent"} />
              </Text>
            </View>
            <View style={styles.tab}>
              <Text style={styles.tabText}>
                <IconButton name="group" size={24} title={"Contacts"} />
              </Text>
            </View>
            <View style={styles.tab}>
              <Text style={styles.tabText}>
                <IconButton
                  name="call-missed"
                  size={24}
                  title={"Missed calls"}
                />
              </Text>
            </View>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrolledView}>
          {contacts.map(contact => (
            <ContactItem
              key={contact.username}
              unread={contact.unread}
              username={contact.username}
              status={contact.status}
              timestamp={contact.lastMessageTimestamp}
              avatarUri={contact.avatarUri}
              presence={contact.presence}
              presenceBackgroundColor={Colors.BACKGROUND}
              onPress={() => onContactSelectionChange(contact)}
              onLongPress={() => onContactLongPress(contact)}
            />
          ))}
        </ScrollView>
        <Button
          uppercase={true}
          onPress={onLogoutButtonPress}
          onPressDelay={200}
          text="Back to login"
          backgroundColor={Colors.ACCENT}
          color={Colors.TEXT}
          size={"medium"}
          style={{ borderRadius: 0 }}
        />
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
    height: 48 + (Platform.OS === "web" ? 64 : 56),
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: Colors.ACCENT,
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
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    padding: 10
  },
  appBar: {
    height: Platform.OS === "web" ? 64 : 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  tabs: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  tab: {
    flex: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      web: {
        userSelect: "none",
        cursor: "pointer"
      }
    })
  },
  tabText: {
    color: Colors.TEXT,
    textAlign: "center",
    fontSize: 14
  },
  selectedTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.TEXT
  }
};
