import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { userService } from "../../services/user.service";
import EditProfileForm from "../../components/forms/auth/EditProfileForm";
import { UserDto } from "../../models/auth/user.model";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, getUserState, updateUser, userError } from "../../slices/userSlice";

export function UserEditPage() {
 const dispatch = useDispatch();
 const {user} = useSelector(getUserState);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    userService
      .getUserById(id!)
      .then((data) => {
        console.log("user-in-user-detail : ", user);
        //setUser((prev) => ({ ...prev, ...data.user }));
        dispatch(getUserById(data.user!));
      })
      .catch((error) => {
        dispatch(userError(error.message));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const userEditHandler = (userDto: UserDto) => {
    userService
      .editUser(userDto)
      .then(({ data }) => {
        console.log("user-in-user-edit : ", data.user);

        dispatch(updateUser(data.user!));
        navigate("/users");
      })
      .catch((error) => {
        dispatch(userError(error.message));
      });
  };

  const backToListHandler = () => {
    navigate("/users");
  };

  return (
    <EditProfileForm
      formName="Edit Profile"
      initialValue={user!}
      onEditProfile={userEditHandler}
      onBackToList={backToListHandler}
    />
  );
}
