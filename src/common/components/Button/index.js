import React, { Component } from "react";
import ButtonRender from "./ButtonRender";

export default class Button extends Component {
  render() {
    return <ButtonRender {...this.props} />;
  }
}
