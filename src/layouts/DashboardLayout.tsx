import Header from "@/shared/Header";
import SidebarDashboard from "@/features/SidebarDashboard";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="relative container flex h-full min-h-screen gap-0 bg-[url('/images/background.png')] bg-cover bg-center bg-no-repeat p-0 md:gap-6 md:p-6">
      <SidebarDashboard />

      <main className="flex min-w-0 flex-1 flex-col">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
