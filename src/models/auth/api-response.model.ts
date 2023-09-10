import { UserDetail } from "./user-detail.model";
import { Role } from "./user-type.model";

export class AuthApiResponse{
  user?: UserDetail = new UserDetail();
  message: string = "";
  token: string = "";
  isLoggedIn: boolean = false;
  role?: Role = Role.Customer;
}