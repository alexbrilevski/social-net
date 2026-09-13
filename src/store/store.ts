import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk, type ThunkAction } from "redux-thunk";
import { authReducer, type AuthAction } from "./authReducer";
import profileReducer, { type ProfileAction } from "./profileReducer";
import messagesReducer, { type MessagesAction } from "./messagesReducer";
import { usersReducer, type UserActions } from "./usersReducer";

export type RootStore = typeof store;
export type RootState = ReturnType<typeof rootReducer>;

export type RootAction =
  | AuthAction
  | ProfileAction
  | MessagesAction
  | UserActions;
export type RootThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  RootAction
>;

const rootReducer = combineReducers({
  auth: authReducer,
  profilePage: profileReducer,
  messagesPage: messagesReducer,
  usersPage: usersReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
