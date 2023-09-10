import { AuthApiResponse } from "../models/auth/api-response.model";

export class AuthState {
  user!: AuthApiResponse;
  authUser?: AuthApiResponse;
  isLoading!: boolean;
  errorMessage!: string;
  isLoggedIn?: boolean;
}
