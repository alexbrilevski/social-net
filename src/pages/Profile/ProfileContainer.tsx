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
};

type MapDispatchToProps = {
  getUserProfile: (userId: string) => void,
  getUserStatus: (userId: string) => void,
  updateUserStatus: (status: string) => void,
};

type ProfileContainerProps = RouteComponentProps<PathParams> & MapStateToProps & MapDispatchToProps;

const mapStateToProps = (state: RootState): MapStateToProps => {
  return {
    profile: state.profilePage.profile,
    status: state.profilePage.status,
  };
};

class ProfileContainer extends Component<ProfileContainerProps> {
  componentDidMount() {
    const userId = this.props.match.params.userId;

    if (userId) {
      this.props.getUserProfile(userId);
      this.props.getUserStatus(userId);
    }
  }

  render() {
    const userId = this.props.match.params.userId;

    if (!userId) {
      return;
    }

    const { profile, status, updateUserStatus } = this.props;

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
