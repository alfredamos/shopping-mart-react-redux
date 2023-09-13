import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserRoleDto } from "../../models/auth/user-role.model";
import { userService } from "../../services/user.service";
import UserRoleForm from "../../components/forms/auth/UserRoleForm";
import { authService } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { getUserById, userError } from "../../slices/userSlice";
import { authUserSuccess } from "../../slices/authSlice";

export function RoleUpdatePage() {
  const dispatch = useDispatch();
  //const {user} = useSelector(getUserState);

  const [userRoleUpdate, setUserRoleUpdate] = useState(new UserRoleDto());

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    userService
      .getUserById(id!)
      .then((data) => {
        console.log("userRoleUpdate-in-userRoleUpdate-detail : ", userRoleUpdate);
        setUserRoleUpdate((prev: UserRoleDto) => ({ ...prev, 
          name: data.user?.name,
          email: data.user?.email,
          phone: data.user?.phone,
          gender: data.user?.gender,
          role: data.user?.role,
         }) as UserRoleDto); 
        dispatch(getUserById(data.user!));
      })
      .catch((error) => {
        dispatch(userError(error.message));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function userRoleUpdateHandler(userDto: UserRoleDto){
    console.log("user-info, user : ", userDto)
    authService.changeUserRole(userDto)
      .then((data) => {
        dispatch(authUserSuccess(data))
        navigate("/users");
      })
      .catch((error) => {
        dispatch(userError(error.message));
      });
  }

  const backToListHandler = () => {
    navigate("/users");
  };
  return (
    <UserRoleForm
    initialValue={userRoleUpdate}
    onBackToList={backToListHandler}
    onUserRole={userRoleUpdateHandler}
    />
  )
}
