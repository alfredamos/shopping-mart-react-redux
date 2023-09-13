/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { userService } from "../../services/user.service";
import { useNavigate, useParams } from "react-router-dom";
import UserDisplayOne from "../../components/displays/users/UserDisplayOne";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, getUserState, userError } from "../../slices/userSlice";

export function UserDeletePage() {
  const dispatch = useDispatch();
  const {user} = useSelector(getUserState);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    userService
      .getUserById(id!)
      .then((data) => {
        console.log("user-in-user-detail : ", data.user);

        dispatch(getUserById(data.user!));
      })
      .catch((error) => {
        dispatch(userError(error.message));
      });
  }, [id]);

  const backToListHandler = () => {
    navigate(-1);
  };

  const userDeleteHandler = (value: boolean) => {
    if (value) {
      userService
        .deleteUser(id!)
        .then(() => {
          navigate("/users");
        })
        .catch((error) => dispatch(userError(error.message)));
    } else {
      navigate(-1);
    }
  };
  return (
    <UserDisplayOne
      deleteHandler={userDeleteHandler}
      user={user!}
      onBackToList={backToListHandler}
    />
  );
}
