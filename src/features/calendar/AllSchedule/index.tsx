import { HeaderTitle } from "@/shared/components/HeaderTitle";
import AllScheduleCard from "./components/AllScheduleCard";
import HeaderActions from "./components/HeaderActions";
import LoadingPage from "@/shared/components/LoadingPage";
import { useAgenda } from "../api/hooks/useAgenda";
import { useMemo } from "react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface ScheduleItem {
  id: number | string;
  title: string;
  date: string;
  time: string;
  location: string;
  client: string;
  type: string;
}

export const AllScheduleFeatures = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

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
    }));

    const procedures: ScheduleItem[] = (agendaData.procedures ?? []).map(
      (proc: any) => ({
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
      }),
    );

    return [...tasks, ...procedures];
  }, [agendaData]);

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
          schedules.map((schedule) => (
            <AllScheduleCard key={schedule.id} schedule={schedule} />
          ))
        )}
      </div>
    </>
  );
};
