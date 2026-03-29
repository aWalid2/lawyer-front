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
      icon: <CaseMangementIcon className="w-5 h-5" />,
      to: `/dashboard/case-management/${id}`,
      end: true,
    },
    {
      label: "إدارة الجلسات",
      icon: <ManagmentsIcon className="w-5 h-5" />,
      to: `/dashboard/case-management/${id}/sessions`,
    },
    {
      label: "القضايا المرتبطة",
      icon: <ManagmentsIcon className="w-5 h-5" />,
      to: `/dashboard/case-management/${id}/related`,
    },
    {
      label: "المستندات",
      icon: <ManagmentsIcon className="w-5 h-5" />,
      to: `/dashboard/case-management/${id}/documents`,
    },
    {
      label: "المصاريف",
      icon: <ManagmentsIcon className="w-5 h-5" />,
      to: `/dashboard/case-management/${id}/expenses`,
    },
    {
      label: "إجراءات",
      icon: <BarChartIcon className="w-5 h-5" />,
      to: `/dashboard/case-management/${id}/procedures`,
    },
    {
      label: "الموظفين",
      icon: <ManagmentsIcon className="w-5 h-5" />,
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
            `flex items-center justify-between p-3.5 rounded-[12px] transition-all duration-300 w-full group h-13.5 ${isActive
              ? "bg-primary-gradient text-white shadow-[0_8px_16px_rgba(203,164,98,0.25)]"
              : "text-[#727272] hover:bg-gray-50 hover:text-secondary"
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div className="flex items-center gap-3.5">
                <span
                  className={`transition-colors duration-300 ${isActive
                    ? "text-white"
                    : "text-[#727272] group-hover:text-primary"
                    }`}
                >
                  {item.icon}
                </span>
                <span className="text-[15px] font-medium font-cairo">
                  {item.label}
                </span>
              </div>
              {item.hasDropdown && (
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${isActive ? "text-white" : "text-[#727272]"
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
