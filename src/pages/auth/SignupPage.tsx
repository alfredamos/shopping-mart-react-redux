import SignupForm from "../../components/forms/auth/SignupForm";
import { SignupDto } from "../../models/auth/signup.model";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { authUserFailure, authUserSuccess } from "../../slices/authSlice";

function SignupPage(): JSX.Element {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const signupHandler = (signupDto: SignupDto) => {
    authService
      .signup(signupDto)
      .then(({ data }) => {
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
    <SignupForm
      formName="Signup"
      initialValue={new SignupDto()}
      onSignup={signupHandler}
      onBackToList={onBackToList}
    />
  );
}

export default SignupPage;
