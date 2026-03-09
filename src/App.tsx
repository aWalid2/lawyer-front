import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Loading from "./components/shared/Loading";

//Header routes
const Notifications = lazy(() => import("./pages/dashboard/Notifications"));
const ChatBot = lazy(() => import("./pages/dashboard/ChatBot"));
const Messages = lazy(() => import("./pages/dashboard/Messages"));
const Profile = lazy(() => import("./pages/dashboard/Profile"));

// Main pages
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const Clients = lazy(() => import("./pages/dashboard/clients/Clients"));
const CaseMangement = lazy(() => import("./pages/dashboard/cases/CaseMangement"));
const Legislation = lazy(() => import("./pages/dashboard/Legislation"));
const Calendar = lazy(() => import("./pages/dashboard/Calendar"));
const Roll = lazy(() => import("./pages/dashboard/Roll"));
const Documents = lazy(() => import("./pages/dashboard/Documents"));
const UserTasks = lazy(() => import("./pages/dashboard/UserTasks"));
const UserTasksDetails = lazy(() => import("./pages/dashboard/UserTasksDetails.tsx"));
const Consultations = lazy(() => import("./pages/dashboard/Consultations"));
const Contracts = lazy(() => import("./pages/dashboard/Contracts"));
const AboutOffice = lazy(() => import("./pages/dashboard/AboutOffice"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const AddCase = lazy(() => import("./pages/dashboard/cases/AddCase"));
const CaseDetails = lazy(() => import("./pages/dashboard/cases/CaseDetails"));
const CaseInfo = lazy(() => import("./features/cases-mangement/CaseInfo"));
const Sessions = lazy(() => import("./pages/dashboard/caseInfo/Sessions"));
const RelatedCases = lazy(() => import("./pages/dashboard/caseInfo/RelatedCases"));
const CaseDocuments = lazy(() => import("./pages/dashboard/caseInfo/Documents"));
const Expenses = lazy(() => import("./pages/dashboard/caseInfo/Expenses"));
const Procedures = lazy(() => import("./pages/dashboard/caseInfo/Procedures"));
const Employees = lazy(() => import("./pages/dashboard/caseInfo/Employees"));

// Reports
const ReportsClients = lazy(() => import("./pages/dashboard/reports/ReportsClients"));
const ReportsCases = lazy(() => import("./pages/dashboard/reports/ReportsCases"));
const ReportsSitting = lazy(() => import("./pages/dashboard/reports/ReportsSitting"));
const ReportsUsers = lazy(() => import("./pages/dashboard/reports/ReportsUsers"));
const ReportsExpenses = lazy(() => import("./pages/dashboard/reports/ReportsExpenses"));
const ReportsPayments = lazy(() => import("./pages/dashboard/reports/ReportsPayments"));

// Users
const UsersClients = lazy(() => import("./pages/dashboard/users/UsersClients"));
const UsersLawyers = lazy(() => import("./pages/dashboard/users/UsersLawyers"));
const UsersEmployees = lazy(() => import("./pages/dashboard/users/UsersEmployees"));

// Finance
const FinanceExpenses = lazy(() => import("./pages/dashboard/finance/FinanceExpenses"));
const FinancePayments = lazy(() => import("./pages/dashboard/finance/FinancePayments"));
const AddClient = lazy(() => import("./pages/dashboard/clients/AddClient"));
const ClientDetails = lazy(() => import("./pages/dashboard/clients/ClientDetails"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
          <Route path="clients/:id" element={<ClientDetails />} />
          <Route path="case-management" element={<CaseMangement />} />
          <Route path="case-management/add-case" element={<AddCase />} />
          <Route path="case-management/:id" element={<CaseDetails />}>
            <Route index element={<CaseInfo />} />
            <Route path="sessions" element={<Sessions />} />
            <Route path="related" element={<RelatedCases />} />
            <Route path="documents" element={<CaseDocuments />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="procedures" element={<Procedures />} />
            <Route path="employees" element={<Employees />} />
          </Route>
          <Route path="legislation-rulings" element={<Legislation />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="roll" element={<Roll />} />
          <Route path="documents" element={<Documents />} />
          <Route path="user-tasks" element={<UserTasks />} />
          <Route path="user-tasks/:id" element={<UserTasksDetails />} />
          <Route path="consultaions" element={<Consultations />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="client-details/:id" element={<ClientDetails />} />
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
    </Suspense>
  );
}

export default App;

