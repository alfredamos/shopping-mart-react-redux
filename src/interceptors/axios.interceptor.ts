import axios from "axios";
import store from "../store";
import { authService, userSubInitial } from "../services/auth.service";
import { authUserSuccess } from "../slices/authSlice";
import { AuthApiResponse } from '../models/auth/api-response.model';

const baseURL = "http://localhost:3000/api";

const userInfo: AuthApiResponse = JSON.parse(localStorage.getItem("userInfo")!);
if (userInfo) store.dispatch(authUserSuccess(userInfo))

console.log({ userInfo });

//----> Default config options
const defaultOptions = {
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
};

//----> Create instance
const instance = axios.create(defaultOptions);

//----> Set the AUTH token for any request
instance.interceptors.request.use(function (config) {
  const state = store.getState();
  const token = state.auth.token;
  console.log("In interceptor : " + token);
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//----> Response interceptor.
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("In response-interceptor,  response : ", error);
    if (error.response.status === 401) {
      console.log("Invalid credentials or expired token, please login!");
      authService.updateAuthUser$(userSubInitial);
      store.dispatch(authUserSuccess(userSubInitial))
      window.location.href = "/must-login";
    } else if (error.response.status === 403) {
      console.log("You are not authorized to view this page, please login!");
      authService.updateAuthUser$(userSubInitial);
      store.dispatch(authUserSuccess(userSubInitial));
      window.location.href = "/not-allowed";
    } else {
      console.log({ error });

      console.log("Oops something went wrong, please login!");
      store.dispatch(authUserSuccess(userSubInitial));
      authService.updateAuthUser$(userSubInitial);
      window.location.href = "/login";
    }
  }
);

export default instance;
