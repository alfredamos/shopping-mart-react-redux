import EditProfileForm from "../../components/forms/auth/EditProfileForm";
import { EditProfileDto } from "../../models/auth/edit-profile.model";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { authService } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { authUserFailure, authUserSuccess } from "../../slices/authSlice";

function EditProfilePage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [editProfile, setEditProfile] = useState<EditProfileDto>(
    {} as EditProfileDto
  );

  useEffect(function () {
    authService
      .currentUser()
      .then(({ data }) =>
        setEditProfile((prev) => ({ ...prev, ...(data as EditProfileDto) }))
      )
      .catch((error) => console.log(error));
  }, []);

  const editProfileHandler = (editProfileDto: EditProfileDto) => {    
    authService
      .editProfile(editProfileDto)
      .then(({data}) => {
        dispatch(authUserSuccess(data));
        authService.setAuthUser(data);
      })
      .catch((error) =>
        dispatch(authUserFailure(error.message))
      );
  };

  const onBackToList = () => {
    navigate(-1);
  };

  return (
    <EditProfileForm
    formName="Edit Profile"
      initialValue={editProfile}
      onEditProfile={editProfileHandler}
      onBackToList={onBackToList}
    />
  );
}

export default EditProfilePage;
