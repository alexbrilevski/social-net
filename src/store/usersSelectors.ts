import { createSelector } from "reselect";
import type { RootState } from "./store";
import type { User } from "../models/user";

const usersSelector = (state: RootState) => {
  return state.usersPage.users;
};

export const getUsers = createSelector(usersSelector, (users: Array<User>) => {
  return users;
});

export const getTotalUsersCount = (state: RootState) => {
  return state.usersPage.totalUsersCount;
};

export const getPageSize = (state: RootState) => {
  return state.usersPage.pageSize;
};

export const getCurrentPage = (state: RootState) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: RootState) => {
  return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state: RootState) => {
  return state.usersPage.followingInProgress;
};
