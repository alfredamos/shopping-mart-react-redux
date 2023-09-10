import { createSlice } from "@reduxjs/toolkit";
import { UserAction } from "../actions/user.action";
import { UserDto } from "../models/auth/user.model";
import { AppState } from "../state/app.state";
import { UserState } from "../state/user.state";

const initialState: UserState = {
  user: new UserDto(),
  users: [],
  errorMessage: "",
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser(state: UserState, action: UserAction) {
      const payload = action.payload! as UserDto;
      state.users?.push(payload);
      state.isLoading = false;
      state.errorMessage = "";
    },
    deleteUser(state: UserState, action: UserAction) {
      const payload = action.payload as UserDto;
      state.users?.filter((user) => user.id === payload.id);
      state.isLoading = false;
      state.errorMessage = "";
    },
    getAllUsers(state: UserState, action: UserAction) {
      const payload = action.payload as UserDto[];
      state.users = payload;
      state.isLoading = false;
      state.errorMessage = "";
    },
    getUserById(state: UserState, action: UserAction) {
      const payload = action.payload as UserDto;
      state.user = state.users?.find(
        (user) => user.id === payload.id
      );
      state.isLoading = false;
      state.errorMessage = "";
    },
    updateUser(state: UserState, action: UserAction) {
      const payload = action.payload as UserDto;      
      state.users?.map(user => user.id === payload.id ? payload : user);
      state.isLoading = false;
      state.errorMessage = "";
    },
    userError(state: UserState, action: UserAction) {
      const payload = action.payload as string;
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export const {
  addUser,
  userError,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} = userSlice.actions;

export default userSlice.reducer;
export const getUserState = (state: AppState) => state.user;
