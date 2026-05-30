import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const isTokenExpired = (token: string) => {
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp && decodedToken.exp < currentTime;
  } catch {
    return true;
  }
};

const PrivateRoute = () => {
  const token = Cookies.get("access_token");

  if (!token || isTokenExpired(token)) {
    Cookies.remove("access_token");
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
