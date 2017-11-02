import React, { Component } from "react";
import { connect } from "react-redux";

import AuthScreen from "../AuthScreen";
import MainScreen from "../MainScreen";

const mapStateToProps = (state, ownProps) => ({
  isAuthentified: state.user.isAuthentified
});

const mapDispatchToProps = dispatch => {
  return {};
};

class InitialRoute extends Component {
  static navigationOptions = {
    header: null,
    headerMode: "none"
  };

  render() {
    return this.props.isAuthentified == false ? <AuthScreen /> : <MainScreen />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InitialRoute);
