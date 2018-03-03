/**
 * This file is used in web/desktop apps.
 */

import React from "react";
import { Provider } from "react-redux";
import ReactNative, { View } from "react-native";
import MaterialIconsFont from "react-native-vector-icons/Fonts/MaterialIcons.ttf";
import MaterialCommunityIconsFont from "react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf";

import store from "./utilities/storage/store";
import Routing, { Router, Switch } from "./utilities/routing";
import { BackButton } from "./utilities/routing/router";

import LoginScreen from "./containers/LoginScreenContainer";
import RegisterScreen from "./screens/RegisterScreen";
import RecentsScreen from "./screens/RecentsScreen";

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
    const App = (props, context) => (
      <View style={{ height: "100%" }}>{props.children}</View>
    );

    return (
      <Provider store={store}>
        <Router>
          <BackButton>
            <App>
              <Switch>
                <Route exact path="/" component={LoginScreen} />
                <Route exact path="/auth/register" component={RegisterScreen} />
                <Route exact path="/chat" component={RecentsScreen} />
                <Route exact path="/chat/:pubkey" component={RecentsScreen} />
              </Switch>
            </App>
          </BackButton>
        </Router>
      </Provider>
    );
  }
}

ReactNative.render(<App />, document.getElementById("root"));
