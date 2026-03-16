import { useMemo } from "react";
import { SearchIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AlertIcon } from "../../icons/Alert";
import { ChatBotIcon } from "../../icons/ChatBot";
import { CheveronDownIcon } from "../../icons/CheveronDown";
import { LangIcon } from "../../icons/Lang";
import { MessagesIcon } from "../../icons/Messages";

const ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "الرئيسية",
  "/dashboard/clients": "الموكلين",
  "/dashboard/clients/add-client": "إضافة موكل",
  "/dashboard/case-management": "إدارة القضايا",
  "/dashboard/case-management/add-case": "إضافة قضية",
  "/dashboard/legislation-rulings": "التشريعات والأحكام",
  "/dashboard/calendar": "التقويم",
  "/dashboard/roll": "الرول",
  "/dashboard/documents": "المستندات",
  "/dashboard/user-tasks": "مهام المستخدم",
  "/dashboard/contracts": "العقود",
  "/dashboard/about-office": "عن المكتب",
  "/dashboard/settings": "الإعدادات",
  "/dashboard/notifications": "الإشعارات",
  "/dashboard/chat-bot": "المساعد الذكي",
  "/dashboard/messages": "الرسائل",
  "/dashboard/profile": "الملف الشخصي",


  //consultations
  "/dashboard/consultations": "الاستشارات",

  // Reports
  "/dashboard/reports": "التقارير",
  "/dashboard/reports/clients": "التقارير > تقارير الموكلين",
  "/dashboard/reports/cases": "التقارير > تقارير القضايا",
  "/dashboard/reports/sitting": "التقارير > تقارير الجلسات",
  "/dashboard/reports/users": "التقارير > تقارير المستخدمين",
  "/dashboard/reports/expenses": "التقارير > تقارير المصروفات",
  "/dashboard/reports/payments": "التقارير > تقارير المدفوعات",

  // Users
  "/dashboard/users": "المستخدمين",
  "/dashboard/users/clients": "المستخدمين > الموكلين",
  "/dashboard/users/lawyers": "المستخدمين > المحامين",
  "/dashboard/users/employees": "المستخدمين > الموظفين",

  // Finance
  "/dashboard/finance": "المالية",
  "/dashboard/finance/expences": "المالية > المصروفات",
  "/dashboard/finance/payments": "المالية > المدفوعات",
};

export default function NavbarHeader() {
  const { pathname } = useLocation();

  const currentTitle = useMemo(() => {
    if (ROUTE_TITLES[pathname]) return ROUTE_TITLES[pathname];

    if (pathname.includes("/dashboard/consultations/"))
      return "الاستشارات > تفاصيل الاستشارة";
    if (pathname.includes("/dashboard/clients/"))
      return "الموكلين > تفاصيل الموكل";
    if (pathname.includes("/dashboard/case-management/"))
      return "إدارة القضايا > تفاصيل القضية";
    if (pathname.startsWith("/dashboard/reports/")) return "التقارير";
    if (pathname.startsWith("/dashboard/users/")) return "المستخدمين";
    if (pathname.startsWith("/dashboard/finance/")) return "المالية";

    return "لوحة التحكم";
  }, [pathname]);

  return (
    <header className="w-full bg-white rounded-0  md:rounded-main px-6 shadow-[0_0_24px_0_rgba(21,58,77,0.16)]   ">
      <div className="h-20 flex justify-between   ">
        <div className="flex flex-wrap items-center justify-between w-full  ">
          <h1 className="text-xl font-semibold text-secondary">
            {currentTitle}
          </h1>
          <div className=" flex gap-3">
            <Link
              to={"notifications"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <AlertIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to={"chat-bot"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <ChatBotIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to={"#"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <LangIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to={"messages"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <MessagesIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to={"legislation-rulings"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <SearchIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>

            <Link to={"profile"} className="flex items-center gap-2 ">
              <div
                className="text-secondary h-6 w-6 sm:h-12 sm:w-12 
                bg-secondary/8 flex justify-center items-center 
                rounded-full overflow-hidden border border-secondary"
              >
                <img
                  src="/images/user-placeholder.jpg"
                  alt="User avatar"
                  className="block w-full h-full object-contain "
                />
              </div>
              <p> علاء</p>

              <CheveronDownIcon className={`h-3 w-3 sm:h-5 sm:w-5`} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
