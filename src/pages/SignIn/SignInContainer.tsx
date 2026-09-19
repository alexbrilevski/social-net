import { Component } from "react";
import { connect } from "react-redux";
import type { LoginData } from "../../api/api";
import { sendLoginData } from "../../store/authReducer";
import {SignIn} from "./SignIn";

type MapStateToPropsType = {};
type MapDispatchToProps = {
  sendLoginData: (signInFormData: LoginData) => void
};
type SignInContainerProps = MapStateToPropsType & MapDispatchToProps;

class SignInContainer extends Component<SignInContainerProps> {
  render() {
    return (
      <SignIn {...this.props} />
    );
  };
}

export default connect(() => ({}), { sendLoginData })(SignInContainer)
