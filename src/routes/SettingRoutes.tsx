import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Settings = lazy(() => import("../pages/dashboard/Settings"));
const GeneralSettings = lazy(() => import("../pages/dashboard/settings/GeneralSettings"));
const UserManagement = lazy(() => import("../pages/dashboard/settings/UserManagement"));
const Permissions = lazy(() => import("../pages/dashboard/settings/Permissions"));
const AddRole = lazy(() => import("../pages/dashboard/settings/AddRole"));
const Courts = lazy(() => import("../pages/dashboard/settings/Courts"));
const CaseManagementSettings = lazy(() => import("../pages/dashboard/settings/CaseManagementSettings"));
const SessionManagement = lazy(() => import("../pages/dashboard/settings/SessionManagement"));
const CaseStatuses = lazy(() => import("../pages/dashboard/settings/CaseStatuses"));
const PoliceStations = lazy(() => import("../pages/dashboard/settings/PoliceStations"));
const PublicProsecutions = lazy(() => import("../pages/dashboard/settings/PublicProsecutions"));

const SettingRoutes = () => {
  return (
    <Routes>
      <Route index element={<Settings />} />
      <Route path="general" element={<GeneralSettings />} />
      <Route path="users" element={<UserManagement />} />
      <Route path="permissions" element={<Permissions />} />
      <Route path="permissions/add" element={<AddRole />} />
      <Route path="permissions/:id" element={<AddRole />} />
      <Route path="courts" element={<Courts />} />
      <Route path="cases" element={<CaseManagementSettings />} />
      <Route path="sessions" element={<SessionManagement />} />
      <Route path="case-statuses" element={<CaseStatuses />} />
      <Route path="police-stations" element={<PoliceStations />} />
      <Route path="prosecutions" element={<PublicProsecutions />} />
    </Routes>
  );
};

export default SettingRoutes;
