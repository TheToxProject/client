import React from "react";
import { StyleSheet, View, StatusBar, Animated, Easing } from "react-native";
import { Logo as SimpleLogo } from "@toxclient/shathui";

import Colors from "./../styles/colors";
import SimpleLoginForm from "./../components/LoginForm";

const Logo = Animated.createAnimatedComponent(SimpleLogo);
const LoginForm = Animated.createAnimatedComponent(SimpleLoginForm);

const ANIMATION_LOAD_DURATION = 800;
const ANIMATION_SHOW_DURATION = 600;
const DEFAULT_LOGO_HEIGHT = 120;

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
    this.onLoginFormLayout = this.onLoginFormLayout.bind(this);
    this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
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

    this.state.loadValue.setValue(0);
    this.state.showValue.setValue(0);

    Animated.stagger(loadDuration + 100, [
      Animated.timing(loadValue, {
        delay: loginAnimationRan ? 0 : 600,
        duration: loadDuration,
        toValue: 1,
        friction: 1.3,
        useNativeDriver: true,
        easing: Easing.in(Easing.elastic(0.4))
      }),
      Animated.timing(showValue, {
        delay: 0,
        duration: showDuration,
        toValue: 1,
        tension: 4,
        useNativeDriver: true,
        easing: Easing.in(Easing.elastic(1.2))
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

    /**
     * @todo Implement logo moves when keyboard is shown.
     */
  }

  onLoginFormLayout({ nativeEvent: { layout } }) {
    this.setState({
      formHeight: layout.height,
      formWidth: layout.width,
      formX: layout.x,
      formY: layout.y,
      showForm: false
    });
  }

  onLoginButtonPress() {
    /**
     * @todo Handle the magic here.
     */

    const { history } = this.props;
    history.replace("/chat");
  }

  render() {
    const logoScale = this.state.loadValue.interpolate({
      inputRange: [0, 1],
      outputRange: [4, 2]
    });

    const logoOpacity = this.state.loadValue.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1]
    });

    const logoY = this.state.loadValue.interpolate({
      inputRange: [0, 1],
      outputRange: [
        this.state.selfHeight / 2 - DEFAULT_LOGO_HEIGHT * 1.5,
        -(this.state.formY / 2 - DEFAULT_LOGO_HEIGHT)
      ]
    });

    const formOpacity = this.state.showValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const formTranslate = this.state.showValue.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 0]
    });

    const { t } = this.props;

    return (
      <View style={styles.container} onLayout={this.onLayout}>
        <StatusBar
          animated={true}
          backgroundColor={Colors.DARKER_BACKGROUND}
          barStyle={"light-content"}
          translucent={false}
        />
        <Logo
          //height={logoSize}
          size={"bigger"}
          variant={"white"}
          align={"center"}
          style={[
            styles.logo,
            {
              opacity: logoOpacity,
              transform: [
                { translateY: logoY },
                { scaleX: logoScale },
                { scaleY: logoScale }
              ]
            }
          ]}
        />
        <LoginForm
          t={t}
          style={{
            opacity: formOpacity,
            transform: [{ translateY: formTranslate }],
            marginTop: 32
          }}
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
    alignSelf: "center"
  }
});

export default LoginScreen;
