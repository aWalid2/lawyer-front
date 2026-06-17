import { HeaderFilter } from "@/shared/components/Header/HeaderFilter";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";

interface NotificationFiltersProps {
  notificationStatus: string;
  onFilterChange: (value: string) => void;
}

function NotificationFilters({
  notificationStatus,
  onFilterChange,
}: NotificationFiltersProps) {
  return (
    <div className="mb-6 flex w-full flex-wrap items-center justify-between gap-3 md:w-auto">
      <HeaderTitle innerPage title="الاشعارات" />
      <HeaderFilter
        value={notificationStatus}
        onFilterChange={onFilterChange}
        options={[
          { value: "all", label: "كل الاشعارات" },
          { value: "new", label: "جديد" },
          { value: "read", label: "مقروء" },
        ]}
        className="md:w-[130px]"
      />
    </div>
  );
}

export default NotificationFilters;
