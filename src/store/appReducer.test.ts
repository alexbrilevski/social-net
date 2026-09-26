import { appReducer, setIsInitialized, type AppInitState } from "./appReducer";

test("App status should be set to state", () => {
  const initState: AppInitState = {
    isInitialized: false,
  };

  const newState = appReducer(initState, setIsInitialized());

  expect(initState.isInitialized).toBeFalsy();
  expect(newState.isInitialized).toBeTruthy();
});
