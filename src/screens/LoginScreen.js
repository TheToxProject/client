import React from "react";
import { StyleSheet, View, StatusBar, Animated, Platform } from "react-native";

import Colors from "./../styles/colors";
import SimpleLogo from "./../components/Logo";
import SimpleLoginForm from "./../components/LoginForm";

const Logo = Animated.createAnimatedComponent(SimpleLogo);
const LoginForm = Animated.createAnimatedComponent(SimpleLoginForm);

const ANIMATION_LOAD_DURATION = 1200;
const ANIMATION_SHOW_DURATION = 400;
const DEFAULT_LOGO_HEIGHT = Platform.OS === "web" ? 120 : 120;
const SMALL_LOGO_HEIGHT = Platform.OS === "web" ? DEFAULT_LOGO_HEIGHT / 2 : 60;

export class LoginScreen extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      loadValue: new Animated.Value(0),
      showValue: new Animated.Value(0),
      selfHeight: 0,
      selfWidth: 0,
      showForm: true,
      formWidth: 0,
      formHeight: 0,
      formX: 0,
      formY: 0
    };

    this.onLayout = this.onLayout.bind(this);
    this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
    this.onLoginFormLayout = this.onLoginFormLayout.bind(this);
  }

  componentDidMount() {
    const { loginAnimationRan } = this.props;

    if (loginAnimationRan) {
      this.startAnimation(0, 0, 0);
    } else {
      this.startAnimation(
        ANIMATION_LOAD_DURATION,
        ANIMATION_SHOW_DURATION,
        500
      );
    }
  }

  startAnimation(loadDuration, showDuration, delay) {
    const { loadValue, showValue } = this.state;
    const { loginAnimationDone, loginAnimationRan } = this.props;

    Animated.sequence([
      Animated.timing(loadValue, { duration: 0, toValue: 0 }),
      Animated.timing(showValue, { duration: 0, toValue: 0 }),
      Animated.timing(loadValue, {
        delay: loginAnimationRan ? 0 : 600,
        duration: loadDuration,
        toValue: 1,
        useNativeDriver: false
      }),
      Animated.timing(showValue, {
        delay: 0,
        duration: showDuration,
        toValue: 1,
        useNativeDriver: false
      })
    ]).start(() => {
      loginAnimationDone();
    });
  }

  onLayout({ nativeEvent: { layout } }) {
    this.setState({
      selfHeight: layout.height,
      selfWidth: layout.width
    });
  }

  onLoginFormLayout({ nativeEvent: { layout } }) {
    this.setState({
      formHeight: layout.height,
      formWidth: layout.width,
      formX: layout.x,
      formY: layout.y,
      showForm: false
    });
    console.log(this.props);
  }

  onLoginButtonPress() {
    /**
     * @todo Handle the magic here.
     */

    const { history } = this.props;
    history.replace("/chat");
  }

  render() {
    const logoSize = this.state.loadValue.interpolate({
      inputRange: [0, 1],
      outputRange: [DEFAULT_LOGO_HEIGHT, SMALL_LOGO_HEIGHT]
    });

    const logoOpacity = this.state.loadValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1]
    });

    const logoY = this.state.loadValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        this.state.selfHeight / 2 - DEFAULT_LOGO_HEIGHT / 2,
        this.state.formY - (Platform.OS === "web" ? 58 : 58)
      ]
    });

    const formOpacity = this.state.showValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const { t } = this.props;

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.DARK_BACKGROUND}
          barStyle={"light-content"}
        />
        <Logo
          height={logoSize}
          variant={"white"}
          align={"center"}
          style={[
            styles.logo,
            { opacity: logoOpacity, position: "absolute", top: logoY }
          ]}
        />
        <LoginForm
          t={t}
          style={{ opacity: formOpacity, paddingTop: 32 }}
          onLayout={this.onLoginFormLayout}
          onLoginButtonPress={this.onLoginButtonPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.DARK_BACKGROUND
  },
  logo: {
    marginBottom: 32,
    alignSelf: "center"
  }
});

export default LoginScreen;
