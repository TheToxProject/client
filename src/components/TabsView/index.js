import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Animated,
  View,
  Text,
  Platform,
  Dimensions,
  PanResponder
} from "react-native";

import styles from "./styles";

import Touchable from "./../../components/Touchable";
import Colors from "./../../styles/colors";
import { noSelect } from "./../../utilities";

class TabsView extends Component {
  constructor(props) {
    super(props);

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
    const { width } = this.state;
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

  componentDidMount() {
    this._transitionTo(this.props.defaultTabIndex, false);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { previousIndex, selectedIndex } = this.state;
    if (previousIndex == null || selectedIndex !== nextProps.selectedIndex) {
      return false;
    }

    return true;
  }

  _isMovingHorizontally(evt, gestureState) {
    const { swipeTolerance } = this.props;

    return (
      Math.abs(gestureState.dx) > Math.abs(gestureState.dy * swipeTolerance) &&
      Math.abs(gestureState.vx) > Math.abs(gestureState.vy * swipeTolerance)
    );
  }

  _canMoveScreen(evt, gestureState) {
    const { deadZone } = this.props;
    const { tabsCount, selectedIndex } = this.state;

    return (
      this._isMovingHorizontally(evt, gestureState) &&
      ((gestureState.dx >= deadZone && selectedIndex > 0) ||
        (gestureState.dx <= -deadZone && selectedIndex < tabsCount - 1))
    );
  }

  _startGesture(evt, gestureState) {
    const { onSwipeStart } = this.props;

    if (typeof onSwipeStart === "function") {
      onSwipeStart(evt, gestureState);
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
    const { width, onSwipeEnd } = this.props;

    let swipeDistanceThreshold = width / 1.75;
    let swipeVelocityThreshold = 0.15;

    if (typeof onSwipeEnd === "function") {
      onSwipeEnd(evt, gestureState);
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

  _transitionTo(index, animated = true) {
    const { width, animTension, animFriction } = this.props;
    const offset = -index * width;

    const animationConfig = {
      useNativeDriver: Platform.OS === "android",
      tension: animTension,
      friction: animFriction
    };

    // The following allows for initial tab index to avoid being animated (which creates a laggy effect)
    let animationTiming = null;
    if (animated) {
      animationTiming = Animated.spring;
    } else {
      animationTiming = Animated.timing;
      animationConfig.duration = 0;
    }

    Animated.parallel([
      animationTiming(this.state.animated, {
        toValue: 0,
        ...animationConfig
      }),
      animationTiming(this.state.offsetX, {
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

  render() {
    const { tabsCount, animated, offsetX } = this.state;
    const {
      children,
      backgroundColor,
      tabsColor,
      iconsColor,
      underlineColor,
      underlineHeight,
      width
    } = this.props;

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
  underlineHeight: PropTypes.number,
  width: PropTypes.number,
  deadZone: PropTypes.number,
  swipeTolerance: PropTypes.number,
  animFriction: PropTypes.number,
  animTension: PropTypes.number,
  onSwipeStart: PropTypes.func,
  onSwipeEnd: PropTypes.func
};

TabsView.defaultProps = {
  defaultTabIndex: 0,
  underlineColor: Colors.BACKGROUND,
  iconsColor: Colors.BACKGROUND,
  tabsColor: Colors.ACCENT,
  backgroundColor: Colors.BACKGROUND,
  underlineHeight: 3,
  width: Dimensions.get("window").width, // 100%
  deadZone: 12,
  swipeTolerance: 2,
  animFriction: 35,
  animTension: 200,
  onSwipeStart: () => null,
  onSwipeEnd: () => null
};

export default TabsView;
