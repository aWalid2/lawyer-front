// export default App;
import { Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

//Header routes
import Notifications from "./pages/dashboard/Notifications";
import ChatBot from "./pages/dashboard/ChatBot";
import Messages from "./pages/dashboard/Messages";
import Profile from "./pages/dashboard/Profile";

// Main pages
import DashboardHome from "./pages/dashboard/DashboardHome";
import Clients from "./pages/dashboard/Clients";
import CaseMangement from "./pages/dashboard/CaseMangement";
import Legislation from "./pages/dashboard/Legislation";
import Calendar from "./pages/dashboard/Calendar";
import Roll from "./pages/dashboard/Roll";
import Documents from "./pages/dashboard/Documents";
import UserTasks from "./pages/dashboard/UserTasks";
import Consultations from "./pages/dashboard/Consultations";
import Contracts from "./pages/dashboard/Contracts";
import AboutOffice from "./pages/dashboard/AboutOffice";
import Settings from "./pages/dashboard/Settings";

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
import AddClient from "./components/clients/addclient/AddClient";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Header routes */}
        <Route path="notifications" element={<Notifications />} />
        <Route path="chat-bot" element={<ChatBot />} />
        <Route path="messages" element={<Messages />} />
        <Route path="profile" element={<Profile />} />

        {/* Dashboard Home */}
        <Route index element={<DashboardHome />} />

        {/* Main Routes */}
        <Route path="clients" element={<Clients />} />
        <Route path="clients/add-client" element={<AddClient />} />
        <Route path="case-management" element={<CaseMangement />} />
        <Route path="legislation-rulings" element={<Legislation />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="roll" element={<Roll />} />
        <Route path="documents" element={<Documents />} />
        <Route path="user-tasks" element={<UserTasks />} />
        <Route path="consultaions" element={<Consultations />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="contracts" element={<Contracts />} />
        <Route path="about-office" element={<AboutOffice />} />
        <Route path="settings" element={<Settings />} />

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
