import { UserDto } from "../models/auth/user.model";
import { UserRoleDto } from '../models/auth/user-role.model';

type Payload = UserDto[] | UserDto | UserRoleDto |string;

export class UserAction{
  constructor(public type: string, public payload: Payload){}
}