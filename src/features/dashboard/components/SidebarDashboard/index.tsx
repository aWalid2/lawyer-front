import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NavDashboard from "./components/NavDashboard";
import { LogoSidebar } from "./components/LogoSidebar";
import { useState } from "react";

const SidebarDashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <aside >
        <div className="hidden lg:block  h-fit min:h-fit w-70  dark:bg-backgroundDark bg-white md:bg-white md:min-h-screen p-4 shadow-[0_0_24px_0_rgba(21,58,77,0.16)] rounded-main   ">
          <LogoSidebar />
          <NavDashboard />
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="lg:hidden fixed top-[16%] z-50 inset-s-0 inset-e-0 bg-primary-gradient h-8 w-7 rounded-e-sm">
              <Menu className="w-5 h-5 ps-1 text-white" />
            </button>
          </SheetTrigger>
          <SheetHeader className="hidden">
            <SheetTitle>القائمة</SheetTitle>
          </SheetHeader>
          <SheetDescription className="hidden">
            قائمة التنقل الخاصة بالموقع
          </SheetDescription>

          <SheetContent side="left" className="w-83 bg-white dark:bg-backgroundDark pt-3 px-4 border-l-0">
            <div className="h-fit min:h-fit w-80 md:bg-gray-50 dark:md:bg-backgroundDark p-4   overflow-y-scroll  ">
              <LogoSidebar />
              <NavDashboard onLinkClick={() => setOpen(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </aside>
    </>
  );
};

export default SidebarDashboard;
