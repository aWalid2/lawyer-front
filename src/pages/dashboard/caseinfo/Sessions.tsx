import React, { useState, useEffect } from "react";
import PageLayout from "@/shared/components/PageLayout";
import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PoliceSessions from "@/features/cases-mangement/sessions/PoliceSessions";
import CourtSessions from "@/features/cases-mangement/sessions/CourtSessions";
import ExpertSessions from "@/features/cases-mangement/sessions/ExpertSessions";
import OtherSessions from "@/features/cases-mangement/sessions/OtherSessions";
import ProsecutionSessions from "@/features/cases-mangement/sessions/ProsecutionSessions";

const Sessions: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 776);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const orientation = isMobile ? "vertical" : "horizontal";

  return (
    <PageLayout innerPage>
      <div className="mb-6 flex items-center justify-between">
        <HeaderTitle title="إدارة الجلسات" />
      </div>

      <Tabs
        defaultValue="police"
        dir="rtl"
        orientation={orientation}
        className="flex-col"
      >
        <TabsList className="h-auto flex-wrap justify-start gap-4 bg-transparent p-0">
          <TabsTrigger
            value="police"
            className="border-primary/40 text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:border-primary-gradient rounded-main h-auto max-w-34 border px-4 py-2.5 text-base font-semibold transition-all data-[state=active]:text-white"
          >
            جلسات المخفر
          </TabsTrigger>
          <TabsTrigger
            value="prosecution"
            className="border-primary/40 text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:border-primary-gradient rounded-main h-auto max-w-34 border px-4 py-2.5 text-base font-semibold transition-all data-[state=active]:text-white"
          >
            جلسات النيابة
          </TabsTrigger>
          <TabsTrigger
            value="court"
            className="border-primary/40 text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:border-primary-gradient rounded-main h-auto max-w-34 border px-4 py-2.5 text-base font-semibold transition-all data-[state=active]:text-white"
          >
            جلسات المحكمة
          </TabsTrigger>
          <TabsTrigger
            value="experts"
            className="border-primary/40 text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:border-primary-gradient rounded-main h-auto max-w-34 border px-4 py-2.5 text-base font-semibold transition-all data-[state=active]:text-white"
          >
            الخبراء
          </TabsTrigger>
          <TabsTrigger
            value="other"
            className="border-primary/40 text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:border-primary-gradient rounded-main h-auto max-w-34 border px-4 py-2.5 text-base font-semibold transition-all data-[state=active]:text-white"
          >
            إدارية أخرى
          </TabsTrigger>
        </TabsList>

        <div className="mt-2 sm:mt-6">
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
