import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const token = Cookies.get("access_token");
    if (!token) return <Navigate to="/auth/login" replace />;
    return <Outlet />;
};

export default PrivateRoute;