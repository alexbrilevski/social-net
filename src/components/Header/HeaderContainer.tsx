import { Component } from "react";
import { connect } from "react-redux";
import type { RootState } from "../../store/store";
import { logout } from "../../store/authReducer";
import Header from "./Header";

type MapStateToProps = {
  userId: number | null,
  fullName: string | null,
  photo: string | null,
  isAuth: boolean,
};

type MapDispatchProps = {
  logout: () => void,
};

type HeaderContainerProps = MapStateToProps & MapDispatchProps;

const mapStateToProps = (state: RootState): MapStateToProps => ({
  userId: state.auth.userId,
  fullName: state.auth.fullName,
  photo: state.auth.photo,
  isAuth: state.auth.isAuth,
});

class HeaderContainer extends Component<HeaderContainerProps> {
  render() {
    return <Header {...this.props} />;
  };
}

export default connect(mapStateToProps, { logout })(HeaderContainer);
