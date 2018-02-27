import React from "react";
import {
  View,
  UIManager,
  findNodeHandle,
  TouchableNativeFeedback
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const ICON_SIZE = 24;

export class AndroidContextMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      icon: null
    };

    this.onPress = this.onPress.bind(this);
    this.onRef = this.onRef.bind(this);
  }

  onError() {
    console.log("Popup Error");
  }

  onPress = () => {
    console.log("icon ", this.state.icon);
    if (this.state.icon) {
      UIManager.showPopupMenu(
        findNodeHandle(this.state.icon),
        this.props.actions,
        this.onError,
        this.props.onPress
      );
    }
  };

  render() {
    return (
      <View>
        <TouchableNativeFeedback onPress={this.onPress}>
          <Icon
            name="more-vert"
            size={ICON_SIZE}
            color={"white"}
            ref={this.onRef}
          />
        </TouchableNativeFeedback>
      </View>
    );
  }

  onRef(icon) {
    //calback with icon component as reference
    console.log(icon);
    if (!this.state.icon) {
      this.setState({ icon });
    }
  }
}

export default AndroidContextMenu;
