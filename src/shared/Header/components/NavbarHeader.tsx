import { useMemo } from "react";
import { SearchIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { AlertIcon } from "../../icons/Alert";
import { ChatBotIcon } from "../../icons/ChatBot";
import { CheveronDownIcon } from "../../icons/CheveronDown";
import { LangIcon } from "../../icons/Lang";
import { MessagesIcon } from "../../icons/Messages";
import { SettingsIcon } from "../../icons/Settings";

const ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "الرئيسية",
  "/dashboard/clients": "الموكلين",
  "/dashboard/clients/add-client": "إضافة موكل",
  "/dashboard/case-management": "إدارة القضايا",
  "/dashboard/case-management/add-case": "إضافة قضية",
  "/dashboard/legislation-rulings": "التشريعات والأحكام",
  "/dashboard/calendar": "التقويم",
  "/dashboard/daily-schedule": "الجدول اليومي",
  "/dashboard/roll": "الرول",
  "/dashboard/documents": "المستندات",
  "/dashboard/user-tasks": "مهام المستخدم",
  "/dashboard/contracts": "العقود",
  "/dashboard/about-office": "عن المكتب",
  "/dashboard/settings": "الإعدادات",
  "/dashboard/settings/general": "الإعدادات > الإعدادات العامة",
  "/dashboard/settings/users": "الإعدادات > إدارة المستخدمين",
  "/dashboard/settings/permissions": "الإعدادات > الصلاحيات",
  "/dashboard/settings/courts": "الإعدادات > المحاكم",
  "/dashboard/settings/cases": "الإعدادات > إدارة القضايا",
  "/dashboard/settings/sessions": "الإعدادات > إدارة الجلسات",
  "/dashboard/settings/case-statuses": "الإعدادات > حالات القضايا",
  "/dashboard/settings/police-stations": "الإعدادات > المخافر",
  "/dashboard/settings/prosecutions": "الإعدادات > النيابات",
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

const LINK_SIZE = "h-8 w-8 md:h-10 md:w-10 xl:h-12 xl:w-12";
const ICON_CLASSES = "h-4 w-4 md:h-5 md:w-5 xl:h-6 xl:w-6";

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
    if (pathname.includes("/dashboard/settings/permissions/"))
      return "الإعدادات > الصلاحيات";
    if (pathname.startsWith("/dashboard/reports/")) return "التقارير";
    if (pathname.startsWith("/dashboard/users/")) return "المستخدمين";
    if (pathname.startsWith("/dashboard/finance/")) return "المالية";

    return "لوحة التحكم";
  }, [pathname]);

  return (
    <header className="w-full bg-white rounded-0  md:rounded-main px-6 shadow-[0_0_24px_0_rgba(21,58,77,0.16)] py-2   ">
      <div className="h-20 flex justify-between   ">
        <div className="flex flex-wrap items-center justify-between w-full  ">
          <h1 className="text-lg lg:text-lg xl:text-xl font-semibold text-secondary mb-2 md:mb-0">
            {currentTitle}
          </h1>
          <div className=" flex gap-2 md:gap-3 ">
            <Link
              to={"notifications"}
              className={`text-secondary ${LINK_SIZE} bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition`}
            >
              <AlertIcon className={ICON_CLASSES} />
            </Link>
            <Link
              to={"chat-bot"}
              className={`text-secondary ${LINK_SIZE} bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition`}
            >
              <ChatBotIcon className={ICON_CLASSES} />
            </Link>
            <Link
              to={"#"}
              className={`text-secondary ${LINK_SIZE} bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition`}
            >
              <LangIcon className={ICON_CLASSES} />
            </Link>
            <Link
              to={"messages"}
              className={`text-secondary ${LINK_SIZE} bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition`}
            >
              <MessagesIcon className={ICON_CLASSES} />
            </Link>
            <Link
              to={"settings"}
              className={`text-secondary ${LINK_SIZE} bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition`}
            >
              <SettingsIcon className={ICON_CLASSES} />
            </Link>
            <Link
              to={"global-search"}
              className={`text-secondary ${LINK_SIZE} bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition`}
            >
              <SearchIcon className={ICON_CLASSES} />
            </Link>

            <Link to={"profile"} className="flex items-center gap-2 ">
              <div
                className={`text-secondary ${LINK_SIZE} bg-secondary/8 flex justify-center items-center 
                rounded-full overflow-hidden border border-secondary`}
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
