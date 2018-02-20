import React from "react";
import {
  Platform,
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";
import { withRouter } from "./../utilities/routing/router";

import Colors from "./../styles/colors";
import Button from "./../components/Button";
import Logo from "./../components/Logo";

const Touchable = Platform.select({
  ios: TouchableHighlight,
  android: TouchableNativeFeedback,
  windows: TouchableOpacity,
  web: TouchableOpacity
});

class RecentsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.contactsList}>
          <View style={styles.header}>
            <View style={styles.appBar}>
              <Logo
                size={"small"}
                style={[{ paddingLeft: 16, width: "auto" }, styles.noSelect]}
              />
              <Touchable onPress={() => alert("Open profile page.")}>
                <View style={styles.userHeader}>
                  <Text style={[styles.userName, styles.noSelect]}>
                    SkyzohKey
                  </Text>
                  <Image
                    source={{
                      uri: "https://avatars2.githubusercontent.com/u/8523159"
                    }}
                    style={[styles.userAvatar, styles.noSelect]}
                  />
                </View>
              </Touchable>
            </View>
            <View style={styles.tabs}>
              <View style={[styles.tab, styles.selectedTab]}>
                <Text style={styles.tabText}>
                  <Icon name="access-time" size={24} />
                </Text>
              </View>
              <View style={styles.tab}>
                <Text style={styles.tabText}>
                  <Icon name="group" size={24} />
                </Text>
              </View>
              <View style={styles.tab}>
                <Text style={styles.tabText}>
                  <Icon name="call-missed" size={24} />
                </Text>
              </View>
            </View>
          </View>
          <ScrollView contentContainerStyle={styles.scrolledView}>
            <Text style={styles.contactsPlaceholder}>
              Here lives your contacts.
            </Text>
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
    alignItems: "flex-end",
    backgroundColor: "#414141"
  },
  contactsList: {
    width: Platform.OS === "web" ? 300 : "100%",
    height: "100%",
    backgroundColor: Colors.DARK_BACKGROUND,
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
    padding: 16
  },
  header: {
    height: 48 + (Platform.OS === "web" ? 64 : 56),
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    backgroundColor: Colors.DARK_PRIMARY,
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
  userHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    height: "100%",
    ...Platform.select({
      web: {
        cursor: "pointer"
      }
    })
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.TEXT,
    marginRight: 12
  },
  userAvatar: {
    width: 36,
    height: 36,
    resizeMode: "contain",
    borderRadius: 36,
    overflow: "hidden",
    elevation: 2
  },
  contactsPlaceholder: {
    color: Colors.TEXT,
    fontSize: 18
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
