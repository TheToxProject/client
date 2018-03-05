/**
 * This file is used in web/desktop apps.
 */

import React from "react";
import { Provider as StoreProvider } from "react-redux";
import ReactNative, { View } from "react-native";
import MaterialIconsFont from "react-native-vector-icons/Fonts/MaterialIcons.ttf";
import MaterialCommunityIconsFont from "react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf";
import { I18nextProvider, translate } from "react-i18next";
import i18n from "./i18n/i18n";

import store from "./utilities/storage/store";
import Routing, { Router, Switch } from "./utilities/routing";
import { BackButton } from "./utilities/routing/router";

import LoginScreen from "./containers/LoginScreenContainer";
import RegisterScreen from "./containers/RegisterScreenContainer";
import RecentsScreen from "./containers/RecentsScreenContainer";

const Route = Routing.Route;

// Generate required css
const iconFontStyles = `@font-face {
  src: url(${MaterialIconsFont});
  font-family: Material Icons;
}
@font-face {
  src: url(${MaterialCommunityIconsFont});
  font-family: Material Design Icons; 
}`;

// Create stylesheet
const style = document.createElement("style");
style.id = "react-native-vector-icons";
style.type = "text/css";
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);
class App extends React.Component {
  render() {
    const App = translate(["commons"], { wait: true })((props, context) => {
      const { t } = props;
      document.title = t("commons:defaultAppTitle");

      return <View style={{ height: "100%" }}>{props.children}</View>;
    });

    return (
      <StoreProvider store={store}>
        <I18nextProvider i18n={i18n}>
          <Router>
            <BackButton>
              <App>
                <Switch>
                  <Route exact path="/" component={LoginScreen} />
                  <Route
                    exact
                    path="/auth/register"
                    component={RegisterScreen}
                  />
                  <Route exact path="/chat" component={RecentsScreen} />
                  <Route exact path="/chat/:pubkey" component={RecentsScreen} />
                </Switch>
              </App>
            </BackButton>
          </Router>
        </I18nextProvider>
      </StoreProvider>
    );
  }
}

ReactNative.render(<App />, document.getElementById("root"));
