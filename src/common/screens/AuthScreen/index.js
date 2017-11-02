import React, { Component } from "react";
import { connect } from "react-redux";

import AuthRender from "./AuthRender";

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
    onLoginButtonPress: () => {
      alert("onLoginButtonPress clicked/pressed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRender);
