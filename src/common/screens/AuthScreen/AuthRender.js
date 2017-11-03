import React, { Component } from "react";

import Button from "../../components/Button";
import Input from "../../components/Input";

export default class AuthRender extends Component {
  render() {
    return (
      <div className="auth-screen">
        <div className="box-container">
          <h1 className="logo">Tox</h1>
          <div className="login-form">
            <Input placeholder="Username..." />
            <Input placeholder="Password..." secureTextEntry={true} />
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
