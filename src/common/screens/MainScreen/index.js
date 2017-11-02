import React, { Component } from "react";
import { connect } from "react-redux";

import MainRender from "./MainRender";

const mapStateToProps = (state, ownProps) => {
  return {};
};
const mapDispatchToProps = dispatch => {
  return {};
};

const MainScreen = connect(mapStateToProps, mapDispatchToProps)(MainRender);
export default MainScreen;
