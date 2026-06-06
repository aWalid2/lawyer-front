import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { DayCollapsible } from "./components/DayCollapsible";
import { MOCK_SESSIONS } from "./components/mockData";

const DashboardLatestSessions = () => {
  const groups = useMemo(() => {
    return MOCK_SESSIONS.map((group) => {
      const dayName = format(group.date, "EEEE", { locale: ar });
      const fullDate = format(group.date, "d MMMM yyyy", { locale: ar });
      return {
        ...group,
        dateLabel: `${dayName} ${fullDate}`,
      };
    });
  }, []);

  return (
    <Card className="dark:bg-backgroundDark col-span-1 flex h-full w-full flex-col border-0 px-6 pb-6 shadow-sm lg:col-span-2">
      <div className="mt-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-[#BF9A61]" />
        <h2 className="text-lg font-bold text-[#153A4D] dark:text-white">
          جلسات اليوم والغد
        </h2>
      </div>

      <div className="divide-y divide-gray-100 rounded-lg border border-gray-100">
        {groups.map((group) => (
          <DayCollapsible key={group.label} group={group} />
        ))}
      </div>
    </Card>
  );
};

export default DashboardLatestSessions;
