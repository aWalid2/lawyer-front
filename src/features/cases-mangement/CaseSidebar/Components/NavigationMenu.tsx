import React from "react";
import { CaseMangementIcon } from "@/shared/icons/CaseManagement";
import { ManagmentsIcon } from "@/shared/icons/Managments";
import { ChevronDown } from "lucide-react";
import { NavLink, useParams } from "react-router-dom";
import { BarChartIcon } from "@/shared/icons/BarChart";

interface NavItem {
  label: string;
  to: string;
  icon: React.ReactNode;
  hasDropdown?: boolean;
  end?: boolean;
}

export const NavigationMenu = () => {
  const { id } = useParams<{ id: string }>();

  const navItems: NavItem[] = [
    {
      label: "معلومات القضية",
      icon: <CaseMangementIcon className="h-5 w-5" />,
      to: `/dashboard/case-management/${id}`,
      end: true,
    },
    {
      label: "إدارة الجلسات",
      icon: <ManagmentsIcon className="h-5 w-5" />,
      to: `/dashboard/case-management/${id}/sessions`,
    },
    {
      label: "القضايا المرتبطة",
      icon: <ManagmentsIcon className="h-5 w-5" />,
      to: `/dashboard/case-management/${id}/related`,
    },
    {
      label: "المستندات",
      icon: <ManagmentsIcon className="h-5 w-5" />,
      to: `/dashboard/case-management/${id}/documents`,
    },
    {
      label: "المصاريف",
      icon: <ManagmentsIcon className="h-5 w-5" />,
      to: `/dashboard/case-management/${id}/expenses`,
    },
    {
      label: "إجراءات",
      icon: <BarChartIcon className="h-5 w-5" />,
      to: `/dashboard/case-management/${id}/procedures`,
    },
    {
      label: "الموظفين",
      icon: <ManagmentsIcon className="h-5 w-5" />,
      to: `/dashboard/case-management/${id}/employees`,
    },
  ];

  return (
    <nav className="flex flex-col gap-1.5">
      {navItems.map((item, index) => (
        <NavLink
          key={index}
          to={item.to}
          end={item.end}
          className={({ isActive }) =>
            `group before:bg-primary-gradient relative isolate flex h-13.5 w-full items-center justify-between overflow-hidden rounded-[12px] p-3.5 transition-colors duration-300 before:absolute before:inset-0 before:-z-10 before:opacity-0 before:transition-opacity before:duration-300 ${
              isActive
                ? "text-white before:opacity-100"
                : "text-[#727272] hover:text-white hover:before:opacity-100"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="relative z-10 flex items-center gap-3.5">
                <span
                  className={`transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-[#727272] group-hover:text-white"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="font-cairo text-[15px] font-medium">
                  {item.label}
                </span>
              </div>
              {item.hasDropdown && (
                <ChevronDown
                  className={`relative z-10 h-4 w-4 transition-transform duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-[#727272] group-hover:text-white"
                  }`}
                />
              )}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
