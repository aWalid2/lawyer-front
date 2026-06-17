import { HeaderExportMenu } from "@/shared/components/Header/HeaderExportMenu";
import { HeaderFilter } from "@/shared/components/Header/HeaderFilter";
import { HeaderPageLayout } from "@/shared/components/Header/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/Header/HeaderSearch";
import { useExport } from "@/shared/hooks/useExport";
import { exportReportsClients } from "../api/service/exportReportClients";

interface HeaderPageReportsClientsProps {
  onSearch: (term: string) => void;
  onFilterChange: (status: string) => void;
  searchTerm: string;
  filter: string;
}

export const HeaderPageReportsClients: React.FC<
  HeaderPageReportsClientsProps
> = ({ onSearch, onFilterChange, searchTerm, filter }) => {
  const { handleExport: triggerExport } = useExport({
    exportExcelFn: (params: { searchTerm: string; filter: string }) =>
      exportReportsClients("excel", params.filter),
    exportPdfFn: (params: { searchTerm: string; filter: string }) =>
      exportReportsClients("pdf", params.filter),
    getFileName: (type, params) => {
      let fileName = `clients-report-${new Date().toISOString().split("T")[0]}`;
      if (params.filter !== "all") {
        fileName += `-${params.filter}`;
      }
      if (params.searchTerm) {
        fileName += `-search`;
      }
      return fileName + `.${type === "excel" ? "xlsx" : "pdf"}`;
    },
    loadingMessage: () => {
      const filterText = filter !== "all" ? ` (${filter})` : "";
      return `جاري تحميل ملف تقارير الموكلين${filterText}...`;
    },
    successMessage: () => {
      if (filter !== "all" || searchTerm) {
        return `تم تصدير ${filter !== "all" ? `حالة: ${filter}` : ""} ${searchTerm ? `ببحث: "${searchTerm}"` : ""} بنجاح!`;
      }
      return "تم تحميل ملف تقارير الموكلين بنجاح!";
    },
  });

  const handleExport = (format: string) => {
    if (format === "excel" || format === "pdf") {
      triggerExport(format as "excel" | "pdf", { searchTerm, filter });
    }
  };
  return (
    <HeaderPageLayout>
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث باسم الموكل أو رقم الهاتف "
      />

      <div className="flex w-full items-center justify-end gap-3 md:w-auto">
        <HeaderFilter
          placeholder="الحالة"
          value={filter}
          onFilterChange={onFilterChange}
          options={[
            { value: "all", label: "الكل" },
            { value: "active", label: "نشط" },
            { value: "inactive", label: "غير نشط" },
          ]}
          className="md:w-30"
        />
        <HeaderExportMenu onSelect={handleExport} />
      </div>
    </HeaderPageLayout>
  );
};
