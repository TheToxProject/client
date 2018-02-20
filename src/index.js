import React from "react";
import { Provider } from "react-redux";
import ReactNative, { View } from "react-native";
import store from "./utilities/storage/store";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import Routing, { Router, Switch } from "./utilities/routing/index";

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
            </Switch>
          </App>
        </Router>
      </Provider>
    );
  }
}

ReactNative.render(<App />, document.getElementById("root"));
