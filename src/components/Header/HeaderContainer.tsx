import { Component } from "react";
import { connect } from "react-redux";
import type { RootState } from "../../store/store";
import { getAuthUserData } from "../../store/authReducer";
import type { ProfileType } from "../../models/profile";
import Header from "./Header";

type MapStateToProps = {
  login: string,
  isAuth: boolean,
  profile: ProfileType,
};

type MapDispatchProps = {
  getAuthUserData: () => void,
};

type HeaderContainerProps = MapStateToProps & MapDispatchProps;

const mapStateToProps = (state: RootState): MapStateToProps => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth,
  profile: state.auth.profile,
});

class HeaderContainer extends Component<HeaderContainerProps> {
  componentDidMount() {
    this.props.getAuthUserData();
  };
  render() {
    return <Header {...this.props} />;
  };
}

export default connect(mapStateToProps, { getAuthUserData })(HeaderContainer);
