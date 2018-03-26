import React, { Component } from "react";
import {
  Animated,
  View,
  Text,
  Platform,
  Dimensions,
  PanResponder
} from "react-native";
import PropTypes from "prop-types";

import Touchable from "./../components/Touchable";
import Colors from "./../styles/colors";
import { noSelect } from "./../utilities";

const DEAD_ZONE = 12;

class TabsView extends Component {
  constructor(props) {
    super(props);

    this.selectTab = this.selectTab.bind(this);
    this._canMoveScreen = this._canMoveScreen.bind(this);
    this._startGesture = this._startGesture.bind(this);
    this._respondToGesture = this._respondToGesture.bind(this);
    this._terminateGesture = this._terminateGesture.bind(this);

    this.state = {
      tabsCount: 0,
      selectedIndex: 0,
      previousIndex: 0,
      pendingIndex: null,
      animated: new Animated.Value(0),
      offsetX: new Animated.Value(0)
    };
  }

  componentWillMount() {
    const { defaultTabIndex, children } = this.props;
    const { width } =
      Platform.OS === "web" ? { width: 320 } : Dimensions.get("window");
    const tabsCount = React.Children.toArray(children).length;

    this.setState({
      selectedIndex: defaultTabIndex,
      tabsCount,
      offsetX: new Animated.Value(tabsCount * width)
    });

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this._canMoveScreen,
      onMoveShouldSetPanResponderCapture: this._canMoveScreen,
      onPanResponderGrant: this._startGesture,
      onPanResponderMove: this._respondToGesture,
      onPanResponderTerminate: this._terminateGesture,
      onPanResponderRelease: this._terminateGesture,
      onPanResponderTerminationRequest: () => true
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { previousIndex, selectedIndex } = this.state;
    if (previousIndex == null || selectedIndex !== nextProps.selectedIndex) {
      return false;
    }

    return true;
  }

  _isMovingHorizontally(evt, gestureState) {
    return (
      Math.abs(gestureState.dx) > Math.abs(gestureState.dy * 2) &&
      Math.abs(gestureState.vx) > Math.abs(gestureState.vy * 2)
    );
  }

  _canMoveScreen(evt, gestureState) {
    const { tabsCount, selectedIndex } = this.state;

    return (
      this._isMovingHorizontally(evt, gestureState) &&
      ((gestureState.dx >= DEAD_ZONE && selectedIndex > 0) ||
        (gestureState.dx <= -DEAD_ZONE && selectedIndex < tabsCount - 1))
    );
  }

  _startGesture(evt, gestureState) {
    if (typeof this.props.onSwipeStart === "function") {
      this.props.onSwipeStart(evt, gestureState);
    }

    this.state.animated.stopAnimation();
  }

  _respondToGesture(evt, gestureState) {
    const { tabsCount, selectedIndex } = this.state;

    if (
      // swiping left
      (gestureState.dx > 0 && selectedIndex <= 0) ||
      // swiping right
      (gestureState.dx < 0 && selectedIndex >= tabsCount - 1)
    ) {
      return;
    }

    this.state.animated.setValue(gestureState.dx);
  }

  _terminateGesture(evt, gestureState) {
    const { tabsCount, selectedIndex, pendingIndex } = this.state;
    const { width } =
      Platform.OS === "web" ? { width: 320 } : Dimensions.get("window");

    let swipeDistanceThreshold = width / 1.75;
    let swipeVelocityThreshold = 0.15;

    if (typeof this.props.onSwipeEnd === "function") {
      this.props.onSwipeEnd(evt, gestureState);
    }

    /**
     * On Android, velocity is way lower due to timestamp being in nanosecond
     * we MUST normalize it to have the same velocity on both iOS and Android
     */
    if (Platform.OS === "android") {
      swipeVelocityThreshold /= 1000000;
    }

    const currentIndex = pendingIndex ? pendingIndex : selectedIndex;
    let nextIndex = currentIndex;

    if (
      Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
      Math.abs(gestureState.vx) > Math.abs(gestureState.vy) &&
      (Math.abs(gestureState.dx) > swipeDistanceThreshold ||
        Math.abs(gestureState.vx) > swipeVelocityThreshold)
    ) {
      nextIndex = Math.round(
        Math.min(
          Math.max(
            0,
            currentIndex - gestureState.dx / Math.abs(gestureState.dx)
          ),
          tabsCount - 1
        )
      );
      this.setState({ selectedIndex: nextIndex });
    }

    if (!isFinite(nextIndex)) {
      nextIndex = currentIndex;
    }

    this._transitionTo(nextIndex);
  }

