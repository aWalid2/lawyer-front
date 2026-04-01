import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import Loading from "./shared/Loading.tsx";
import ScrollToTop from "./shared/ScrollToTop.tsx";
import { LegislationDetails } from "./features/Legislation/components/LegislationDetails.tsx";
import { Toaster } from "sonner";

import PrivateRoute from "./pages/PrivateRoute.tsx";

// Modular Routes
const AuthRoutes = lazy(() => import("./routes/Auth.tsx"));
const CaseRoutes = lazy(() => import("./routes/CaseRoutes"));
const SettingRoutes = lazy(() => import("./routes/SettingRoutes"));
const ReportRoutes = lazy(() => import("./routes/ReportRoutes"));
const UserRoutes = lazy(() => import("./routes/UserRoutes"));
const FinanceRoutes = lazy(() => import("./routes/FinanceRoutes"));

const Notifications = lazy(() => import("./pages/dashboard/Notifications"));
const ChatBot = lazy(() => import("./pages/dashboard/ChatBot"));
const Messages = lazy(() => import("./pages/dashboard/Messages"));
const Profile = lazy(() => import("./pages/dashboard/Profile"));

const DashboardHome = lazy(() => import("./pages/dashboard/DashboardHome"));
const Clients = lazy(() => import("./pages/dashboard/clients/Clients"));
const AddClient = lazy(() => import("./pages/dashboard/clients/AddClient"));
const ClientDetails = lazy(
  () => import("./pages/dashboard/clients/ClientDetails"),
);
const Legislation = lazy(() => import("./pages/dashboard/Legislation"));
const Calendar = lazy(() => import("./pages/dashboard/Calendar"));
const DailySchedule = lazy(() => import("./pages/dashboard/DailySchedule"));
const Roll = lazy(() => import("./pages/dashboard/Roll"));
const Documents = lazy(() => import("./pages/dashboard/Documents"));
const DocumentDetails = lazy(() => import("./pages/dashboard/DocumentDetails"));
const UserTasks = lazy(() => import("./pages/dashboard/UserTasks"));
const UserTasksDetails = lazy(
  () => import("./pages/dashboard/UserTasksDetails.tsx"),
);
const Consultations = lazy(() => import("./pages/dashboard/Consultations"));
const ConsultationDetails = lazy(
  () => import("./pages/dashboard/ConsultationDetails"),
);
const Contracts = lazy(() => import("./pages/dashboard/Contracts"));
const AboutOffice = lazy(() => import("./pages/dashboard/AboutOffice"));
const GlobalSearch = lazy(() => import("./features/GlobalSearch"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Toaster position="top-right" richColors />

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />

        <Route path="/auth/*" element={<AuthRoutes />} />

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route path="notifications" element={<Notifications />} />
            <Route path="chat-bot" element={<ChatBot />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<Profile />} />
            <Route path="global-search" element={<GlobalSearch />} />

            <Route index element={<DashboardHome />} />

            <Route path="clients" element={<Clients />} />
            <Route path="clients/add-client" element={<AddClient />} />
            <Route path="clients/:id" element={<ClientDetails />} />

            <Route path="case-management/*" element={<CaseRoutes />} />

            <Route path="legislation-rulings" element={<Legislation />} />
            <Route
              path="/dashboard/legislations/:id"
              element={<LegislationDetails />}
            />
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

            <Route path="reports/*" element={<ReportRoutes />} />

            <Route path="users/*" element={<UserRoutes />} />

            <Route path="finance/*" element={<FinanceRoutes />} />
          </Route>
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
