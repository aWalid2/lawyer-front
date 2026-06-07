import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageLayout from "@/shared/components/PageLayout.tsx";
import { TableProcedures } from "./components/TableProcedures";
import { TableTasks } from "./components/TableTasks";
import { TableConsultations } from "./components/TableConsultations";
import React from "react";

const Incomplete = () => {
  const [activeTab, setActiveTab] = React.useState("proceduresIncomplete");

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  return (
    <PageLayout>
      <Tabs defaultValue="proceduresIncomplete" className="w-full" dir="rtl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-x-2 gap-y-3">
          <h1 className="text-xl font-semibold">
            {(activeTab === "proceduresIncomplete" &&
              "الإجراءات الغير مكتملة") ||
              (activeTab === "tasksIncomplete" && "المهام الغير مكتملة") ||
              "الاستشارات الغير مكتملة"}
          </h1>
          <TabsList className="border-primary/50 flex h-13! w-full items-center overflow-hidden rounded-full border bg-white p-0 sm:w-fit">
            <TabsTrigger
              onClick={() => handleTabChange("proceduresIncomplete")}
              value="proceduresIncomplete"
              className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white sm:px-12 sm:text-base"
            >
              الإجراءات الغير مكتملة
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleTabChange("tasksIncomplete")}
              value="tasksIncomplete"
              className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white sm:px-12 sm:text-base"
            >
              المهام الغير مكتملة
            </TabsTrigger>
            <TabsTrigger
              onClick={() => handleTabChange("consultationsIncomplete")}
              value="consultationsIncomplete"
              className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white sm:px-12 sm:text-base"
            >
              الاستشارات الغير مكتملة
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="proceduresIncomplete" className="mt-0">
          <TableProcedures />
        </TabsContent>

        <TabsContent value="tasksIncomplete" className="mt-0">
          <TableTasks />
        </TabsContent>
        <TabsContent value="consultationsIncomplete" className="mt-0">
          <TableConsultations />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Incomplete;
