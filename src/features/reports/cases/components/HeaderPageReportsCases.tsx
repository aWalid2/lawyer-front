import React from "react";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { useExport } from "@/shared/hooks/useExport";
import { exportAllCases } from "../api/service/exportAllCases";
import { HeaderExportMenu } from "@/shared/components/HeaderExportMenu";

interface HeaderPageReportsCasesProps {
  onSearch: (term: string) => void;
  onFilterChange: (status: string) => void;
  searchTerm: string;
  filter: string;
}

export const HeaderPageReportsCases: React.FC<HeaderPageReportsCasesProps> = ({
  onSearch,
  onFilterChange,
  searchTerm,
  filter,
}) => {
  const { handleExport: triggerExport, isPending: isExporting } = useExport({
    exportExcelFn: (params: { searchTerm: string; filter: string }) =>
      exportAllCases(params.searchTerm, params.filter),
    getFileName: (_, params) => {
      let fileName = `cases-report-${new Date().toISOString().split("T")[0]}`;
      if (params.filter !== "all") {
        fileName += `-${params.filter}`;
      }
      if (params.searchTerm) {
        fileName += `-search`;
      }
      return fileName + `.xlsx`;
    },
    loadingMessage: () => {
      const filterText = filter !== "all" ? ` (${filter})` : "";
      return `جاري تحميل ملف تقارير القضايا${filterText}...`;
    },
    successMessage: () => {
      if (filter !== "all" || searchTerm) {
        return `تم تصدير ${filter !== "all" ? `حالة: ${filter}` : ""} ${searchTerm ? `ببحث: "${searchTerm}"` : ""} بنجاح!`;
      }
      return "تم تحميل ملف تقارير القضايا بنجاح!";
    },
  });

  const handleExport = (type: "pdf" | "excel") => {
    triggerExport(type, { searchTerm, filter });
  };

  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="تقارير القضايا" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
        className="lg:ms-0"
      />

      <div className="flex w-full items-center justify-end gap-3 md:w-auto">
        <HeaderFilter
          placeholder="الحالة"
          value={filter}
          onFilterChange={onFilterChange}
          options={[
            { value: "all", label: "الكل" },
            { value: "open", label: "مفتوحة" },
            { value: "closed", label: "مغلقة" },
            { value: "in-progress", label: "قيد التنفيذ" },
          ]}
          className="md:w-[120px]"
        />
        <HeaderExportMenu
          onSelect={handleExport}

        />
      </div>
    </HeaderPageLayout>
  );
};
