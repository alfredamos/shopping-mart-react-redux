import LoginForm from "../../components/forms/auth/LoginForm";
import { LoginDto } from "../../models/auth/login.model";
import { useNavigate } from "react-router-dom";
import { authService } from "../../services/auth.service";
import { useDispatch } from "react-redux";
import { authUserFailure, authUserSuccess } from "../../slices/authSlice";

const initialValue: LoginDto = {
  email: "",
  password: "",
};

function AuthPage(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const loginHandler = (loginDto: LoginDto) => {   
    authService
      .login(loginDto)
      .then((data) => {
        console.log({ data });
        localStorage.setItem("authApiRes", JSON.stringify(data))
        dispatch(authUserSuccess(data));
        navigate("/products");
      })
      .catch((error) =>
        dispatch(authUserFailure(error.message))
      );
  };

  const onBackToList = () => {
    navigate("/");
  };

  return (
    <LoginForm
      initialValue={initialValue}
      onLogin={loginHandler}
      onBackToList={onBackToList}
    />
  );
}

export default AuthPage;
