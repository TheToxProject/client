import React, { Component } from "react";

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
              <button onClick={() => this.props.onLoginButtonPress()}>
                Sign in
              </button>
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
