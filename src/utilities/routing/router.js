import { Platform } from "react-native";

const RouterPackage =
  Platform.OS === "web"
    ? require("react-router-dom")
    : require("react-router-native");

/*
 * Remove Platform specific exports :/
 * */
export const { Link, Route, Redirect, withRouter } = RouterPackage;
export const BackButton =
  Platform.OS === "web" ? props => props.children : RouterPackage.BackButton;
export const Router =
  Platform.OS === "web"
    ? RouterPackage.BrowserRouter
    : RouterPackage.NativeRouter;
