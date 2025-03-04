import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = (): boolean => {
  return Boolean(localStorage.getItem("token"));
};

export function PrivateRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />;
}
