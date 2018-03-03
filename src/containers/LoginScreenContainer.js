import { connect } from "react-redux";

import { withRouter } from "./../utilities/routing/router";
import LoginScreen from "./../screens/LoginScreen";
import * as actions from "./../reducers/uiReducer/actions";

const mapStateToProps = state => {
  return {
    loginAnimationRan: state.ui.loginAnimationRan
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginAnimationDone: () => {
      dispatch(actions.loginAnimationDone());
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
);
