import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import { FirstDegreeSessions } from "./components/FirstDegreeSessions";
import { HeaderFirstDegreeSessionsTable } from "./components/FirstDegreeSessions/HeaderFirstDegreeSessionsTable";
import { FirstDegreeTable } from "./components/FirstDegreeSessions/components/FirstDegreeTable";

const CourtSessions: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="rounded-[12px] border border-[#eeeeee] p-6">
        <Tabs
          defaultValue="first"
          dir="rtl"
          className="flex w-full flex-col gap-2"
        >
          <TabsList className="mb-8 h-auto flex-wrap justify-start gap-4 bg-transparent p-0">
            <TabsTrigger
              value="first"
              className="data-[state=active]:text-secondary data-[state=active]:border-b-secondary rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 font-semibold text-[#727272] data-[state=active]:shadow-none!"
            >
              بيانات وجلسات أول درجة
            </TabsTrigger>
            <TabsTrigger
              value="appeal"
              className="data-[state=active]:text-secondary data-[state=active]:border-b-secondary rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 font-semibold text-[#727272] data-[state=active]:shadow-none!"
            >
              بيانات وجلسات الاستئناف
            </TabsTrigger>
            <TabsTrigger
              value="distinction"
              className="data-[state=active]:text-secondary data-[state=active]:border-b-secondary w-fit rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 font-semibold text-[#727272] data-[state=active]:shadow-none!"
            >
              بيانات و جلسات التمييز
            </TabsTrigger>
          </TabsList>

          <div className="">
            <TabsContent value="first">
              <FirstDegreeSessions />
            </TabsContent>
            <TabsContent value="appeal">ddddddddddddd</TabsContent>
            <TabsContent value="distinction">eeeeeeeeeeeee</TabsContent>
          </div>
        </Tabs>
      </div>
      <div className="rounded-[12px] border border-[#eeeeee] p-6">
        <HeaderFirstDegreeSessionsTable />
        <FirstDegreeTable />
      </div>
    </div>
  );
};

export default CourtSessions;