  _transitionTo(index) {
    const { width } =
      Platform.OS === "web" ? { width: 320 } : Dimensions.get("window");
    const offset = -index * width;

    const animationConfig = {
      useNativeDriver: true,
      tension: 300,
      friction: 35
    };

    Animated.parallel([
      Animated.spring(this.state.animated, {
        toValue: 0,
        ...animationConfig
      }),
      Animated.spring(this.state.offsetX, {
        toValue: offset,
        ...animationConfig
      })
    ]).start(({ finished }) => {
      if (finished) {
        this.setState({ pendingIndex: null });
      }
    });

    this.setState({ pendingIndex: index });
  }

  selectTab(index) {
    this.setState({ previousIndex: this.state.selectedIndex });
    this.setState({ selectedIndex: index });

    Animated.spring(this.state.animated, {
      toValue: this.state.selectedIndex,
      useNativeDriver: true,
      tension: 4,
      friction: 200
    }).start();
  }

  render() {
    const { width } =
      Platform.OS === "web" ? { width: 320 } : Dimensions.get("window");
    const {
      children,
      backgroundColor,
      tabsColor,
      iconsColor,
      underlineColor,
      underlineHeight
    } = this.props;
    const { tabsCount, animated, offsetX } = this.state;
    const childrens = React.Children.toArray(children);
    const maxTranslate = width * (tabsCount - 1);

    const tabLineTranslateX = Animated.add(animated, offsetX).interpolate({
      inputRange: [-maxTranslate, 0],
      outputRange: [maxTranslate / tabsCount, 0],
      extrapolate: "clamp"
    });

    const translateX = Animated.add(animated, offsetX).interpolate({
      inputRange: [-maxTranslate, 0],
      outputRange: [-maxTranslate, 0],
      extrapolate: "clamp"
    });

    return (
      <View style={{ ...styles.container, backgroundColor: backgroundColor }}>
        <View style={styles.tabBar}>
          <View style={styles.tabs}>
            {childrens.map((view, index, tabs) => {
              return (
                <Touchable
                  key={view}
                  style={{ flex: 1 }}
                  onPress={() => this._transitionTo(index)}
                >
                  <View
                    style={[
                      styles.tab,
                      {
                        width: width / tabsCount,
                        backgroundColor: tabsColor
                      }
                    ]}
                  >
                    <Text style={{ color: iconsColor }}>{view.props.icon}</Text>
                  </View>
                </Touchable>
              );
            })}
          </View>

          <Animated.View
            style={{
              backgroundColor: underlineColor,
              transform: [
                { translateX: tabLineTranslateX },
                { translateY: -underlineHeight }
              ],
              height: underlineHeight,
              width: width / tabsCount - 1
            }}
          />
        </View>
        <Animated.View
          {...this._panResponder.panHandlers}
          style={{
            flex: 1,
            flexDirection: "row",
            transform: [{ translateX }],
            width: tabsCount * width,
            maxWidth: tabsCount * width,
            minWidth: tabsCount * width,
            ...Platform.select({ web: { overflowX: "hidden" } })
          }}
        >
          {childrens.map((view, index, tabs) => {
            return (
              <View
                key={view.props}
                style={{ width: width, maxWidth: width, ...noSelect }}
              >
                {view.props.children}
              </View>
            );
          })}
        </Animated.View>
      </View>
    );
  }
}

TabsView.propTypes = {
  children: PropTypes.array.isRequired,
  defaultTabIndex: PropTypes.number,
  backgroundColor: PropTypes.string,
  tabsColor: PropTypes.string,
  iconsColor: PropTypes.string,
  underlineColor: PropTypes.string,
  underlineHeight: PropTypes.number
};

TabsView.defaultProps = {
  defaultTabIndex: 0,
  underlineColor: Colors.BACKGROUND,
  iconsColor: Colors.BACKGROUND,
  tabsColor: Colors.ACCENT,
  backgroundColor: Colors.BACKGROUND,
  underlineHeight: 3
};

export default TabsView;

const styles = {
  container: {
    flex: 1,
    width: "100%",
    height: "100%"
  },
  tabBar: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: 48,
    ...Platform.select({
      default: {
        boxShadow:
          "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)"
      },
      android: {
        elevation: 4,
        zIndex: 800
      }
    })
  },
  tabs: {
    display: "flex",
    position: "relative",
    height: 48,
    maxHeight: 48,
    minHeight: 48,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    width: "100%"
  },
  tab: {
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      web: {
        userSelect: "none",
        cursor: "pointer"
      }
    })
  },
  tabContent: {
    //maxWidth:
  }
};
