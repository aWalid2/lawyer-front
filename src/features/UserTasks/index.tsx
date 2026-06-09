import { Error } from "@/shared/components/Error";
import LoadingPage from "@/shared/components/LoadingPage";

import { useIndexedData } from "@/shared/utils/useIndexedData";
import React, { useMemo, useState } from "react";
import { useFetchTasks } from "./api/hooks/useGetTasks";
import { HeaderTasksUser } from "./components/HeaderTasksUser";
import { decisionOptions } from "@/shared/constants/procedursOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TasksTable } from "./components/TasksTable";
import { ProceduresTable } from "./components/ProceduresTable";

export const UsersTask: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deliverDateFrom, setDeliverDateFrom] = useState<Date | undefined>(
    undefined,
  );
  const [deliverDateTo, setDeliverDateTo] = useState<Date | undefined>(
    undefined,
  );
  const [page, setPage] = useState(1);
  const limit = 15;
  const {
    data: tasksResponse,
    isPending,
    isError,
    error,
    isFetching,
  } = useFetchTasks(page, limit, deliverDateFrom, deliverDateTo, searchTerm);
  const tasks = tasksResponse?.data;

  const handleDateFilterChange = (
    key: "deliverDateFrom" | "deliverDateTo",
    value: Date | undefined,
  ) => {
    setPage(1);
    if (key === "deliverDateFrom") {
      setDeliverDateFrom(value);
    } else {
      setDeliverDateTo(value);
    }
  };
  const totalPages = tasksResponse?.meta?.total_pages ?? 1;
  const indexedData = useIndexedData(tasks || [], page, limit);

  const filterOptions = useMemo(() => {
    return [{ value: "all", label: "الكل" }, ...decisionOptions];
  }, []);

  if (isPending && !tasks) return <LoadingPage />;
  if (isError)
    return <Error message="حدث خطأ في تحميل البيانات" error={error} />;

  return (
    <div className="space-y-4">
      <HeaderTasksUser
        searchTerm={searchTerm}
        onSearch={(term) => {
          setSearchTerm(term);
          setPage(1);
        }}
        onFilterChange={(status) => {
          setStatusFilter(status);
          setPage(1);
        }}
        statusFilter={statusFilter}
        filterOptions={filterOptions}
        deliverDateFrom={deliverDateFrom}
        deliverDateTo={deliverDateTo}
        onDateFilterChange={handleDateFilterChange}
      />

      <Tabs defaultValue="tasks" className="w-full" dir="rtl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-2 gap-y-3">
          <TabsList className="border-primary/50 flex h-13! w-full items-center overflow-hidden rounded-full border bg-white p-0 max-[786px]:h-auto! max-[786px]:w-full! max-[786px]:flex-col! max-[786px]:rounded-2xl! sm:w-fit">
            <TabsTrigger
              value="tasks"
              className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white max-[786px]:h-auto! max-[786px]:w-full! max-[786px]:flex-none! max-[786px]:rounded-2xl! max-[786px]:py-3 sm:px-12 sm:text-base"
            >
              المهام
            </TabsTrigger>
            <TabsTrigger
              value="procedures"
              className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white max-[786px]:h-auto! max-[786px]:w-full! max-[786px]:flex-none! max-[786px]:rounded-2xl! max-[786px]:py-3 sm:px-12 sm:text-base"
            >
              الاجراءات
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="tasks">
          <TasksTable
            data={indexedData}
            isFetching={isFetching}
            totalPages={totalPages}
            page={page}
            onPageChange={setPage}
          />
        </TabsContent>

        <TabsContent value="procedures">
          <ProceduresTable />
        </TabsContent>
      </Tabs>
    </div>
  );
};
