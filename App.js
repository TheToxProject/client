/**
 * This file is used by the native apps.
 */

import React from "react";
import { View, StatusBar } from "react-native";
import { Provider } from "react-redux";

import Routing, { Router, Switch } from "./src/utilities/routing/index";
import { BackButton } from "./src/utilities/routing/router";
import store from "./src/utilities/storage/store";
import Colors from "./src/styles/colors";

import LoginScreen from "./src/containers/LoginScreenContainer";
import RegisterScreen from "./src/screens/RegisterScreen";
import RecentsScreen from "./src/screens/RecentsScreen";
import { ChatScreen } from "./src/screens/ChatScreen";

const Route = Routing.Route;

class App extends React.Component {
  render() {
    const App = (props, context) => (
      <View style={{ height: "100%" }}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.ACCENT}
          barStyle={"light-content"}
        />
        {props.children}
      </View>
    );

    return (
      <Provider store={store}>
        <Router>
          <App>
            <BackButton />
            <Switch>
              <Route exact path="/" component={LoginScreen} />
              <Route exact path="/auth/register" component={RegisterScreen} />
              <Route exact path="/chat" component={RecentsScreen} />
              <Route exact path="/chat/:pubkey" component={ChatScreen} />
            </Switch>
          </App>
        </Router>
      </Provider>
    );
  }
}

export default App;
