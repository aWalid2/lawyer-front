import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Login = lazy(() => import("../features/auth/Login"));
// const Register = lazy(() => import("../features/auth/Register"));
const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={<Login />} />
            {/* <Route path="register" element={<Register />} /> */}
        </Routes>
    );
};

export default AuthRoutes;