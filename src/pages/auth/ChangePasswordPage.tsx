import ChangePasswordForm from "../../components/forms/auth/ChangePasswordForm";
import { ChangePasswordDto } from "../../models/auth/change-password.model";
import { useNavigate } from "react-router-dom";
import {  useEffect, useState } from "react";
import { authService } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { authUserFailure, authUserSuccess } from "../../slices/authSlice";

function ChangePasswordPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [changePassword, setChangePassword] = useState<ChangePasswordDto>(
    {} as ChangePasswordDto
  );

  useEffect(function () {
    authService
      .currentUser()
      .then(({ data }) => setChangePassword((prev) => ({ ...prev, ...data })))
      .catch((error) => console.log(error));
  }, []);

  const changePasswordHandler = (changePasswordDto: ChangePasswordDto) => {
    console.log("changePasswordDto input : ", changePassword);
  
    authService
      .changePassword(changePasswordDto)
      .then(({data}) => {
        dispatch(authUserSuccess(data));
        authService.setAuthUser(data);
        navigate("/");
      })
      .catch((error) =>
        dispatch(authUserFailure(error.message))
      );
  };

  const onBackToList = () => {
    navigate(-1);
  };

  return (
    <ChangePasswordForm
      initialValue={changePassword}
      onChangePassword={changePasswordHandler}
      onBackToList={onBackToList}
    />
  );
}

export default ChangePasswordPage;
