import {
  usersReducer,
  followUser,
  setCurrentPage,
  setTotalUsersCount,
  setUsers,
  toggleIsFetching,
  unfollowUser,
  type UsersPageState,
  toggleFollowingProgress,
} from "./usersReducer";

let state: UsersPageState;

beforeEach(() => {
  state = {
    users: [
      {
        id: 1,
        name: "Dmitri K.",
        status: "I am looking for a job right now...",
        photos: { small: "", large: "" },
        followed: false,
      },
      {
        id: 2,
        name: "Svetlana D.",
        status: "I am so pretty",
        photos: { small: "", large: "" },
        followed: false,
      },
      {
        id: 3,
        name: "Sergei S.",
        status: "I like football!!!",
        photos: { small: "", large: "" },
        followed: true,
      },
    ],
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 1,
    isFetching: false,
    followingInProgress: [],
  };
});

test("Correct user should be followed", () => {
  const userId = 2;

  const newState = usersReducer(state, followUser(userId));

  expect(newState).not.toBe(state);
  expect(newState.users).not.toBe(state.users);
  expect(newState.users[1].followed).toBeTruthy();
  expect(state.users[1].followed).toBeFalsy();
});

test("Correct user should be unfollowed", () => {
  const userId = 3;

  const newState = usersReducer(state, unfollowUser(userId));

  expect(newState).not.toBe(state);
  expect(newState.users).not.toBe(state.users);
  expect(newState.users[2].followed).toBeFalsy();
  expect(state.users[2].followed).toBeTruthy();
});

test("Users should be correctly added to initial array", () => {
  const newUsers = [
    {
      id: 1,
      name: "Dmitri K.",
      status: "I am looking for a job right now...",
      photos: { small: "", large: "" },
      followed: false,
    },
    {
      id: 2,
      name: "Svetlana D.",
      status: "I am so pretty",
      photos: { small: "", large: "" },
      followed: false,
    },
    {
      id: 3,
      name: "Sergei S.",
      status: "I like football!!!",
      photos: { small: "", large: "" },
      followed: true,
    },
    {
      id: 4,
      avatarUrl: "",
      name: "Andrew T.",
      status: "I am free to help you to create good Video Production",
      photos: { small: "", large: "" },
      followed: true,
    },
    {
      id: 5,
      avatarUrl: "",
      name: "Alex B.",
      status: "I am studying in IT-Incubator! It's really cool!",
      photos: { small: "Belarus", large: "Minsk" },
      followed: true,
    },
  ];

  const newState = usersReducer(state, setUsers(newUsers));

  expect(newState).not.toBe(state);
  expect(newState.users).not.toBe(state.users);
  expect(newState.users.length).toBe(5);
  expect(state.users.length).toBe(3);
  expect(newState.users[4].name).toBe("Alex B.");
});

test("Total users count should be correctly received from server", () => {
  const totalUsersCount = 1000;

  const newState = usersReducer(state, setTotalUsersCount(totalUsersCount));

  expect(newState).not.toBe(state);
  expect(state.totalUsersCount).toBe(0);
  expect(newState.totalUsersCount).toBe(totalUsersCount);
});

test("Current page should be correctly updated", () => {
  const pageNumber = 10;

  const newState = usersReducer(state, setCurrentPage(pageNumber));

  expect(newState).not.toBe(state);
  expect(state.currentPage).toBe(1);
  expect(newState.currentPage).toBe(pageNumber);
});

test("Status isFetching should be correctly updated", () => {
  const isFetching = true;

  const newState = usersReducer(state, toggleIsFetching(isFetching));

  expect(newState).not.toBe(state);
  expect(state.isFetching).toBeFalsy();
  expect(newState.isFetching).toBeTruthy();
});

test("FollowingInProgress array should be correctly updated", () => {
  const userId = 2;

  const newState = usersReducer(state, toggleFollowingProgress(true, userId));
  const newStateAlt = usersReducer(newState, toggleFollowingProgress(false, userId));

  expect(newState).not.toBe(state);
  expect(state.followingInProgress.length).toBe(0);
  expect(newState.followingInProgress.length).toBe(1);
  expect(newStateAlt.followingInProgress.length).toBe(0);
});
