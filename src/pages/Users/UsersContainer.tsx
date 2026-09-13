import { Component } from "react";
import { connect } from "react-redux";
import { followAPI } from "../../api/api";
import type { RootState } from "../../store/store";
import {
  fetchUsers,
  followUser,
  setCurrentPage,
  toggleFollowingProgress,
  unfollowUser,
  type UsersPageState
} from "../../store/usersReducer";
import Preloader from "../../components/UI/Preloader/Preloader";
import { UsersList } from "./UsersList";

type MapStateToProps = UsersPageState;

type MapDispatchToProps = {
  fetchUsers: (currentPage: number, pageSize: number) => void,
  setCurrentPage: (pageNumber: number) => void,
  followUser: (id: number) => void,
  unfollowUser: (id: number) => void,
  toggleFollowingProgress: (inProgress: boolean, userId: number) => void,
};

type UsersContainerProps = MapStateToProps & MapDispatchToProps;

const mapStateToProps = (state: RootState): MapStateToProps => {
  return {
    users: state.usersPage.users,
    totalUsersCount: state.usersPage.totalUsersCount,
    pageSize: state.usersPage.pageSize,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

class UsersContainer extends Component<UsersContainerProps> {
  componentDidMount() {
    if (this.props.users.length === 0) {
      this.props.fetchUsers(this.props.currentPage, this.props.pageSize);
    }
  }

  setCurrentPage = (pageNumber: number) => {
    this.props.fetchUsers(this.props.currentPage, this.props.pageSize);
    this.props.setCurrentPage(pageNumber);
  }

  followUser(userId: number) {
    this.props.toggleFollowingProgress(true, userId);
    followAPI.follow(userId).then(data => {
      if (data.resultCode === 0) this.props.followUser(userId);
      this.props.toggleFollowingProgress(false, userId);
    });
  }

  unfollowUser(userId: number) {
    this.props.toggleFollowingProgress(true, userId);
    followAPI.unfollow(userId).then(data => {
      if (data.resultCode === 0) this.props.unfollowUser(userId);
      this.props.toggleFollowingProgress(false, userId);
    });
  }

  render() {
    return (
      this.props.isFetching ?
        <Preloader />
        :
        <UsersList
          users={this.props.users}
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          followingInProgress={this.props.followingInProgress}
          setCurrentPage={this.setCurrentPage.bind(this)}
          followUser={this.followUser.bind(this)}
          unfollowUser={this.unfollowUser.bind(this)}
        />
    );
  }
};

export default connect(mapStateToProps, {
  fetchUsers,
  setCurrentPage,
  followUser,
  unfollowUser,
  toggleFollowingProgress,
})(UsersContainer);
