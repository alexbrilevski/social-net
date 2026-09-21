import type { ProfileType } from "../models/profile";
import { generateId } from "../utils/helpers";
import type { RootAction, RootThunk } from "./store";
import { profileAPI } from "../api/api";

const DUMMY_POSTS = [
  { id: "p1", postText: "Some text 1", likesCount: 2 },
  { id: "p2", postText: "Some text 2", likesCount: 15 },
  { id: "p3", postText: "Some text 3", likesCount: 1 },
  { id: "p4", postText: "Some text 4", likesCount: 10 },
  { id: "p5", postText: "Some text 5", likesCount: 5 },
];

const PROFILE_ACTION_TYPES = {
  SET_PROFILE: "profile/SET-USER-PROFILE",
  ADD_NEW_POST: "profile/ADD-NEW-POST",
  SET_USER_STATUS: "profile/SET-USER-STATUS",
} as const;

export type PostType = {
  id: string,
  postText: string,
  likesCount: number,
};

export type ProfilePage = {
  profile: ProfileType,
  postsData: Array<PostType>,
  status: string,
};

export type ProfileAction =
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof setUserStatus>
  | ReturnType<typeof addNewPostAC>;

const initState = {
  profile: {} as ProfileType,
  postsData: DUMMY_POSTS,
  status: "",
};

export const profileReducer = (state: ProfilePage = initState, action: RootAction): ProfilePage => {
  switch (action.type) {
    case PROFILE_ACTION_TYPES.SET_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case PROFILE_ACTION_TYPES.SET_USER_STATUS: {
      return { ...state, status: action.status };
    }
    case PROFILE_ACTION_TYPES.ADD_NEW_POST: {
      const newPost: PostType = {
        id: action.newPostId,
        postText: action.postText,
        likesCount: 0,
      };

      return {
        ...state, 
        postsData: [newPost, ...state.postsData],
      };
    }
    default: {
      return state;
    }
  }
};

// Action Creators
export const setUserProfile = (profile: ProfileType) => {
  return { type: PROFILE_ACTION_TYPES.SET_PROFILE, profile };
};

export const setUserStatus = (status: string) => {
  return { type: PROFILE_ACTION_TYPES.SET_USER_STATUS, status };
};

export const addNewPostAC = (postText: string) => {
  const newPostId = generateId();
  return { type: PROFILE_ACTION_TYPES.ADD_NEW_POST, newPostId, postText };
};

// Thunk Creators
export const getUserProfile = (userId: string): RootThunk => (dispatch) => {
  profileAPI.getUserProfile(userId).then(data => dispatch(setUserProfile(data)));
};

export const getUserStatus = (userId: string): RootThunk => {
  return (dispatch) => {
    profileAPI.getUserStatus(userId).then(data => dispatch(setUserStatus(data)));
  };
};

export const updateUserStatus = (newStatus: string): RootThunk => {
  return (dispatch) => {
    profileAPI.updateUserStatus(newStatus)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(setUserStatus(newStatus));
        }
      });
  };
};
