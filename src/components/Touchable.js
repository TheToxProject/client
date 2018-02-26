import {
  TouchableOpacity,
  TouchableHighlight,
  TouchableNativeFeedback,
  Platform
} from "react-native";

import TouchableRipple from "react-native-material-ripple";

const Touchable = Platform.select({
  ios: TouchableHighlight,
  android: TouchableNativeFeedback,
  windows: TouchableOpacity,
  web: TouchableRipple
});

export default Touchable;
