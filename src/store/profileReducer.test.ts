import type { ProfileType } from "../models/profile";
import {
  profileReducer,
  addNewPostAC,
  type ProfilePage,
  setUserProfile,
  updateNewPostTextAC,
  setUserStatus,
} from "./profileReducer";

let state: ProfilePage;

beforeEach(() => {
  state = {
    profile: {} as ProfileType,
    postsData: [
      { id: "p1", postText: "It's my first post", likesCount: 20 },
      { id: "p2", postText: "Hi! How are you?", likesCount: 10 },
    ],
    newPostText: "",
    status: "",
  };
});

test("New post text should be immutably updated", () => {
  const newText = "Hello world!";
  const action = updateNewPostTextAC(newText);

  const newState = profileReducer(state, action);

  expect(newState).not.toBe(state);
  expect(newState.newPostText).toBe(newText);
});

test("New post should be immutably added", () => {
  const newPostText = "Hello world!";
  const action = addNewPostAC(newPostText);

  const newState = profileReducer(state, action);

  expect(newState).not.toBe(state);
  expect(newState.postsData.length).toBe(3);
  expect(newState.postsData[0].id).toBe(action.newPostId);
  expect(newState.postsData[0].postText).toBe(newPostText);
  expect(newState.newPostText).toBe("");
});

test("Profile data should be immutably added to state", () => {
  const profileData = {
    userId: 1,
    lookingForAJob: true,
    lookingForAJobDescription: "",
    fullName: "User",
    contacts: {
      github: "",
    },
    photos: {
      small: "",
      large: "",
    },
  };
  const action = setUserProfile(profileData);

  const newState = profileReducer(state, action);

  expect(newState).not.toBe(state);
  expect(newState.profile).toEqual(profileData);
});

test("User status should be immutably updated in state", () => {
  const newStatus = "New status";
  const action = setUserStatus(newStatus);

  const newState = profileReducer(state, action);

  expect(newState).not.toBe(state);
  expect(newState.status).toEqual(newStatus);
});
