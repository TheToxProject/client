import InitialScreen from "./screens/InitialScreen";
import MainScreen from "./screens/MainScreen";
import AuthScreen from "./screens/AuthScreen";

export const globalRoutes = {
  Home: { screen: InitialScreen },
  Main: { screen: MainScreen },
  Auth: { screen: AuthScreen }
};
