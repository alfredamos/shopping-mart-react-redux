import { createSlice } from "@reduxjs/toolkit";
import { UserAction } from "../actions/user.action";
import { UserDto } from "../models/auth/user.model";
import { AppState } from "../state/app.state";
import { UserState } from "../state/user.state";
import { Gender } from "../models/auth/gender.model";
//import { UserRoleDto } from "../models/auth/user-role.model";

const initialUser: UserDto = {
  name: "",
  email: "",
  phone: "",
  password: "",
  gender: Gender.Male,
};

const initialState: UserState = {
  user: initialUser,
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
      state.user = payload;
      state.isLoading = false;
      state.errorMessage = "";
    },
    updateUser(state: UserState, action: UserAction) {
      const payload = action.payload as UserDto;
      state.users?.map((user) => (user.id === payload.id ? payload : user));
      state.isLoading = false;
      state.errorMessage = "";
    },
    userChangeRole(state: UserState, action: UserAction) {      
      userSlice.caseReducers.updateUser(state, action)
    }, 
    userError(state: UserState, action: UserAction) {
      state.isLoading = false;
      state.errorMessage = action.payload as string;
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
  userChangeRole
} = userSlice.actions;

export default userSlice.reducer;
export const getUserState = (state: AppState) => state.user;
