// export default App;
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

// Main pages
import DashboardHome from "./pages/dashboard/DashboardHome";
import Clients from "./pages/dashboard/Clients";
import CaseMangement from "./pages/dashboard/CaseMangement";

// Reports
import ReportsClients from "./pages/dashboard/reports/ReportsClients";
import ReportsCases from "./pages/dashboard/reports/ReportsCases";
import ReportsSitting from "./pages/dashboard/reports/ReportsSitting";
import ReportsUsers from "./pages/dashboard/reports/ReportsUsers";
import ReportsExpenses from "./pages/dashboard/reports/ReportsExpenses";
import ReportsPayments from "./pages/dashboard/reports/ReportsPayments";

// Users
import UsersClients from "./pages/dashboard/users/UsersClients";
import UsersLawyers from "./pages/dashboard/users/UsersLawyers";
import UsersEmployees from "./pages/dashboard/users/UsersEmployees";

// Finance
import FinanceExpenses from "./pages/dashboard/finance/FinanceExpenses";
import FinancePayments from "./pages/dashboard/finance/FinancePayments";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Dashboard Home */}
        <Route index element={<DashboardHome />} />

        {/* Main Routes */}
        <Route path="clients" element={<Clients />} />
        <Route path="case-management" element={<CaseMangement />} />

        {/* Reports Routes */}
        <Route path="reports">
          <Route path="clients" element={<ReportsClients />} />
          <Route path="cases" element={<ReportsCases />} />
          <Route path="sitting" element={<ReportsSitting />} />
          <Route path="users" element={<ReportsUsers />} />
          <Route path="expenses" element={<ReportsExpenses />} />
          <Route path="payments" element={<ReportsPayments />} />
        </Route>

        {/* Users Routes */}
        <Route path="users">
          <Route path="clients" element={<UsersClients />} />
          <Route path="lawyers" element={<UsersLawyers />} />
          <Route path="employees" element={<UsersEmployees />} />
        </Route>

        {/* Finance Routes */}
        <Route path="finance">
          <Route path="expences" element={<FinanceExpenses />} />
          <Route path="payments" element={<FinancePayments />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
