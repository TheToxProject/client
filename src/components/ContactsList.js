import React from "react";
import { Platform, View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

import Colors from "./../styles/colors";
import Button from "./../components/Button";
import Logo from "./../components/Logo";
import UserButton from "./../components/UserButton";
import ContactItem from "./../components/ContactItem";

export class ContactsList extends React.Component {
  render() {
    const {
      onUserButtonPress,
      onContactSelectionChange,
      onContactLongPress,
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
              <Icon
                name="search"
                size={24}
                color={Colors.ICONS}
                style={styles.icon}
                title={"Search"}
              />
              <Icon
                name="more-vert"
                size={24}
                color={Colors.ICONS}
                style={styles.icon}
                title={"More"}
              />
            </View>
          </View>
          <View style={styles.tabs}>
            <View style={[styles.tab, styles.selectedTab]}>
              <Text style={styles.tabText}>
                <Icon name="access-time" size={24} title={"Recent"} />
              </Text>
            </View>
            <View style={styles.tab}>
              <Text style={styles.tabText}>
                <Icon name="group" size={24} title={"Contacts"} />
              </Text>
            </View>
            <View style={styles.tab}>
              <Text style={styles.tabText}>
                <Icon name="call-missed" size={24} title={"Missed calls"} />
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
          onPress={() => this.props.history.replace("/")}
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
    ...Platform.select({
      web: {
        userSelect: "none",
        cursor: "pointer"
      }
    }),
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
