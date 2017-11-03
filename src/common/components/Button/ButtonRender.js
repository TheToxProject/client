import React, { Component } from "react";

export default class ButtonRender extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const text = this.props.text ? this.props.text : "Button";

    return (
      <button
        className="button"
        onClick={() =>
          // This allow for the ripple effect to be visible on press.
          setTimeout(
            () => this.props.onPress && this.props.onPress(),
            this.props.onPressDelay ? this.props.onPressDelay : 100
          )}
      >
        <span className="button-text">{this._transformText(text)}</span>
      </button>
    );
  }

  _transformText(text) {
    if (this.props.uppercase) {
      return String(text).toUpperCase();
    }

    return text;
  }
}
