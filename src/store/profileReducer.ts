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
  UPDATE_NEW_POST_TEXT: "profile/UPDATE-NEW-POST-TEXT",
  ADD_NEW_POST: "profile/ADD-NEW-POST",
} as const;

export type PostType = {
  id: string,
  postText: string,
  likesCount: number,
};

export type ProfilePage = {
  profile: ProfileType | null,
  postsData: Array<PostType>,
  newPostText: string,
};

export type ProfileAction =
  | ReturnType<typeof setUserProfile>
  | ReturnType<typeof updateNewPostTextAC>
  | ReturnType<typeof addNewPostAC>;

const initState = {
  profile: null,
  postsData: DUMMY_POSTS,
  newPostText: "",
};

export const profileReducer = (state: ProfilePage = initState, action: RootAction): ProfilePage => {
  switch (action.type) {
    case PROFILE_ACTION_TYPES.SET_PROFILE: {
      return { ...state, profile: action.profile };
    }
    case PROFILE_ACTION_TYPES.UPDATE_NEW_POST_TEXT: {
      return {...state, newPostText: action.text};
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
        newPostText: "",
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

export const updateNewPostTextAC = (text: string) => {
  return { type: PROFILE_ACTION_TYPES.UPDATE_NEW_POST_TEXT, text };
};

export const addNewPostAC = (postText: string) => {
  const newPostId = generateId();
  return { type: PROFILE_ACTION_TYPES.ADD_NEW_POST, newPostId, postText };
};

// Thunk Creators
export const getUserProfile = (userId: string): RootThunk => (dispatch) => {
  profileAPI.getUserProfile(userId).then(data => dispatch(setUserProfile(data)));
};

export default profileReducer;
