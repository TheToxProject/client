import React, { Component } from "react";

export default class InputRender extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <input
        className="input"
        {...this.props}
        type={this.props.secureTextEntry ? "password" : "text"}
        placeholder={this.props.placeholder && this.props.placeholder}
      />
    );
  }
}
