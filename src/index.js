import React, { Component } from "react";
import { render } from "react-dom";

// Redux imports.
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "remote-redux-devtools";
import thunk from "redux-thunk";

import { globalRoutes } from "./common/routes";
import { getRootReducer } from "./common/store/rootReducer";
import InitialScreen from "./common/screens/InitialScreen";

// CSS
require("./styles/normalize.css");
require("./styles/main.css");

export default class App extends Component {
  constructor(props) {
    super(props);

    const middlewares = [thunk];
    const reducer = getRootReducer(null);

    this.store = createStore(
      reducer,
      {},
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
            applyMiddleware(...middlewares)
          )
        : applyMiddleware(...middlewares)
    );
  }

  componentWillMount() {}

  render() {
    return (
      <Provider store={this.store}>
        <InitialScreen />
      </Provider>
    );
  }
}

const content = document.querySelector("#content");
render(<App />, content);
