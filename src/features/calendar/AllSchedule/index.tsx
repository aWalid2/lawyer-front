import { HeaderTitle } from "@/shared/components/HeaderTitle";
import HeaderActions from "./components/HeaderActions";
import AllScheduleTasks from "./components/AllScheduleTasks";
import AllScheduleProcedures from "./components/AllScheduleProcedures";
import LoadingPage from "@/shared/components/LoadingPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAgenda } from "../api/hooks/useAgenda";
import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

interface ProcedureItem {
  id: number | string;
  title: string;
  location: string;
  status: string;
  date: string;
}

export const AllScheduleFeatures = () => {
  const [searchParams] = useSearchParams();
  const now = new Date();
  const month = Number(searchParams.get("month")) || now.getMonth() + 1;
  const year = Number(searchParams.get("year")) || now.getFullYear();

  const { data: agendaData, isPending } = useAgenda({
    month,
    year,
  });

  const tasks = agendaData?.tasks ?? [];
  const procedures: ProcedureItem[] = useMemo(() => {
    return (agendaData?.procedures ?? []).map((proc) => ({
      id: proc.id ?? "",
      title: proc.procedure_title || proc.title || "إجراء",
      location: proc.admin_authority || proc.location || "",
      status: proc.actionType || "-",
      date: proc.session_date || "-",
    }));
  }, [agendaData]);

  if (isPending) {
    return <LoadingPage />;
  }

  return (
    <>
      <div className="mb-8 flex w-full items-center justify-between">
        <HeaderTitle title="جدول المواعيد" />
        <HeaderActions />
      </div>

      <Tabs defaultValue="tasks" className="w-full" dir="rtl">
        <TabsList className="border-primary/50 mb-6 flex h-13! w-full items-center overflow-hidden rounded-full border bg-white p-0 sm:w-fit">
          <TabsTrigger
            value="tasks"
            className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white sm:px-12 sm:text-base"
          >
            المهام
          </TabsTrigger>
          <TabsTrigger
            value="procedures"
            className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white sm:px-12 sm:text-base"
          >
            الإجراءات
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-0">
          <AllScheduleTasks tasks={tasks} />
        </TabsContent>

        <TabsContent value="procedures" className="mt-0">
          <AllScheduleProcedures procedures={procedures} />
        </TabsContent>
      </Tabs>
    </>
  );
};
