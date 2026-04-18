import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useState } from "react";
import { AppealSessions } from "./components/AppealSessions";
import { DistinctionSessions } from "./components/DistinctionSessions";
import { FirstDegreeSessions } from "./components/FirstDegreeSessions";
import { SesstionsFooter } from "./components/SesstionsFooter";
import { HeaderSessions } from "./HeaderSessions";


const CourtSessions: React.FC = () => {
  const [tab, setTab] = useState("first_instance");
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-[#eeeeee]">
        <Tabs
          defaultValue="first_instance"
          dir="rtl"
          className="flex w-full flex-col gap-2"
          onValueChange={(value) => setTab(value)}
        >
          <TabsList className="mb-8 h-auto flex-wrap justify-start gap-4 bg-transparent p-0">
            <TabsTrigger
              value="first_instance"
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
              value="cassation"
              className="data-[state=active]:text-secondary data-[state=active]:border-b-secondary w-fit rounded-none border-b-2 border-transparent bg-transparent px-4 py-2 font-semibold text-[#727272] data-[state=active]:shadow-none!"
            >
              بيانات و جلسات التمييز
            </TabsTrigger>
          </TabsList>

          <div className="">
            <HeaderSessions tab={tab} />
            <TabsContent value="first_instance">
              <FirstDegreeSessions />
            </TabsContent>
            <TabsContent value="appeal">
              <AppealSessions />
            </TabsContent>
            <TabsContent value="cassation">
              <DistinctionSessions />
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <SesstionsFooter tab={tab} />
    </div>
  );
};

export default CourtSessions;
