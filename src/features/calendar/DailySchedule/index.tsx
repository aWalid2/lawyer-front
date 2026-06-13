import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProceduresSchedule from "./components/Procedurs";
import UserTasksSchedule from "./components/UserTasksSchedule";
import PageLayout from "@/shared/components/PageLayout";
import LoadingPage from "@/shared/components/LoadingPage";
import { useAgenda } from "../api/hooks/useAgenda";
import type { AgendaProcedure, AgendaTask } from "../api/services/agendaTypes";
import { format } from "date-fns";

interface DailyScheduleProps {
  selectedDate: Date | undefined;
}

interface ProcedureItem {
  id: number | string;
  title: string;
  type: string;
  client: string;
  location: string;
  status: string;
}

const mapProcedureToItem = (proc: AgendaProcedure): ProcedureItem => ({
  id: proc.id ?? "",
  title: proc.procedure_title || "إجراء",
  type: proc.type || "إجراء",
  client: proc.client_name || proc.clientName || "",
  location: proc.admin_authority || proc.location || "",
  status: proc.actionType || "-",
});

const DailySchedule = ({ selectedDate }: DailyScheduleProps) => {
  const dateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";
  const month = selectedDate ? selectedDate.getMonth() + 1 : undefined;
  const year = selectedDate ? selectedDate.getFullYear() : undefined;

  const { data: agendaData, isPending } = useAgenda(
    { month, year, date: dateStr },
    !!selectedDate,
  );

  const tasks: AgendaTask[] = agendaData?.tasks ?? [];
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
            المهام
          </TabsTrigger>
          <TabsTrigger
            value="consultation"
            className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white sm:px-12 sm:text-base"
          >
            الاستشارات
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
            <UserTasksSchedule selectedDate={selectedDate!} tasks={tasks} />
          )}
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default DailySchedule;
