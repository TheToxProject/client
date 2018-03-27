import { Platform } from "react-native";

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
        zIndex: 8000,
        marginBottom: 0
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
  }
};

export default styles;
