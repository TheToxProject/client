import React from "react";
import { Provider } from "react-redux";
import ReactNative from "react-native";
import store from "./utilities/storage/store";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Routing, { Router, Switch } from "./utilities/routing/index";

const Route = Routing.Route;

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path="/" component={LoginScreen} />
        </Router>
      </Provider>
    );
  }
}

ReactNative.render(<App />, document.getElementById("root"));
