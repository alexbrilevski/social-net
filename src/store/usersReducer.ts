import type { User } from "../models/user";
import type { RootThunk } from "./store";
import { followAPI, usersAPI } from "../api/api";

const USERS_ACTIONS = {
  SET_USERS: "users/SET-USERS",
  SET_TOTAL_USERS_COUNT: "users/SET_TOTAL_USERS_COUNT",
  SET_CURRENT_PAGE: "users/SET_CURRENT_PAGE",
  FOLLOW_USER: "users/FOLLOW-USER",
  UNFOLLOW_USER: "users/UNFOLLOW_USER",
  TOGGLE_IS_FETCHING: "users/TOGGLE_IS_FETCHING",
  TOGGLE_FOLLOWING_PROGRESS: "users/TOGGLE_FOLLOWING_PROGRESS",
} as const;

export type UsersPageState = typeof initState;

export type UserActions =
  | ReturnType<typeof setUsers>
  | ReturnType<typeof setTotalUsersCount>
  | ReturnType<typeof setCurrentPage>
  | ReturnType<typeof followUser>
  | ReturnType<typeof unfollowUser>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof toggleFollowingProgress>;

const initState = {
  users: [] as User[],
  totalUsersCount: 0,
  pageSize: 25,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

export const usersReducer = (
  state = initState,
  action: UserActions,
): UsersPageState => {
  switch (action.type) {
    case USERS_ACTIONS.SET_USERS: {
      return {
        ...state,
        users: action.users,
      };
    }
    case USERS_ACTIONS.SET_TOTAL_USERS_COUNT: {
      return {
        ...state,
        totalUsersCount: action.totalUsersCount,
      };
    }
    case USERS_ACTIONS.SET_CURRENT_PAGE: {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case USERS_ACTIONS.FOLLOW_USER: {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, followed: true } : user,
        ),
      };
    }
    case USERS_ACTIONS.UNFOLLOW_USER: {
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.id ? { ...user, followed: false } : user,
        ),
      };
    }
    case USERS_ACTIONS.TOGGLE_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case USERS_ACTIONS.TOGGLE_FOLLOWING_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.inProgress
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId),
      };
    }
    default: {
      return state;
    }
  }
};

// Action Creators
export const setUsers = (users: User[]) => {
  return { type: USERS_ACTIONS.SET_USERS, users };
};
export const setTotalUsersCount = (totalCount: number) => {
  return {
    type: USERS_ACTIONS.SET_TOTAL_USERS_COUNT,
    totalUsersCount: totalCount,
  };
};
export const setCurrentPage = (pageNumber: number) => {
  return { type: USERS_ACTIONS.SET_CURRENT_PAGE, currentPage: pageNumber };
};
export const followUser = (id: number) => {
  return { type: USERS_ACTIONS.FOLLOW_USER, id };
};
export const unfollowUser = (id: number) => {
  return { type: USERS_ACTIONS.UNFOLLOW_USER, id };
};
export const toggleIsFetching = (isFetching: boolean) => {
  return { type: USERS_ACTIONS.TOGGLE_IS_FETCHING, isFetching };
};
export const toggleFollowingProgress = (inProgress: boolean, userId: number) => {
  return { type: USERS_ACTIONS.TOGGLE_FOLLOWING_PROGRESS, inProgress, userId };
};

// Thunk Creators
export const fetchUsers = (page: number, pageSize: number): RootThunk => {
  return (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));
    usersAPI.getUsers(page, pageSize).then(data => {
      dispatch(toggleIsFetching(false));
      dispatch(setUsers(data.items));
      dispatch(setTotalUsersCount(data.totalCount));
    });
  };
};

export const follow = (userId: number): RootThunk => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    followAPI.follow(userId).then(data => {
      if (data.resultCode === 0) dispatch(followUser(userId));
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
};

export const unfollow = (userId: number): RootThunk => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, userId));
    followAPI.unfollow(userId).then(data => {
      if (data.resultCode === 0) dispatch(unfollowUser(userId));
      dispatch(toggleFollowingProgress(false, userId));
    });
  };
};
