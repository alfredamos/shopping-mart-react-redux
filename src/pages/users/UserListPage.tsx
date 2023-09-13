/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { UserDto } from "../../models/auth/user.model";
import { userService } from "../../services/user.service";
import UsersTable from "../../components/displays/users/UsersTable";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, getUserState, userError } from "../../slices/userSlice";

export function UserListPage() {
 const dispatch = useDispatch();
 const {users} = useSelector(getUserState);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")!) as UserDto[];
    if (users && users.length > 0) {
      dispatch(getAllUsers(users));
    } else {
      userService
        .getAllUsers()
        .then((data) => {
          userService.updateUsers$(data.users!);
          dispatch(getAllUsers(data.users!));
        })
        .catch((error) => {
          dispatch(userError(error.message));
        });
    }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-6 mt-5">
          <UsersTable users={users!} />
        </div>
        <div className="col-sm-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
