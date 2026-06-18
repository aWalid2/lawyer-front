import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { HeaderTasksUser } from "./components/HeaderTasksUser";
import { decisionOptions } from "@/shared/constants/procedursOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TasksTable } from "./components/TasksTable";
import { ProceduresTable } from "./components/ProceduresTable";

export const UsersTask: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialTab =
    searchParams.get("tab") === "procedures" ? "procedures" : "tasks";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [deliverDateFrom, setDeliverDateFrom] = useState<Date | undefined>(
    undefined,
  );
  const [deliverDateTo, setDeliverDateTo] = useState<Date | undefined>(
    undefined,
  );

  const handleDateFilterChange = (
    key: "deliverDateFrom" | "deliverDateTo",
    value: Date | undefined,
  ) => {
    if (key === "deliverDateFrom") {
      setDeliverDateFrom(value);
    } else {
      setDeliverDateTo(value);
    }
  };

  const filterOptions = useMemo(() => {
    return [{ value: "all", label: "الكل" }, ...decisionOptions];
  }, []);

  return (
    <div className="space-y-4">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
        dir="rtl"
      >
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
        <HeaderTasksUser
          searchTerm={searchTerm}
          onSearch={(term) => {
            setSearchTerm(term);
          }}
          onFilterChange={(status) => {
            setStatusFilter(status);
          }}
          statusFilter={statusFilter}
          filterOptions={filterOptions}
          deliverDateFrom={deliverDateFrom}
          deliverDateTo={deliverDateTo}
          onDateFilterChange={handleDateFilterChange}
          context={activeTab as "tasks" | "procedures"}
        />
        <TabsContent value="tasks">
          <TasksTable
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            deliverDateFrom={deliverDateFrom}
            deliverDateTo={deliverDateTo}
          />
        </TabsContent>

        <TabsContent value="procedures">
          <ProceduresTable
            searchTerm={searchTerm}
            statusFilter={statusFilter}
            deliverDateFrom={deliverDateFrom}
            deliverDateTo={deliverDateTo}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
