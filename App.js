/**
 * This file is used by the native apps.
 */

import React from "react";
import { View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/utilities/storage/store";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import RecentsScreen from "./src/screens/RecentsScreen";
import Routing, { Router, Switch } from "./src/utilities/routing/index";

const Route = Routing.Route;

class App extends React.Component {
  render() {
    const App = (props, context) => (
      <View style={{ height: "100%" }}>{props.children}</View>
    );

    return (
      <Provider store={store}>
        <Router>
          <App>
            <Switch>
              <Route exact path="/" component={LoginScreen} />
              <Route exact path="/auth/register" component={RegisterScreen} />
              <Route exact path="/recents" component={RecentsScreen} />
            </Switch>
          </App>
        </Router>
      </Provider>
    );
  }
}

export default App;
