import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("../features/auth/Login"));
const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
        </Routes>
    );
};

export default AuthRoutes;