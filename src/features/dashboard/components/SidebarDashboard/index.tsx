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

const SidebarDashboard = () => {
  return (
    <>
      <aside className=" ">
        <div className="hidden md:block h-fit min:h-fit w-70 md:bg-gray-50 md:min-h-screen p-4 border-l shadow-sm rounded-[12px]   ">
          <div className="mb-10">
            <img
              src="/public/images/logo.webp"
              alt="logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <NavDashboard />
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden fixed top-[16%] bg-white h-8 w-7 rounded-e-sm">
              <Menu className="w-6 h-6 ps-1 text-gray-700" />
            </button>
          </SheetTrigger>
          <SheetHeader className="hidden">
            <SheetTitle>القائمة</SheetTitle>
          </SheetHeader>
          <SheetDescription className="hidden">
            قائمة التنقل الخاصة بالموقع
          </SheetDescription>

          <SheetContent side="left" className="w-83 bg-white pt-3 px-4 ">
            <div className="h-fit min:h-fit w-80 md:bg-gray-50  p-4   overflow-y-scroll  ">
              <div className="flex items-center gap-3">
                <img
                  src="/public/images/logo.webp"
                  alt="logo"
                  className="h-12 w-auto object-contain"
                />
              </div>
              <NavDashboard />
            </div>
          </SheetContent>
        </Sheet>
      </aside>
    </>
  );
};

export default SidebarDashboard;
