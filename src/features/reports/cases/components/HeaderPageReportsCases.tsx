// HeaderPageReportsCases.tsx
import React, { useState } from "react";
import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { exportAllCases } from "../api/service/exportAllCases";

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
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    let loadingToastId = null;

    try {
      setIsExporting(true);
      const filterText = filter !== "all" ? ` (${filter})` : "";
      loadingToastId = toast.loading(`جاري تحميل ملف تقارير القضايا${filterText}...`);
      const blob = await exportAllCases(searchTerm, filter);

      if (!(blob instanceof Blob)) {
        toast.error("خطأ في تنسيق الملف المستلم");
        return;
      }

      if (blob.size === 0) {
        toast.error("لا توجد بيانات للتصدير حسب الفلتر المحدد");
        return;
      }

      if (loadingToastId) {
        toast.dismiss(loadingToastId);
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;

      let fileName = `cases-report-${new Date().toISOString().split("T")[0]}`;
      if (filter !== "all") {
        fileName += `-${filter}`;
      }
      if (searchTerm) {
        fileName += `-search`;
      }
      fileName += `.xlsx`;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      let successMessage = "تم تحميل ملف تقارير القضايا بنجاح!";
      if (filter !== "all" || searchTerm) {
        successMessage = `تم تصدير ${filter !== "all" ? `حالة: ${filter}` : ""} ${searchTerm ? `ببحث: "${searchTerm}"` : ""} بنجاح!`;
      }
      toast.success(successMessage);
    } catch (error) {
      if (loadingToastId) {
        toast.dismiss(loadingToastId);
      }
      
      let errorMessage = "فشل التصدير. يرجى المحاولة مرة أخرى.";
      if (error instanceof AxiosError) {
        console.error("Error response:", error.response);

        if (error.response?.data instanceof Blob) {
          try {
            const text = await error.response.data.text();
            console.error("Error text from blob:", text);
            errorMessage = `خطأ من الخادم: ${text}`;
          } catch (e) {
            console.error("Could not read error:", e);
          }
        } else if (error.response?.data) {
          errorMessage = error.response.data.message || errorMessage;
        }
        if (error.response?.status === 404) {
          errorMessage = "خدمة التصدير غير متاحة حالياً";
        } else if (error.response?.status === 500) {
          errorMessage = "حدث خطأ في الخادم أثناء التصدير";
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsExporting(false);
    }
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

      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
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