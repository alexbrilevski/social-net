import { Component } from "react";
import { connect } from "react-redux";
import { withRouter, type RouteComponentProps } from "react-router-dom";
import type { ProfileType } from "../../models/profile";
import type { RootState } from "../../store/store";
import { getUserProfile } from "../../store/profileReducer";
import Profile from "./Profile";
import { withAuthRedirect } from "../../components/hoc/withAuthRedirect";

type PathParams = {
  userId: string,
};

type MapStateToProps = {
  profile: ProfileType | null,
};

type MapDispatchToProps = {
  getUserProfile: (userId: string) => void,
};

type ProfileContainerProps = RouteComponentProps<PathParams> & MapStateToProps & MapDispatchToProps;

const mapStateToProps = (state: RootState): MapStateToProps => {
  return {
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
    const userId = this.props.match.params.userId;

    if (!userId) {
      return;
    }

    return (
      <Profile profile={this.props.profile} />
    );
  }
};

export default withAuthRedirect(
  connect(mapStateToProps, { getUserProfile })(withRouter(ProfileContainer))
);
