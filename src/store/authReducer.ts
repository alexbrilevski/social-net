import { stopSubmit } from "redux-form";
import type { RootThunk } from "./store";
import { authAPI, profileAPI } from "../api/api";
import { setUserProfile } from "./profileReducer";

const AUTH_ACTIONS = {
  SET_AUTH_USER_DATA: "auth/SET_AUTH_USER_DATA",
} as const;

export type AuthInitState = typeof initState;

export type AuthAction =
  | ReturnType<typeof setAuthUserData>;

const initState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isAuth: false,
};

export const authReducer = (
  state: AuthInitState = initState,
  action: AuthAction,
): AuthInitState => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.payload,
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
  isAuth: boolean,
) => {
  return {
    type: AUTH_ACTIONS.SET_AUTH_USER_DATA,
    payload: { userId, email, login, isAuth },
  };
};

// Thunk Creators
export const getAuthUserData = (): RootThunk => (dispatch) => {
  authAPI
    .me()
    .then((data) => {
      if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        dispatch(setAuthUserData(id, email, login, true));
        return profileAPI.getUserProfile(id);
      }
    })
    .then((data) => data && dispatch(setUserProfile(data)));
};

export const login = (
  email: string, 
  password: string, 
  rememberMe: boolean,
): RootThunk => {
  return (dispatch) => {
    authAPI
      .login(email, password, rememberMe)
      .then((data) => {
        if (data.resultCode === 0) {
          dispatch(getAuthUserData());
        } else {
          const message = data.messages.length > 0 ? data.messages[0] : "Some error";
          dispatch(stopSubmit("signInForm", {_error: message}));
        }
      });
  };
};

export const logout = (): RootThunk => (dispatch) => {
  authAPI.logout().then(data => {
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(0, "", "", false));
    }
  });
}
