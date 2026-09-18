import type { ProfileType } from "../models/profile";
import type { RootAction, RootThunk } from "./store";
import { authAPI, profileAPI, type LoginData } from "../api/api";

const AUTH_ACTIONS = {
  SET_AUTH_USER_DATA: "auth/SET_AUTH_USER_DATA",
  SET_AUTH_USER_PROFILE: "auth/SET_AUTH_USER_PROFILE",
} as const;

export type AuthInitState = typeof initState;

export type AuthAction =
  | ReturnType<typeof setAuthUserData>
  | ReturnType<typeof setAuthUserProfile>;

const initState = {
  userId: 0,
  email: "",
  login: "",
  isAuth: false,
  profile: {} as ProfileType,
};

export const authReducer = (
  state: AuthInitState = initState,
  action: RootAction,
): AuthInitState => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.userData,
        isAuth: true,
      };
    case AUTH_ACTIONS.SET_AUTH_USER_PROFILE:
      return {
        ...state,
        profile: action.userProfile,
      };
    default:
      return state;
  }
};

// Action Creators
export const setAuthUserData = (
  userId: number,
  email: string,
  login: string,
) => {
  return {
    type: AUTH_ACTIONS.SET_AUTH_USER_DATA,
    userData: { userId, email, login },
  };
};

// Action Creators
export const setAuthUserProfile = (profile: ProfileType) => {
  return {
    type: AUTH_ACTIONS.SET_AUTH_USER_PROFILE,
    userProfile: profile,
  };
};

// Thunk Creators
export const getAuthUserData = (): RootThunk => (dispatch) => {
  authAPI
    .me()
    .then((data) => {
      if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login));
        return profileAPI.getUserProfile(id.toString());
      }
    })
    .then((data) => data && dispatch(setAuthUserProfile(data)));
};

export const sendLoginData = (loginFormData: LoginData): RootThunk => {
  return (dispatch) => {
    authAPI
      .login(loginFormData)
      .then((data) => {
        if (data.resultCode === 0) {
          return profileAPI.getUserProfile(data.data.userId.toString());
        }
      })
      .then((data) => data && dispatch(setAuthUserProfile(data)));
  };
};
