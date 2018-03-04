import { connect } from "react-redux";
import { translate } from "react-i18next";

import { withRouter } from "./../utilities/routing/router";
import RegisterScreen from "./../screens/RegisterScreen";
//import * as actions from "./../reducers/uiReducer/actions";

const mapStateToProps = state => {
  return {
    //loginAnimationRan: state.ui.loginAnimationRan
  };
};

const mapDispatchToProps = dispatch => {
  return {
    /*loginAnimationDone: () => {
      dispatch(actions.loginAnimationDone());
    }*/
  };
};

export default translate(["register"], { wait: true })(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterScreen))
);
