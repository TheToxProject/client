import { TouchableNativeFeedback, Platform } from "react-native";
import TouchableRipple from "react-native-material-ripple";

const Touchable = Platform.select({
  ios: TouchableRipple,
  android: TouchableNativeFeedback,
  windows: TouchableRipple,
  web: TouchableRipple
});

export default Touchable;
