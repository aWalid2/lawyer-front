import { lazy } from "react";
import { Route, Routes } from "react-router-dom";

const ReportsClients = lazy(() => import("../pages/dashboard/reports/ReportsClients"));
const ReportsCases = lazy(() => import("../pages/dashboard/reports/ReportsCases"));
const ReportsSitting = lazy(() => import("../pages/dashboard/reports/ReportsSitting"));
const ReportsUsers = lazy(() => import("../pages/dashboard/reports/ReportsUsers"));
const ReportsExpenses = lazy(() => import("../pages/dashboard/reports/ReportsExpenses"));
const ReportsPayments = lazy(() => import("../pages/dashboard/reports/ReportsPayments"));

const ReportRoutes = () => {
  return (
    <Routes>
      <Route path="clients" element={<ReportsClients />} />
      <Route path="cases" element={<ReportsCases />} />
      <Route path="sitting" element={<ReportsSitting />} />
      <Route path="users" element={<ReportsUsers />} />
      <Route path="expenses" element={<ReportsExpenses />} />
      <Route path="payments" element={<ReportsPayments />} />
    </Routes>
  );
};

export default ReportRoutes;
