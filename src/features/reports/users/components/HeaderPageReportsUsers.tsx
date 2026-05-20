import React from "react";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderExportMenu } from "@/shared/components/HeaderExportMenu";
import { exportUserReports } from "../api/services/exportUserReports";
import { toast } from "sonner";

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
  const handleExport = async (type: "pdf" | "excel") => {
    try {
      const params: { status?: string; role_id?: string } = {};
      if (filters.status !== "all") params.status = filters.status;
      if (filters.role !== "all") params.role_id = filters.role;
      const blob = type === "pdf" ? await exportUserReports("pdf", params) : await exportUserReports("excel", params);
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `user-reports.${type === "excel" ? "xlsx" : "pdf"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (e) {
      toast.error("حدث خطأ أثناء تصدير التقرير");
    }
  };
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
        <HeaderExportMenu onSelect={handleExport} />
      </div>
    </HeaderPageLayout>
  );
};
