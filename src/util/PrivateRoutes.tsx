import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import { useSelector } from "react-redux";
import { getAuthState } from "../slices/authSlice";

export function PrivateRoutes() {
  const { isLoggedIn } = useSelector(getAuthState);

  if (!isLoggedIn) return <Navigate replace to="/must-login" />;

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
