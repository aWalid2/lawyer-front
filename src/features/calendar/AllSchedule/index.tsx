import { HeaderTitle } from "@/shared/components/HeaderTitle";
import AllScheduleCard from "./components/AllScheduleCard";
import HeaderActions from "./components/HeaderActions";
import LoadingPage from "@/shared/components/LoadingPage";
import { Pagination } from "@/shared/components/Pagination";
import { useAgenda } from "../api/hooks/useAgenda";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { useSearchParams } from "react-router-dom";

interface ScheduleItem {
  id: number | string;
  title: string;
  date: string;
  time: string;
  location: string;
  client: string;
  type: string;
  kind: "task" | "procedure";
}

const ITEMS_PER_PAGE = 9;

export const AllScheduleFeatures = () => {
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const now = new Date();
  const month = Number(searchParams.get("month")) || now.getMonth() + 1;
  const year = Number(searchParams.get("year")) || now.getFullYear();

  const { data: agendaData, isPending } = useAgenda({ month, year });

  const schedules: ScheduleItem[] = useMemo(() => {
    if (!agendaData) return [];

    const tasks: ScheduleItem[] = (agendaData.tasks ?? []).map((task) => ({
      id: task.id,
      title: task.task_title,
      date: task.start_date
        ? format(new Date(task.start_date), "dd MMMM yyyy", { locale: ar })
        : "",
      time: task.start_date
        ? format(new Date(task.start_date), "hh:mm aaa")
        : "",
      location: "",
      client: "",
      type: "مهمة",
      kind: "task" as const,
    }));

    const procedures: ScheduleItem[] = (agendaData.procedures ?? []).map(
      (proc) => ({
        id: proc.id ?? "",
        title: proc.actionType || proc.title || "إجراء",
        date: proc.session_date
          ? format(new Date(proc.session_date), "dd MMMM yyyy", { locale: ar })
          : "",
        time: proc.session_date
          ? format(new Date(proc.session_date), "hh:mm aaa")
          : "",
        location: proc.admin_authority || proc.location || "",
        client: proc.client_name || proc.clientName || "",
        type: "إجراء",
        kind: "procedure" as const,
      }),
    );

    return [...tasks, ...procedures];
  }, [agendaData]);

  const totalPages = Math.max(1, Math.ceil(schedules.length / ITEMS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedSchedules = useMemo(() => {
    const start = (safePage - 1) * ITEMS_PER_PAGE;
    return schedules.slice(start, start + ITEMS_PER_PAGE);
  }, [schedules, safePage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="mb-8 flex w-full items-center justify-between">
        <HeaderTitle innerPage title="جدول المواعيد" />
        <HeaderActions />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {schedules.length === 0 ? (
          <p className="text-muted-foreground col-span-full text-center">
            لا توجد مواعيد لهذا الشهر
          </p>
        ) : (
          paginatedSchedules.map((schedule) => (
            <AllScheduleCard
              key={`${schedule.kind}-${schedule.id}`}
              schedule={schedule}
            />
          ))
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};
