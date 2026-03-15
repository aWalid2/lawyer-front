import { TaskUserSearch } from "@/features/UserTasks/components/TaskUserSerch";
import { Link } from "react-router-dom";

interface HeaderClientProps {
  onSearch: (value: string) => void;
  searchTerm: string;
}

export const HeaderClient: React.FC<HeaderClientProps> = ({
  onSearch,
  searchTerm,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 w-full pb-6">
      {/* العنوان على اليمين */}
      <h1 className="text-xl font-semibold text-secondary font-cairo whitespace-nowrap order-1">
        الموكلين
      </h1>

      {/* السيرش في المنتصف */}
      <div className="flex-1 max-w-md order-2">
        <TaskUserSearch value={searchTerm} onChange={onSearch} />
      </div>
      {/* الزر على اليسار */}
      <div className="flex items-center gap-3 order-3">
        <Link
          to="/dashboard/clients/add-client"
          className="flex items-center justify-center gap-1 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-white text-xs md:text-base font-cairo rounded-lg md:rounded-[12px] transition-all whitespace-nowrap h-9 sm:h-10 md:h-[50px] relative overflow-hidden flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #E3C086 0%, #CBA462 100%)",
          }}
        >
          <span>+ موكل جديد</span>
        </Link>
      </div>
    </div>
  );
};