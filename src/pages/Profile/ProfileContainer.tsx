import { Component, type ComponentType } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, type RouteComponentProps } from "react-router-dom";
import type { ProfileType } from "../../models/profile";
import type { RootState } from "../../store/store";
import { getUserProfile, getUserStatus, updateUserStatus } from "../../store/profileReducer";
import Profile from "./Profile";
import { withAuthRedirect } from "../../components/hoc/withAuthRedirect";

type PathParams = {
  userId: string,
};

type MapStateToProps = {
  profile: ProfileType | null,
  status: string,
  authUserId: number | null,
  isAuth: boolean,
};

type MapDispatchToProps = {
  getUserProfile: (userId: number) => void,
  getUserStatus: (userId: number) => void,
  updateUserStatus: (status: string) => void,
};

type ProfileContainerProps = RouteComponentProps<PathParams> & MapStateToProps & MapDispatchToProps;

const mapStateToProps = (state: RootState): MapStateToProps => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authUserId: state.auth.userId,
    isAuth: state.auth.isAuth,
  };
};

class ProfileContainer extends Component<ProfileContainerProps> {
  componentDidMount() {
    let userId: number | null = Number(this.props.match.params.userId);

    if (!userId) {
      userId = this.props.authUserId;
    }

    if (userId) {
      this.props.getUserProfile(userId);
      this.props.getUserStatus(userId);
    }
  }

  render() {
    const { profile, status, updateUserStatus } = this.props;

    if (!profile) {
      return;
    }

    return (
      <Profile
        profile={profile}
        status={status}
        updateUserStatus={updateUserStatus}
      />
    );
  }
};

export default compose<ComponentType>(
  connect(mapStateToProps, { getUserProfile, getUserStatus, updateUserStatus }),
  withRouter,
  withAuthRedirect,
)(ProfileContainer);
