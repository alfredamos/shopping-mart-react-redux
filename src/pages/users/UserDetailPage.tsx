/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { userService } from "../../services/user.service";
import { useNavigate, useParams } from "react-router-dom";
import UserDisplayOne from "../../components/displays/users/UserDisplayOne";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserById, getUserState, userError } from "../../slices/userSlice";

export function UserDetailPage() {
  const dispatch = useDispatch();
  const {user} = useSelector(getUserState);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    userService
      .getUserById(id!)
      .then((data) => {
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
        .then(({data}) => {
          dispatch(deleteUser(data.user!))
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
