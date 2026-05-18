import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { useExport } from "@/shared/hooks/useExport";
import { exportAllClients } from "../api/service/exportClients";

interface HeaderPageReportsClientsProps {
  onSearch: (term: string) => void;
  onFilterChange: (status: string) => void;
  searchTerm: string;
  filter: string;
}

export const HeaderPageReportsClients: React.FC<HeaderPageReportsClientsProps> = ({
  onSearch,
  onFilterChange,
  searchTerm,
  filter,
}) => {
  const { handleExport: triggerExport, isPending: isExporting } = useExport({
    exportExcelFn: (params: { searchTerm: string; filter: string }) =>
      exportAllClients(params.searchTerm, params.filter),
    getFileName: (_, params) => {
      let fileName = `clients-report-${new Date().toISOString().split("T")[0]}`;
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
      return `جاري تحميل ملف تقارير الموكلين${filterText}...`;
    },
    successMessage: () => {
      if (filter !== "all" || searchTerm) {
        return `تم تصدير ${filter !== "all" ? `حالة: ${filter}` : ""} ${searchTerm ? `ببحث: "${searchTerm}"` : ""} بنجاح!`;
      }
      return "تم تحميل ملف تقارير الموكلين بنجاح!";
    },
  });

  const handleExport = () => {
    triggerExport("excel", { searchTerm, filter });
  };
  return (
    <HeaderPageLayout>
      <HeaderTitle innerPage title="تقارير الموكلين" />

      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث باسم الموكل أو كود الموكل ..."
        className="lg:ms-0"
      />

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        <HeaderFilter
          placeholder="الحالة"
          value={filter}
          onFilterChange={onFilterChange}
          options={[
            { value: "all", label: "الكل" },
            { value: "active", label: "نشط" },
            { value: "inactive", label: "غير نشط" },
          ]}
          className="md:w-[120px]"
        />
        <HeaderActionButton
         label={isExporting ? "جاري التصدير..." : "تصدير"}
          variant="gradient"
          className="rounded-main h-12.5 px-8"
          onClick={handleExport}
          disabled={isExporting}
        />
      </div>
    </HeaderPageLayout>
  );
};
