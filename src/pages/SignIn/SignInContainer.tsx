import { Component } from "react";
import { connect } from "react-redux";
import type { LoginData } from "../../api/api";
import { sendLoginData } from "../../store/authReducer";
import {SignIn} from "./SignIn";

type MapStateToPropsType = {};
type MapDispatchToProps = {
  sendLoginData: (loginFormData: LoginData) => void
};
type LoginContainerProps = MapStateToPropsType & MapDispatchToProps;

const mapStateToProps = () => ({});

class LoginContainer extends Component<LoginContainerProps> {
  render() {
    return (
      <SignIn {...this.props} />
    );
  };
}

export default connect(mapStateToProps, { sendLoginData })(LoginContainer)
