import SignupForm from "../../components/forms/auth/SignupForm";
import { SignupDto } from "../../models/auth/signup.model";
import { useNavigate } from "react-router-dom";
import { userService } from "../../services/user.service";
import { useDispatch } from "react-redux";
import { addUser, userError } from "../../slices/userSlice";

function UserCreatePage(): JSX.Element {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signupHandler = (signupDto: SignupDto) => {
    userService
      .createUser(signupDto)
      .then(({ data }) => {
        dispatch(addUser(data.user!));
        userService.updateWithOneUser$(data.user!);
        navigate("/users");
      })
      .catch((error) =>
        dispatch(userError(error.message))
      );
  };

  const onBackToList = () => {
    navigate(-1);
  };

  return (
    <SignupForm
      formName="User Create"
      initialValue={new SignupDto()}
      onSignup={signupHandler}
      onBackToList={onBackToList}
    />
  );
}

export default UserCreatePage;
