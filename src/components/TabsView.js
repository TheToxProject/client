import React, { Component } from "react";
import {
  Animated,
  Easing,
  ScrollView,
  View,
  Text,
  Platform,
  Dimensions
} from "react-native";
import PropTypes from "prop-types";
import Touchable from "./../components/Touchable";
import Colors from "./../styles/colors";

class TabsView extends Component {
  state = {
    tabsCount: 0,
    selectedIndex: 0,
    previousIndex: -1,
    animated: new Animated.Value(0)
  };

  constructor(props) {
    super(props);

    this.selectTab = this.selectTab.bind(this);
  }

  componentWillMount() {
    const { defaultTabIndex, children } = this.props;
    this.setState({
      selectedIndex: defaultTabIndex,
      tabsCount: React.Children.toArray(children).length
    });
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { previousIndex } = this.state;
    if (previousIndex == null) {
      return false;
    }

    return true;
  }

  selectTab(index, selectedIndex) {
    const { width } =
      Platform.OS === "web" ? { width: 320 } : Dimensions.get("window");

    if (index === this.state.selectedIndex) {
      return; // Avoid useless re-render.
    }

    this.setState({ previousIndex: this.state.selectedIndex });
    this.setState({ selectedIndex: index });

    Animated.spring(this.state.animated, {
      toValue: this.state.selectedIndex,
      useNativeDriver: true,
      tension: 4,
      friction: 200
    }).start();
  }

  outputX() {
    const { tabsCount, selectedIndex, previousIndex } = this.state;
    const { width } =
      Platform.OS === "web" ? { width: 320 } : Dimensions.get("window");

    let offset = 0;
    if (previousIndex > selectedIndex) {
      offset = selectedIndex * width;
    } else {
      offset = -(selectedIndex * width);
    }

    if (offset === 0) {
      offset = -(previousIndex * width);
    }

    return selectedIndex === tabsCount - 1 || selectedIndex === 0
      ? offset
      : offset * 2;
  }

  render() {
    const { width } =
      Platform.OS === "web" ? { width: 320 } : Dimensions.get("window");
    const { children, previousIndex } = this.props;
    const { tabsCount, selectedIndex, animated } = this.state;
    const childrens = React.Children.toArray(children);

    const swipeInterpolateX = animated.interpolate({
      inputRange: [0, tabsCount - 1],
      outputRange: [1, this.outputX()],
      extrapolate: "clamp"
    });

    const tabLineInterpolateX = animated.interpolate({
      inputRange: [0, tabsCount - 1],
      outputRange: [0, this.outputX() / tabsCount * -1], // Reverse the number, we go left-to-right.
      extrapolate: "clamp"
    });

    //console.log(tabLineInterpolateX);

    return (
      <View style={styles.container}>
        <View style={styles.tabBar}>
          <View style={styles.tabs}>
            {childrens.map((view, index, tabs) => {
              return (
                <Touchable
                  style={{ flex: 1 }}
                  onPress={() => this.selectTab(index, selectedIndex)}
                >
                  <View style={[styles.tab, { width: width / tabsCount }]}>
                    <Text style={{ color: "white" }}>{view.props.icon}</Text>
                  </View>
                </Touchable>
              );
            })}
          </View>
          <View style={{ width }}>
            <Animated.View
              style={{
                backgroundColor: Colors.BACKGROUND,
                transform: [
                  // We need a positive number because we go left to right while the swipe value is right to left.
                  { translateX: tabLineInterpolateX },
                  { translateY: -3 }
                ],
                height: 3,
                width: width / tabsCount - 1
              }}
            />
          </View>
        </View>
        <Animated.View
          style={{
            flex: 1,
            flexDirection: "row",
            overflowX: "hidden",
            transform: [{ translateX: swipeInterpolateX }],
            width: tabsCount * width,
            maxWidth: tabsCount * width,
            minWidth: tabsCount * width
          }}
        >
          {childrens.map((view, index, tabs) => {
            return (
              <View style={{ width: width, maxWidth: width }}>
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
  defaultTabIndex: PropTypes.number
};

TabsView.defaultProps = {
  defaultTabIndex: 0
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
    ...Platform.select({
      ios: {
        boxShadow:
          "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)"
      },
      android: {
        elevation: 4
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
    backgroundColor: Colors.ACCENT,
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
