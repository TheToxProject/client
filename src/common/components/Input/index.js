import React, { Component } from "react";
import InputRender from "./InputRender";

export default class Input extends Component {
  render() {
    return <InputRender {...this.props} />;
  }
}
