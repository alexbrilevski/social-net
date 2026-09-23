import {
  type AuthInitState,
  authReducer,
  setAuthUserData,
  setAuthUserProfileData,
} from "./authReducer";

let initState: AuthInitState;

beforeEach(() => {
  initState = {
    userId: null,
    email: null,
    login: null,
    fullName: null,
    photo: null,
    isAuth: false,
  };
});

test("Authorised user data should be set to state", () => {
  const userData = {
    userId: 2,
    email: "mail@example.com",
    login: "User",
    isAuth: true,
  };
  const { userId, email, login, isAuth } = userData;
  const newState = authReducer(
    initState,
    setAuthUserData(userId, email, login, isAuth),
  );

  expect(newState).not.toBe(initState);
  expect(newState.userId).toBe(userId);
  expect(newState.email).toBe(email);
  expect(newState.login).toBe(login);
  expect(newState.isAuth).toBeTruthy();
  expect(initState.isAuth).toBeFalsy();
});

test("Authorised user profile data should be set to state", () => {
  const authUserProfileData = {
    fullName: "John Smith",
    photo: "",
  };
  const { fullName, photo } = authUserProfileData;
  const newState = authReducer(
    initState,
    setAuthUserProfileData(fullName, photo),
  );

  expect(newState).not.toBe(initState);
  expect(newState.fullName).toBe(fullName);
  expect(newState.photo).toBe(photo);
});
