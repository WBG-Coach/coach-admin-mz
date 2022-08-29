import { RootState } from "..";
import { api } from "../../service";
import { createSlice } from "@reduxjs/toolkit";
import { clearLocalStorage, setLocalUser } from "../../storage";
import { Project, User } from "../type";

const INITIAL_STATE: User & { loginError?: string; currentProject?: Project } =
  {};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_STATE,
  reducers: {
    loadLocalUser: (_state, action) => {
      return action.payload;
    },
    selectProject: (state, action) => {
      const newState = { ...state, currentProject: action.payload };
      setLocalUser(newState);
      return newState;
    },
    logout: () => {
      clearLocalStorage();
      setLocalUser(INITIAL_STATE);
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
      if (action.payload) {
        setLocalUser(action.payload);
        return { ...state, ...action.payload };
      } else {
        return { ...state, loginError: "login-error" };
      }
    });
  },
});

export const selectCurrentUser = (
  state: RootState
): User & { loginError?: string; currentProject?: Project } => state.auth;

export const selectLoginErrorMessage = (state: RootState) =>
  state.auth.loginError;

export const { loadLocalUser, selectProject, logout } = authSlice.actions;

const { reducer } = authSlice;

export default reducer;
