import Header from "@/components/shared/Header";
import Sidebar from "@/features/dashboard/components/SidebarDashboard";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex p-0 gap-0 h-full  min-h-screen bg-gray-300 md:p-6 md:gap-6">
      <Sidebar />
      <main className="flex-1  bg-gray-300   ">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
