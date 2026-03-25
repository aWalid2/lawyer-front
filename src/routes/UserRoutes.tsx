import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const UsersClients = lazy(() => import("../pages/dashboard/users/UsersClients"));
const UsersLawyers = lazy(() => import("../pages/dashboard/users/UsersLawyers"));
const UsersEmployees = lazy(() => import("../pages/dashboard/users/UsersEmployees"));
const LawyerDetail = lazy(() => import("../features/users/users-lawyers/lawyers/LawyerDetail.tsx"));
const EmployeeDetail = lazy(() => import("../features/users/users-employees/employees/EmployeeDetail.tsx"));

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="clients" element={<UsersClients />} />
      <Route path="lawyers" element={<UsersLawyers />} />
      <Route path="lawyers/:id" element={<LawyerDetail />} />
      <Route path="employees" element={<UsersEmployees />} />
      <Route path="employees/:id" element={<EmployeeDetail />} />
    </Routes>
  );
};

export default UserRoutes;
