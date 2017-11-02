import React, { Component } from "react";
import { connect } from "react-redux";

import AuthRender from "./AuthRender";

const mapStateToProps = (state, ownProps) => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};

const AuthScreen = connect(mapStateToProps, mapDispatchToProps)(AuthRender);
export default AuthScreen;
