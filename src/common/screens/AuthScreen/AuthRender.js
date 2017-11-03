import React, { Component } from "react";

import Button from "../../components/Button";

export default class AuthRender extends Component {
  render() {
    return (
      <div className="auth-screen">
        <div className="box-container">
          <h1 className="logo">Tox</h1>
          <div className="login-form">
            <input type="text" name="username" placeholder="Username..." />
            <input type="password" name="password" placeholder="Password..." />
            <div className="actions">
              <Button
                uppercase
                onPress={() => this.props.onLoginButtonPress()}
                onPressDelay={200}
                text="Sign in"
              />
              <a href="#" onClick={() => this.props.onRegisterButtonPress()}>
                Create an account
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
