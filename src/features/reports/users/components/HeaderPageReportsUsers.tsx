import React from "react";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";

interface HeaderPageReportsUsersProps {
  onSearch: (term: string) => void;
  onFilterChange: (key: string, value: string) => void;
  searchTerm: string;
  filters: {
    role: string;
    status: string;
  };
  roleOptions: { value: string; label: string }[];
}

export const HeaderPageReportsUsers: React.FC<HeaderPageReportsUsersProps> = ({
  onSearch,
  onFilterChange,
  searchTerm,
  filters,
  roleOptions
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

      <div className="flex w-full items-center justify-end gap-3 md:w-auto">
        <HeaderFilter
          placeholder="الدور"
          value={filters.role}
          onFilterChange={(v) => onFilterChange("role", v)}
          options={[{ value: "all", label: "جميع المستخدمين" }, ...roleOptions]}
          className="md:w-27.5"
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
          className="md:w-27.5"
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
