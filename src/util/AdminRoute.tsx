import { Navigate, Outlet } from "react-router-dom";
import { Role } from "../models/auth/user-type.model";
import { NavBar } from "./NavBar";
import { useSelector } from "react-redux";
import { getAuthState } from '../slices/authSlice';

export function AdminRoute() {
  const {role} = useSelector(getAuthState);
  const isAdmin = role === Role.Admin;

  if (!isAdmin) return <Navigate replace to="/not-allowed" />;

  return (
    <>
       <NavBar /> 
      <Outlet />
    </>
  );
}
