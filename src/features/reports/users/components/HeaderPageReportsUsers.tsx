import React from "react";
import { HeaderActionButton } from "@/components/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import { HeaderFilter } from "@/components/shared/components/HeaderFilter";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/components/shared/components/HeaderPageLayout";

interface HeaderPageReportsUsersProps {
  onSearch: (term: string) => void;
  onFilterChange: (key: string, value: string) => void;
  searchTerm: string;
  filters: {
    role: string;
    status: string;
  };
}

export const HeaderPageReportsUsers: React.FC<HeaderPageReportsUsersProps> = ({
  onSearch,
  onFilterChange,
  searchTerm,
  filters,
}) => {
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="تقارير المستخدمين" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
        className="lg:ms-0"
      />

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <HeaderFilter
          placeholder="الدور"
          value={filters.role}
          onFilterChange={(v) => onFilterChange("role", v)}
          options={[
            { value: "all", label: "الدور" },
            { value: "lawyer", label: "محامي" },
            { value: "manager", label: "مدير" },
            { value: "employee", label: "موظف" },
          ]}
          className="md:w-[110px]"
        />
        <HeaderFilter
          placeholder="الحالة"
          value={filters.status}
          onFilterChange={(v) => onFilterChange("status", v)}
          options={[
            { value: "all", label: "الحالة" },
            { value: "active", label: "نشط" },
            { value: "inactive", label: "غير نشط" },
          ]}
          className="md:w-[110px]"
        />
        <HeaderActionButton
          label="تصدير"
          variant="gradient"
          className="rounded-main h-12.5 px-8"
        />
      </div>
    </HeaderPageLayout>
  );
};
