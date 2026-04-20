import Header from "@/shared/Header";
import SidebarDashboard from "@/features/dashboard/components/SidebarDashboard";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (

    <div

      className="flex p-0 gap-0 h-full min-h-screen relative
             bg-[url('/images/background.png')] 
             bg-cover bg-center bg-no-repeat
             md:p-6 md:gap-6 container "
    >

      <SidebarDashboard />

      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
