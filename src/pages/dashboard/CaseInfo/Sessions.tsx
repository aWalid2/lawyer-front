import React from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PoliceSessions from "@/features/sessions/components/PoliceSessions";
import ProsecutionSessions from "@/features/sessions/components/ProsecutionSessions";
import CourtSessions from "@/features/sessions/components/CourtSessions";
import ExpertSessions from "@/features/sessions/components/ExpertSessions";
import OtherSessions from "@/features/sessions/components/OtherSessions";

const Sessions: React.FC = () => {
  return (
    <PageLayout innerPage>
      <div className="flex items-center justify-between mb-6">
        <HeaderTitle title="إدارة الجلسات" />
      </div>

      <Tabs
        defaultValue="police"
        dir="rtl"
        className="w-full flex flex-col gap-4"
      >
        <TabsList className="bg-transparent gap-4 p-0 h-auto  flex-wrap justify-start">
          <TabsTrigger
            value="police"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-[#DDB77E] data-[state=active]:text-white data-[state=active]:border-[#DDB77E] rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
          >
            جلسات المخفر
          </TabsTrigger>
          <TabsTrigger
            value="prosecution"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-[#DDB77E] data-[state=active]:text-white data-[state=active]:border-[#DDB77E] rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
          >
            جلسات النيابة
          </TabsTrigger>
          <TabsTrigger
            value="court"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-[#DDB77E] data-[state=active]:text-white data-[state=active]:border-[#DDB77E] rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
          >
            جلسات المحكمة
          </TabsTrigger>
          <TabsTrigger
            value="experts"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-[#DDB77E] data-[state=active]:text-white data-[state=active]:border-[#DDB77E] rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
          >
            الخبراء
          </TabsTrigger>
          <TabsTrigger
            value="other"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-[#DDB77E] data-[state=active]:text-white data-[state=active]:border-[#DDB77E] rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
          >
            إدارية أخرى
          </TabsTrigger>
        </TabsList>

        <div className="mt-20 sm:mt-9 md:mt-3">
          <TabsContent value="police">
            <PoliceSessions />
          </TabsContent>
          <TabsContent value="prosecution">
            <ProsecutionSessions />
          </TabsContent>
          <TabsContent value="court">
            <CourtSessions />
          </TabsContent>
          <TabsContent value="experts">
            <ExpertSessions />
          </TabsContent>
          <TabsContent value="other">
            <OtherSessions />
          </TabsContent>
        </div>
      </Tabs>
    </PageLayout>
  );
};

export default Sessions;
