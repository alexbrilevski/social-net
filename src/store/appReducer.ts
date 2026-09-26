import { getAuthUserData } from "./authReducer";
import type { RootThunk } from "./store";

const APP_ACTIONS = {
  SET_ISINITIALIZED: "app/SET_ISINITIALIZED",
} as const;

export type AppInitState = typeof initState;

export type AppAction = ReturnType<typeof setIsInitialized>;

const initState = {
  isInitialized: false,
};

export const appReducer = (
  state: AppInitState = initState,
  action: AppAction,
): AppInitState => {
  switch (action.type) {
    case APP_ACTIONS.SET_ISINITIALIZED: {
      return { ...state, isInitialized: true };
    }
    default: {
      return state;
    }
  }
};

// Action Creators
export const setIsInitialized = () => {
  return { type: APP_ACTIONS.SET_ISINITIALIZED };
};

// Thunk Creators
export const initializeApp = (): RootThunk => (dispatch) => {
  Promise.all([
    dispatch(getAuthUserData()),
  ]).then(() => {
    dispatch(setIsInitialized());
  });
};
