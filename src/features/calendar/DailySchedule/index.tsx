import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProceduresSchedule from "./components/Procedurs";
import UserTasksSchedule from "./components/UserTasksSchedule";
import PageLayout from "@/shared/components/PageLayout";
import LoadingPage from "@/shared/components/LoadingPage";
import { useAgenda } from "../api/hooks/useAgenda";
import type { AgendaProcedure } from "../api/services/agendaTypes";
import { format } from "date-fns";

interface DailyScheduleProps {
  selectedDate: Date | undefined;
}

interface TaskEvent {
  id: string;
  title: string;
  lawyer: string;
  location: string;
  startTime: string;
  endTime: string;
}

interface ProcedureItem {
  id: number | string;
  title: string;
  type: string;
  time: string;
  client: string;
  location: string;
  status: string;
}

const parseTime = (dateStr: string): string => {
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return "00:00";
    const hours = String(d.getUTCHours()).padStart(2, "0");
    const minutes = String(d.getUTCMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  } catch {
    return "00:00";
  }
};

const mapTaskToEvent = (task: {
  id: number;
  task_title: string;
  delivery_date: string;
  start_date: string;
  end_date: string;
}): TaskEvent => {
  const time = parseTime(task.delivery_date || task.start_date);
  return {
    id: String(task.id),
    title: task.task_title,
    lawyer: "",
    location: "",
    startTime: time,
    endTime: time,
  };
};

const mapProcedureToItem = (proc: AgendaProcedure): ProcedureItem => ({
  id: proc.id ?? "",
  title: proc.actionType || proc.title || "إجراء",
  type: proc.type || "إجراء",
  time: proc.session_date
    ? format(new Date(proc.session_date), "hh:mm aaa")
    : "",
  client: proc.client_name || proc.clientName || "",
  location: proc.admin_authority || proc.location || "",
  status: proc.status || "قادم",
});

const DailySchedule = ({ selectedDate }: DailyScheduleProps) => {
  const dateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const month = selectedDate ? selectedDate.getMonth() + 1 : undefined;
  const year = selectedDate ? selectedDate.getFullYear() : undefined;

  const { data: agendaData, isPending } = useAgenda(
    { month, year, date: dateStr },
    !!selectedDate,
  );

  console.log("DailySchedule received agendaData:", agendaData);

  const tasks: TaskEvent[] = (agendaData?.tasks ?? []).map(mapTaskToEvent);
  const procedures: ProcedureItem[] = (agendaData?.procedures ?? []).map(
    mapProcedureToItem,
  );

  return (
    <PageLayout>
      <Tabs defaultValue={"userTasks"} className="w-full" dir="rtl">
        <TabsList className="border-primary/50 mb-6 flex h-13! w-full items-center overflow-hidden rounded-full border bg-white p-0 sm:w-fit">
          <TabsTrigger
            value="procedures"
            className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white sm:px-12 sm:text-base"
          >
            الإجراءات
          </TabsTrigger>
          <TabsTrigger
            value="userTasks"
            className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white sm:px-12 sm:text-base"
          >
            الجلسات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="procedures" className="mt-0">
          {isPending ? (
            <LoadingPage />
          ) : (
            <ProceduresSchedule
              selectedDate={selectedDate!}
              procedures={procedures}
            />
          )}
        </TabsContent>

        <TabsContent value="userTasks" className="mt-0">
          {isPending ? (
            <LoadingPage />
          ) : (
            <UserTasksSchedule selectedDate={selectedDate!} events={tasks} />
          )}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default DailySchedule;
