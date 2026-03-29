import { HeaderFilter } from "@/shared/components/HeaderFilter";
import { HeaderTitle } from "@/shared/components/HeaderTitle";

interface NotificationFiltersProps {
    notificationStatus: string;
    onFilterChange: (value: string) => void;
}

function NotificationFilters({ notificationStatus, onFilterChange }: NotificationFiltersProps) {
    return (
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-between mb-6">
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