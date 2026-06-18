import { useMemo } from "react";
import { LogOut, SearchIcon, Sun, Moon, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { AlertIcon } from "../../icons/Alert";
import { ChatBotIcon } from "../../icons/ChatBot";
import { CheveronDownIcon } from "../../icons/CheveronDown";
import { MessagesIcon } from "../../icons/Messages";
import { SettingsIcon } from "../../icons/Settings";
import { useAuth } from "@/shared/context/AuthContext";
import { useGetNotifications } from "@/features/Notifications/api/hooks/useGetNotifications";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ROUTE_TITLES: Record<string, string> = {
  "/dashboard": "الرئيسية",
  "/dashboard/clients": "الموكلين",
  "/dashboard/clients/add-client": "إضافة موكل",
  "/dashboard/case-management": "إدارة القضايا",
  "/dashboard/case-management/add-case": "إضافة قضية",
  "/dashboard/legislation-rulings": "التشريعات والأحكام",
  "/dashboard/calendar": "التقويم",
  "/dashboard/daily-schedule": "الجدول اليومي",
  "/dashboard/roll": "رول الجلسات",
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

  "/dashboard/finance": "المالية",
  "/dashboard/finance/expences": "المالية > المصروفات",
  "/dashboard/finance/payments": "المالية > المدفوعات",
};

const LINK_SIZE = "h-8 w-8 md:h-10 md:w-10 xl:h-12 xl:w-12";
const ICON_CLASSES = "h-4 w-4 md:h-5 md:w-5 xl:h-6 xl:w-6";

const getUserDisplayName = (user: Record<string, unknown> | null) => {
  const candidateKeys = ["name", "full_name", "username", "email", "role"];

  for (const key of candidateKeys) {
    const value = user?.[key];
    if (typeof value === "string" && value.trim()) {
      if (key === "email") {
        return value.split("@")[0] || value;
      }

      return value;
    }
  }

  return "المستخدم";
};

export default function NavbarHeader() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const { user, logout } = useAuth();

  const userId = (user?.sub as number | string) || 3;
  const { data: apiNotifications } = useGetNotifications(userId);

  const unreadCount = useMemo(() => {
    if (!apiNotifications) return 0;
    return apiNotifications.filter((n: any) => !n.is_read).length;
  }, [apiNotifications]);

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

  const displayName = useMemo(() => getUserDisplayName(user), [user]);

  const handleLogout = () => {
    logout();
    toast.success("تم تسجيل الخروج بنجاح");
    navigate("/auth/login", { replace: true });
  };

  return (
    <header className="dark:bg-backgroundDark rounded-0 md:rounded-main h-fit w-full bg-white px-6 py-2 shadow-[0_0_24px_0_rgba(21,58,77,0.16)]">
      <div className="flex min-h-20 justify-between">
        <div className="flex w-full flex-wrap items-center justify-between">
          <h1 className="text-secondary mb-2 text-lg font-semibold md:mb-0 lg:text-lg xl:text-xl dark:text-white">
            {currentTitle}
          </h1>
          <div className="flex flex-wrap gap-2 md:gap-3">
            <Link
              to={"global-search"}
              className={`text-secondary dark:text-white ${LINK_SIZE} bg-secondary/8 hover:bg-secondary flex items-center justify-center rounded-full transition hover:text-white dark:bg-white/10 dark:hover:bg-white/20`}
            >
              <SearchIcon className={ICON_CLASSES} />
            </Link>
            <Link
              to={"settings"}
              className={`text-secondary dark:text-white ${LINK_SIZE} bg-secondary/8 hover:bg-secondary flex items-center justify-center rounded-full transition hover:text-white dark:bg-white/10 dark:hover:bg-white/20`}
            >
              <SettingsIcon className={ICON_CLASSES} />
            </Link>
            <Link
              to={"chat-bot"}
              className={`text-secondary dark:text-white ${LINK_SIZE} bg-secondary/8 hover:bg-secondary flex items-center justify-center rounded-full transition hover:text-white dark:bg-white/10 dark:hover:bg-white/20`}
            >
              <ChatBotIcon className={ICON_CLASSES} />
            </Link>

            <Link
              to={"messages"}
              className={`text-secondary dark:text-white ${LINK_SIZE} bg-secondary/8 hover:bg-secondary flex items-center justify-center rounded-full transition hover:text-white dark:bg-white/10 dark:hover:bg-white/20`}
            >
              <MessagesIcon className={ICON_CLASSES} />
            </Link>
            <Link
              to={"notifications"}
              className={`text-secondary relative dark:text-white ${LINK_SIZE} bg-secondary/8 hover:bg-secondary flex items-center justify-center rounded-full transition hover:text-white dark:bg-white/10 dark:hover:bg-white/20`}
            >
              <AlertIcon className={ICON_CLASSES} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow">
                  {unreadCount > 9 ? "+9" : unreadCount}
                </span>
              )}
            </Link>

            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 outline-none md:gap-3">
                  <CheveronDownIcon className="h-3 w-3 sm:h-5 sm:w-5" />
                  <span className="flex items-center gap-2 dark:text-white">
                    <p className="max-w-32 truncate">{displayName}</p>
                    <div
                      className={`text-secondary dark:text-white ${LINK_SIZE} bg-primary border-secondary flex items-center justify-center overflow-hidden rounded-full border dark:border-white/20 dark:bg-white/10`}
                    >
                      <img
                        src="/images/user-placeholder.webp"
                        alt="User avatar"
                        className="block h-full w-full object-contain"
                      />
                    </div>
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem
                  onClick={() => navigate("profile")}
                  className="gap-3"
                >
                  <User className="h-4 w-4" />
                  <span>الملف الشخصي</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="gap-3"
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  <span>
                    {theme === "dark" ? "الوضع النهاري" : "الوضع الليلي"}
                  </span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="gap-3 text-red-600 focus:text-red-600 dark:text-red-300 dark:focus:text-red-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
