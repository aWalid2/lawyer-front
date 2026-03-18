import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Loading from "./components/shared/Loading";
import LawyerDetail from "./features/users/users-lawyers/lawyers/LawyerDetail.tsx";
import ScrollToTop from "./components/shared/ScrollToTop";

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
const ConsultationDetails = lazy(() => import("./pages/dashboard/ConsultationDetails"));
const Contracts = lazy(() => import("./pages/dashboard/Contracts"));
const AboutOffice = lazy(() => import("./pages/dashboard/AboutOffice"));
const Settings = lazy(() => import("./pages/dashboard/Settings"));
const GeneralSettings = lazy(() => import("./pages/dashboard/settings/GeneralSettings"));
const UserManagement = lazy(() => import("./pages/dashboard/settings/UserManagement"));
const Permissions = lazy(() => import("./pages/dashboard/settings/Permissions"));
const AddRole = lazy(() => import("./pages/dashboard/settings/AddRole"));
const Courts = lazy(() => import("./pages/dashboard/settings/Courts"));
const CaseManagementSettings = lazy(() => import("./pages/dashboard/settings/CaseManagementSettings"));
const SessionManagement = lazy(() => import("./pages/dashboard/settings/SessionManagement"));
const CaseStatuses = lazy(() => import("./pages/dashboard/settings/CaseStatuses"));
const PoliceStations = lazy(() => import("./pages/dashboard/settings/PoliceStations"));
const PublicProsecutions = lazy(() => import("./pages/dashboard/settings/PublicProsecutions"));
const DocumentDetails = lazy(() => import("./pages/dashboard/DocumentDetails"));

const AddCase = lazy(() => import("./pages/dashboard/cases/AddCase"));
const CaseDetails = lazy(() => import("./pages/dashboard/cases/CaseDetails"));
const CaseInfo = lazy(() => import("./features/cases-mangement/CaseInfo"));
const Sessions = lazy(() => import("./pages/dashboard/caseinfo/Sessions"));
const RelatedCases = lazy(() => import("./pages/dashboard/caseinfo/RelatedCases"));
const CaseDocuments = lazy(() => import("./pages/dashboard/caseinfo/Documents"));
const Expenses = lazy(() => import("./pages/dashboard/caseinfo/Expenses"));
const Procedures = lazy(() => import("./pages/dashboard/caseinfo/Procedures"));
const Employees = lazy(() => import("./pages/dashboard/caseinfo/Employees"));
const EmployeeDetails = lazy(() => import("./pages/dashboard/caseinfo/EmployeeDetails"));
const CaseDocumentDetails = lazy(() => import("@/features/cases-mangement/Documents/components/CaseDocumentDetails").then(m => ({ default: m.CaseDocumentDetails })));

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
const EmployeeDetail = lazy(() => import("./features/users/users-employees/employees/EmployeeDetail.tsx"))


// Finance
const FinanceExpenses = lazy(() => import("./pages/dashboard/finance/FinanceExpenses"));
const FinancePayments = lazy(() => import("./pages/dashboard/finance/FinancePayments"));
const AddClient = lazy(() => import("./pages/dashboard/clients/AddClient"));
const ClientDetails = lazy(() => import("./pages/dashboard/clients/ClientDetails"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <ScrollToTop />
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
            <Route path="documents/:docId" element={<CaseDocumentDetails />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="procedures" element={<Procedures />} />
            <Route path="employees" element={<Employees />} />
            <Route path="employees/:employeeId" element={<EmployeeDetails />} />
          </Route>
          <Route path="legislation-rulings" element={<Legislation />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="roll" element={<Roll />} />
          <Route path="documents" element={<Documents />} />
          <Route path="documents/:id" element={<DocumentDetails />} />
          <Route path="user-tasks" element={<UserTasks />} />
          <Route path="user-tasks/:id" element={<UserTasksDetails />} />
          <Route path="consultations" element={<Consultations />} />
          <Route path="consultations/:id" element={<ConsultationDetails />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="client-details/:id" element={<ClientDetails />} />
          <Route path="about-office" element={<AboutOffice />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/general" element={<GeneralSettings />} />
          <Route path="settings/users" element={<UserManagement />} />
          <Route path="settings/permissions" element={<Permissions />} />
          <Route path="settings/permissions/add" element={<AddRole />} />
          <Route path="settings/permissions/:id" element={<AddRole />} />
          <Route path="settings/courts" element={<Courts />} />
          <Route path="settings/cases" element={<CaseManagementSettings />} />
          <Route path="settings/sessions" element={<SessionManagement />} />
          <Route path="settings/case-statuses" element={<CaseStatuses />} />
          <Route path="settings/police-stations" element={<PoliceStations />} />
          <Route path="settings/prosecutions" element={<PublicProsecutions />} />
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
            <Route path="lawyers/:id" element={<LawyerDetail />} />
            <Route path="employees" element={<UsersEmployees />} />
            <Route path="employees/:id" element={<EmployeeDetail />} />
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

