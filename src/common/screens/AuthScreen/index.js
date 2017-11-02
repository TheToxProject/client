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
      alert("Login button clicked.");
    },
    onRegisterButtonPress: () => {
      alert("Register button clicked.");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRender);
