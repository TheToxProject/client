import { connect } from "react-redux";
import { translate } from "react-i18next";

import { withRouter } from "./../utilities/routing/router";
import ChatScreen from "../screens/ChatScreen";
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

export default translate(["chat"], { wait: true })(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(ChatScreen))
);
