import React from "react";
import { MainIcon } from "@/components/shared/icons/Main";
import { CaseMangementIcon } from "@/components/shared/icons/CaseManagement";
import { RulingsIcon } from "@/components/shared/icons/Rulings";
import { CalendarIcon } from "@/components/shared/icons/Calendar";
import { RollIcon } from "@/components/shared/icons/Roll";
import { DocumentsIcon } from "@/components/shared/icons/Documents";
import { ReportsIcon } from "@/components/shared/icons/Reports";
import { UserTasksIcon } from "@/components/shared/icons/UserTasks";
import { ConsultationsIcon } from "@/components/shared/icons/Consultations";
import { ContractsIcon } from "@/components/shared/icons/Contracts";
import { FinanceIcon } from "@/components/shared/icons/Finance";
import { AboutOfficeIcon } from "@/components/shared/icons/AboutOffice";
import { NavLink } from "react-router-dom";
import { UsersIcon } from "@/components/shared/icons/Users";
import { SettingsIcon } from "@/components/shared/icons/Settings";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center justify-between p-4 rounded-lg transition
     ${isActive ? "bg-primary text-white" : "text-[#727272]  hover:bg-primary hover:text-white"}`;

const NavDashboard = () => {
  return (
    <nav className="space-y-2 text-sm">
      <NavLink to="/dashboard" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <MainIcon />
          <p className=" text-base font-normal">الرئيسية</p>
        </div>
      </NavLink>
      <NavLink to="/dashboard/clients" className={linkClass}>
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
      <NavLink to="/dashboard/reports" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <ReportsIcon />
          <p className=" text-base font-normal">التقارير</p>
        </div>
      </NavLink>
      <NavLink to="/dashboard/user-tasks" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <UserTasksIcon />
          <p className=" text-base font-normal">مهام المستخدم</p>
        </div>
      </NavLink>
      <NavLink to="/dashboard/users" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <UsersIcon />
          <p className=" text-base font-normal">المستخدمين</p>
        </div>
      </NavLink>
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
      <NavLink to="/dashboard/finance" className={linkClass}>
        <div className="flex items-center gap-3 ">
          <FinanceIcon />
          <p className=" text-base font-normal">المالية</p>
        </div>
      </NavLink>
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
