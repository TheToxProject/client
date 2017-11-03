import React, { Component } from "react";

export default class ButtonRender extends Component {
  render() {
    return <button onClick={() => this.props.onLoginButtonPress()} />;
  }
}
