import React, { Component } from "react";
import { AppRegistry, NativeModules, BackHandler } from "react-native";
import {
  NavigationActions,
  StackNavigator,
  addNavigationHelpers
} from "react-navigation";

// Redux imports.
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import { composeWithDevTools } from "remote-redux-devtools";
import thunk from "redux-thunk";

import { globalRoutes } from "./common/routes";
import { getRootReducer } from "./common/store/rootReducer";

const { UIManager } = NativeModules;
const Navigator = StackNavigator(globalRoutes);
const navigationReducer = (state, action) => {
  const newState = Navigator.router.getStateForAction(action, state);
  return newState || state;
};

export class Navigation extends Component {
  constructor(props) {
    super(props);

    this.backHandler = null;
  }

  componentWillMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this._onBackPress
    );
  }

  componentWillUnmount() {
    this.backHandler && this.backHandler.remove();
  }

  render() {
    return (
      <Navigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }

  _onBackPress = () => {
    const { dispatch, nav } = this.props;
    if (nav.index === 0) {
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };
}
const NavigationProvider = connect(state => ({ nav: state.nav }))(Navigation);

export default class App extends Component {
  constructor(props) {
    super(props);

    const middlewares = [thunk];
    const reducer = getRootReducer(navigationReducer);

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

  componentWillMount() {
    // Enable animations support on Android.
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <NavigationProvider />
      </Provider>
    );
  }
}
