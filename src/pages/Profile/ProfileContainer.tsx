import { Component } from "react";
import { connect } from "react-redux";
import { Redirect, withRouter, type RouteComponentProps } from "react-router-dom";
import type { ProfileType } from "../../models/profile";
import type { RootState } from "../../store/store";
import { getUserProfile } from "../../store/profileReducer";
import Profile from "./Profile";

type PathParams = {
  userId: string,
};

type MapStateToProps = {
  profile: ProfileType | null,
  isAuth: boolean,
};

type MapDispatchToProps = {
  getUserProfile: (userId: string) => void,
};

type ProfileContainerProps = RouteComponentProps<PathParams> & MapStateToProps & MapDispatchToProps;

const mapStateToProps = (state: RootState): MapStateToProps => {
  return {
    isAuth: state.auth.isAuth,
    profile: state.profilePage.profile,
  };
};

class ProfileContainer extends Component<ProfileContainerProps> {
  componentDidMount() {
    const userId = this.props.match.params.userId;

    if (userId) {
      this.props.getUserProfile(userId);
    }
  }

  render() {
    if (!this.props.isAuth) return <Redirect to={"/login"} />;

    const userId = this.props.match.params.userId;

    if (!userId) {
      return;
    }

    return (
      <Profile profile={this.props.profile} />
    );
  }
};

export default connect(mapStateToProps, { getUserProfile })(withRouter(ProfileContainer));
