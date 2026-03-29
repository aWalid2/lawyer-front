import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Loading from "./components/shared/Loading";
import ScrollToTop from "./components/shared/ScrollToTop";
import { LegislationDetails } from "./features/Legislation/components/LegislationDetails.tsx";
import GlobalSearch from "./features/GlobalSearch/index.tsx";

// Modular Routes
const CaseRoutes = lazy(() => import("./routes/CaseRoutes"));
const SettingRoutes = lazy(() => import("./routes/SettingRoutes"));
const ReportRoutes = lazy(() => import("./routes/ReportRoutes"));
const UserRoutes = lazy(() => import("./routes/UserRoutes"));
const FinanceRoutes = lazy(() => import("./routes/FinanceRoutes"));

// Header routes
const Notifications = lazy(() => import("./pages/dashboard/Notifications"));
const ChatBot = lazy(() => import("./pages/dashboard/ChatBot"));
const Messages = lazy(() => import("./pages/dashboard/Messages"));
const Profile = lazy(() => import("./pages/dashboard/Profile"));

// Main pages (not moved to specific route groups)
const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const Clients = lazy(() => import("./pages/dashboard/clients/Clients"));
const AddClient = lazy(() => import("./pages/dashboard/clients/AddClient"));
const ClientDetails = lazy(() => import("./pages/dashboard/clients/ClientDetails"));
const Legislation = lazy(() => import("./pages/dashboard/Legislation"));
const Calendar = lazy(() => import("./pages/dashboard/Calendar"));
const DailySchedule = lazy(() => import("./pages/dashboard/DailySchedule"));
const Roll = lazy(() => import("./pages/dashboard/Roll"));
const Documents = lazy(() => import("./pages/dashboard/Documents"));
const DocumentDetails = lazy(() => import("./pages/dashboard/DocumentDetails"));
const UserTasks = lazy(() => import("./pages/dashboard/UserTasks"));
const UserTasksDetails = lazy(() => import("./pages/dashboard/UserTasksDetails.tsx"));
const Consultations = lazy(() => import("./pages/dashboard/Consultations"));
const ConsultationDetails = lazy(() => import("./pages/dashboard/ConsultationDetails"));
const Contracts = lazy(() => import("./pages/dashboard/Contracts"));
const AboutOffice = lazy(() => import("./pages/dashboard/AboutOffice"));

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
          <Route path="global-search" element={<GlobalSearch />} />
          {/* Dashboard Home */}
          <Route index element={<DashboardHome />} />

          {/* Main Routes */}
          <Route path="clients" element={<Clients />} />
          <Route path="clients/add-client" element={<AddClient />} />
          <Route path="clients/:id" element={<ClientDetails />} />

          <Route path="case-management/*" element={<CaseRoutes />} />

          <Route path="legislation-rulings" element={<Legislation />} />
          <Route path="/dashboard/legislations/:id" element={<LegislationDetails />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="daily-schedule" element={<DailySchedule />} />
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

          <Route path="settings/*" element={<SettingRoutes />} />

          {/* Reports Routes */}
          <Route path="reports/*" element={<ReportRoutes />} />

          {/* Users Routes */}
          <Route path="users/*" element={<UserRoutes />} />

          {/* Finance Routes */}
          <Route path="finance/*" element={<FinanceRoutes />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

