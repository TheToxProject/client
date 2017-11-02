import React, { Component } from "react";

export default class AuthRender extends Component {
  render() {
    return (
      <div className="main">
        <h1>Welcome from AuthScreen</h1>
        <button onClick={() => this.props.onLoginButtonPress()}>
          Go to MainScreen
        </button>
      </div>
    );
  }
}
