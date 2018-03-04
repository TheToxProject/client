import { connect } from "react-redux";
import { translate } from "react-i18next";

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

export default translate(["login"], { wait: true })(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginScreen))
);
