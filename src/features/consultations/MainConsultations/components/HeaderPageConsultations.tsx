import { HeaderActionButton } from "@/shared/components/HeaderActionButton";
import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderPageLayout } from "@/shared/components/HeaderPageLayout";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import { Plus } from "lucide-react";
import { ConsultationsDialog } from "./ConsultationsDialog";

interface HeaderPageConsultationsProps {
  onSearch: (term: string) => void;
  onFilterChange: (status: string) => void;
  searchTerm: string;
  filters: {
    status: string;
  };
}

export const HeaderPageConsultations: React.FC<
  HeaderPageConsultationsProps
> = ({ onSearch, onFilterChange, searchTerm, filters }) => {
  const handleFilterChange = (value: string) => {
    onFilterChange(value);
  };

  return (
    <HeaderPageLayout>
      <HeaderSearch
        value={searchTerm}
        onChange={onSearch}
        placeholder="بحث ..."
      />

      <div className="flex w-full flex-wrap items-center justify-end gap-3 md:w-auto">
        <HeaderFilter
          placeholder="اختر الحالة"
          value={filters.status}
          onFilterChange={handleFilterChange}
          options={[
            { value: "all", label: "جميع الحالات" },
            { value: "pending", label: "قيد الانتظار" },
            { value: "dated", label: "تم تحديد موعد" },
            { value: "completed", label: "مكتملة" },
          ]}
          className="md:w-[150px]"
        />

        <ConsultationsDialog
          onSave={() => {}}
          trigger={
            <HeaderActionButton
              label="استشارة جديدة"
              icon={<Plus size={18} />}
              variant="gradient"
              className="rounded-main h-12.5 px-8"
            />
          }
        />
      </div>
    </HeaderPageLayout>
  );
};
