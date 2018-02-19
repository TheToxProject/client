import React from "react";
import { Provider } from "react-redux";
import store from "./src/utilities/storage/store";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import Routing, { Router, Switch } from "./src/utilities/routing/index";

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

export default App;
