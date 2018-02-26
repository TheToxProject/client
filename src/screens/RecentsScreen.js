import React from "react";
import { Platform, StyleSheet, View, Text, ScrollView } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { withRouter } from "./../utilities/routing/router";

import Colors from "./../styles/colors";
import Button from "./../components/Button";
import Logo from "./../components/Logo";
import UserButton from "./../components/UserButton";
import ContactItem from "./../components/ContactItem";

class RecentsScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.onUserButtonPress = this.onUserButtonPress.bind(this);
    this.onContactItemPress = this.onContactItemPress.bind(this);
  }

  onUserButtonPress() {
    /**
     * @todo Navigate to the user profile screen.
     */
    alert("Navigate to the user profile.");
  }

  onContactItemPress(contact) {
    /**
     * @todo Navigate to the contact chat screen.
     */
    alert("Navigate to " + contact.username + " chat screen.");
  }

  render() {
    const Presence = { OFFLINE: -1, ONLINE: 0, AWAY: 1, BUSY: 2 };
    //const ContactState = { MUTED: 0, BLOCKED: 1, DELETED: 2, NEW: 3 };

    return (
      <View style={styles.container}>
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
                onPress={this.onUserButtonPress}
                hit
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
            <ContactItem
              username={"Ogromny | FNC"}
              status={"Vive les vaches normandes! 😈"}
              timestamp={1519647578}
              avatarUri={
                "https://avatars.githubusercontent.com/Ogromny?size=46"
              }
              presence={Presence.ONLINE}
              presenceBackgroundColor={
                Platform.OS === "web"
                  ? Colors.DARK_BACKGROUND
                  : Colors.BACKGROUND
              }
              onPress={() =>
                this.onContactItemPress.call(this, {
                  username: "Ogromny | FNC"
                })
              }
            />
            <ContactItem
              username={"Sean Perkins"}
              status={
                "I think this idea could work, I just need to put more energy into it."
              }
              timestamp={1519647578}
              avatarUri={"https://personagenerator.com/user-sean.png"}
              presence={Presence.BUSY}
              presenceBackgroundColor={
                Platform.OS === "web"
                  ? Colors.DARK_BACKGROUND
                  : Colors.BACKGROUND
              }
              onPress={() =>
                this.onContactItemPress.call(this, {
                  username: "Sean Perkins"
                })
              }
            />
            <ContactItem
              username={"Joan Perez"}
              status={"My students come first in everything I do. 🙂"}
              timestamp={1519647551}
              avatarUri={"https://personagenerator.com/user-7.png"}
              presence={Presence.AWAY}
              presenceBackgroundColor={
                Platform.OS === "web"
                  ? Colors.DARK_BACKGROUND
                  : Colors.BACKGROUND
              }
              onPress={() =>
                this.onContactItemPress.call(this, {
                  username: "Joan Perez"
                })
              }
            />
          </ScrollView>
          <Button
            uppercase={true}
            onPress={() => this.props.history.replace("/")}
            onPressDelay={200}
            text="Back to login"
            backgroundColor={Colors.ACCENT}
            color={Colors.TEXT}
            size={"medium"}
          />
        </View>
        {Platform.OS === "web" && (
          <View style={styles.section}>
            <Text style={styles.itworks}>It works!</Text>
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
  contactsList: {
    width: Platform.OS === "web" ? 320 : "100%",
    height: "100%",
    backgroundColor:
      Platform.OS === "web" ? Colors.DARK_BACKGROUND : Colors.BACKGROUND,
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
