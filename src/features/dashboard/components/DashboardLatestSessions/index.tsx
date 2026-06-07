import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { DayCollapsible } from "./components/DayCollapsible";
import type { ApiSession, DayGroup, SessionItem } from "./components/types";
import { useGetSessionsToday } from "./components/api/hooks/useGetSessionsToday";
import { useGetSessionsTomorrow } from "./components/api/hooks/useGetSessionsTomorrow";
import { useGetSessionsAfterTomorrow } from "./components/api/hooks/useGetSessionsAfterTomorrow";
import LoadingPage from "@/shared/components/LoadingPage";

const mapApiSession = (s: ApiSession): SessionItem => ({
  time: format(new Date(s.session_date), "hh:mm a", { locale: ar }),
  caseNumber: s.case_sequence,
  court: s.court_name || s.presecution_name || s.police_station_name,
});

const buildDayGroup = (
  label: string,
  date: Date,
  sessions: ApiSession[] | undefined,
): DayGroup => {
  const dayName = format(date, "EEEE", { locale: ar });
  const fullDate = format(date, "d MMMM yyyy", { locale: ar });
  const mapped = (sessions ?? []).map(mapApiSession);

  return {
    label,
    date,
    dateLabel: `${dayName} ${fullDate}`,
    sessions: mapped,
    totalCount: mapped.length,
  };
};

const DashboardLatestSessions = () => {
  const { data: sessionsToday, isPending: isPendingSessionsToday } =
    useGetSessionsToday();
  const { data: sessionsTomorrow, isPending: ispendingSessionsTomorrow } =
    useGetSessionsTomorrow();
  const {
    data: sessionsAfterTomorrow,
    isPending: isPendingSessionsAfterTomorrow,
  } = useGetSessionsAfterTomorrow();

  const groups: DayGroup[] = useMemo(() => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const afterTomorrow = new Date(now);
    afterTomorrow.setDate(afterTomorrow.getDate() + 2);

    return [
      buildDayGroup("اليوم", now, sessionsToday as ApiSession[] | undefined),
      buildDayGroup(
        "غداً",
        tomorrow,
        sessionsTomorrow as ApiSession[] | undefined,
      ),
      buildDayGroup(
        "بعد غد",
        afterTomorrow,
        sessionsAfterTomorrow as ApiSession[] | undefined,
      ),
    ];
  }, [sessionsToday, sessionsTomorrow, sessionsAfterTomorrow]);

  if (
    isPendingSessionsToday ||
    ispendingSessionsTomorrow ||
    isPendingSessionsAfterTomorrow
  )
    return <LoadingPage />;
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
