import React, { Component } from "react";
import Render from "./AppRender";

export default class App extends Component {
  render() {
    return Render.call(this, this.props, this.state);
  }
}
