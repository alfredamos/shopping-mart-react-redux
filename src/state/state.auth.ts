import { UserDetail } from "../models/auth/user-detail.model";
import { Role } from "../models/auth/user-type.model";

export class StateAuth{ 
  user: UserDetail = new UserDetail;
  isLoggedIn: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = "";
  token?: string = "";
  message?: string = "";
  role?: Role = Role.Customer;

}