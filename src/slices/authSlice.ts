import {createSlice} from "@reduxjs/toolkit";
import { StateAuth } from "../state/state.auth";
import { Gender } from "../models/auth/gender.model";
import { AuthAction } from '../actions/auth.action';
import { AuthApiResponse } from '../models/auth/api-response.model';
import { Role } from "../models/auth/user-type.model";
import { UserDetail } from "../models/auth/user-detail.model";
import { AppState } from "../state/app.state";

const initialUser: UserDetail={
  name: "",
  email: "",
  phone: "",
  gender: Gender.Male, 
}
const initialState: StateAuth = { 
  user: initialUser,
  isLoading: true,
  isLoggedIn: false,
  errorMessage: "",
  token: "",
  message: "",
  role: Role.Customer
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {   
    authUserSuccess(state: StateAuth, action: AuthAction){
      const payload = action.payload as AuthApiResponse;
      state.user = payload.user!;
      state.isLoading = false;
      state.isLoggedIn = payload.isLoggedIn;
      state.errorMessage = "";
      state.token = payload.token;
      state.message = payload.message;
      state.role = payload.role
    },
    authUserFailure(state: StateAuth, action: AuthAction){
      const payload = action.payload as string;
      state.user = new UserDetail();
      state.isLoading = false;
      state.isLoggedIn = false;
      state.errorMessage = payload;
      state.token = "";
      state.message = "User is not loggedIn!";
      state.role = Role.Customer;
    },
    
  }
});

export const { authUserFailure, authUserSuccess} = authSlice.actions;
export default authSlice.reducer;
export const getAuthState = (state: AppState) => state.auth;