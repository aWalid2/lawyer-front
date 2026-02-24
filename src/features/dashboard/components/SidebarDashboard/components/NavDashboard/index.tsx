import { AboutOfficeIcon } from "@/components/shared/icons/AboutOffice";
import { CalendarIcon } from "@/components/shared/icons/Calendar";
import { CaseMangementIcon } from "@/components/shared/icons/CaseManagement";
import { ConsultationsIcon } from "@/components/shared/icons/Consultations";
import { ContractsIcon } from "@/components/shared/icons/Contracts";
import { DocumentsIcon } from "@/components/shared/icons/Documents";
import { FinanceIcon } from "@/components/shared/icons/Finance";
import { MainIcon } from "@/components/shared/icons/Main";
import { ReportsIcon } from "@/components/shared/icons/Reports";
import { RollIcon } from "@/components/shared/icons/Roll";
import { RulingsIcon } from "@/components/shared/icons/Rulings";
import { SettingsIcon } from "@/components/shared/icons/Settings";
import { UsersIcon } from "@/components/shared/icons/Users";
import { UserTasksIcon } from "@/components/shared/icons/UserTasks";
import { NavLink } from "react-router-dom";

import CollapsibleNavDashboard from "./components/CollapsibleNavDashboard";

const reportsLinks = [
  {
    label: "تقارير الموكلين",
    to: "/dashboard/reports/clients",
  },
  {
    label: " تقارير القضايا ",
    to: "/dashboard/reports/cases",
  },
  {
    label: "تقارير الجلسات",
    to: "/dashboard/reports/sitting",
  },
  {
    label: "تقارير المستخدمين",
    to: "/dashboard/reports/users",
  },
  {
    label: "تقارير المصروفات",
    to: "/dashboard/reports/expenses",
  },
  {
    label: "تقارير المدفوعات",
    to: "/dashboard/reports/payments",
  },
];
const usersLinks = [
  {
    label: "الموكلين",
    to: "/dashboard/users/clients",
  },
  {
    label: "العقود",
    to: "/dashboard/users/lawyers",
  },
  {
    label: "الموظفين",
    to: "/dashboard/users/employees",
  },
];
const financeLinks = [
  {
    label: "المصروفات ",
    to: "/dashboard/finance/expences",
  },
  {
    label: "المدفوعات",
    to: "/dashboard/finance/payments",
  },
];

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center justify-between p-4 rounded-lg transition
  ${
    isActive
      ? "bg-gradient-to-l from-[#CBA462] to-[#E3C086] text-white"
      : "text-[#727272] hover:bg-primary hover:text-white"
  }`;

const NavDashboard = () => {
  return (
    <nav className="space-y-2 text-sm">
      <NavLink end to="/dashboard" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <MainIcon />
          <p className=" text-base font-normal">الرئيسية</p>
        </div>
      </NavLink>
      <NavLink to="/clients" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <UsersIcon />
          <p className=" text-base font-normal">الموكلين</p>
        </div>
      </NavLink>
      <NavLink to="/dashboard/case-management" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <CaseMangementIcon />
          <p className=" text-base font-normal">إدارة القضايا</p>
        </div>
      </NavLink>

      <NavLink to="/dashboard/legislation-rulings" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <RulingsIcon />
          <p className=" text-base font-normal">التشريعات والأحكام</p>
        </div>
      </NavLink>
      <NavLink to="/dashboard/calendar" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <CalendarIcon />
          <p className=" text-base font-normal">التقويم</p>
        </div>
      </NavLink>
      <NavLink to="/dashboard/roll" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <RollIcon />
          <p className=" text-base font-normal">الرول</p>
        </div>
      </NavLink>
      <NavLink to="/dashboard/documents" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <DocumentsIcon />
          <p className=" text-base font-normal">المستندات</p>
        </div>
      </NavLink>

      <CollapsibleNavDashboard
        data={reportsLinks}
        title={"التقارير"}
        icon={<ReportsIcon />}
      />

      <NavLink to="/dashboard/user-tasks" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <UserTasksIcon />
          <p className=" text-base font-normal">مهام المستخدم</p>
        </div>
      </NavLink>
      <CollapsibleNavDashboard
        data={usersLinks}
        title={"المستخدمين"}
        icon={<UsersIcon />}
      />
      <NavLink to="/dashboard/consultaions" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <ConsultationsIcon />
          <p className=" text-base font-normal">الاستشارات</p>
        </div>
      </NavLink>
      <NavLink to="/dashboard/contracts" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <ContractsIcon />
          <p className=" text-base font-normal">العقود</p>
        </div>
      </NavLink>
      <CollapsibleNavDashboard
        data={financeLinks}
        title={"المالية"}
        icon={<FinanceIcon />}
      />
      <NavLink to="/dashboard/about-office" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <AboutOfficeIcon />
          <p className=" text-base font-normal">عن المكتب</p>
        </div>
      </NavLink>
      <NavLink to="/dashboard/settings" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <SettingsIcon />
          <p className=" text-base font-normal">الاعدادات </p>
        </div>
      </NavLink>
    </nav>
  );
};

export default NavDashboard;
