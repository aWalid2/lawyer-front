import React, { useState, useEffect } from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PoliceSessions from "@/features/cases-mangement/sessions/components/PoliceSessions";
import CourtSessions from "@/features/cases-mangement/sessions/components/CourtSessions";
import ExpertSessions from "@/features/cases-mangement/sessions/components/ExpertSessions";
import OtherSessions from "@/features/cases-mangement/sessions/components/OtherSessions";
import ProsecutionSessions from "@/features/cases-mangement/sessions/components/ProsecutionSessions/index";

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
      <div className="flex  items-center justify-between mb-6">
        <HeaderTitle title="إدارة الجلسات" />
      </div>

      <Tabs
        defaultValue="police"
        dir="rtl"
        orientation={orientation}
        className="flex-col"
      >
        <TabsList className="bg-transparent gap-4 p-0 h-auto  flex-wrap justify-start">
          <TabsTrigger
            value="police"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:text-white data-[state=active]:border-primary-gradient rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
          >
            جلسات المخفر
          </TabsTrigger>
          <TabsTrigger
            value="prosecution"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:text-white data-[state=active]:border-primary-gradient rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
          >
            جلسات النيابة
          </TabsTrigger>
          <TabsTrigger
            value="court"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:text-white data-[state=active]:border-primary-gradient rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
          >
            جلسات المحكمة
          </TabsTrigger>
          <TabsTrigger
            value="experts"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:text-white data-[state=active]:border-primary-gradient rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
          >
            الخبراء
          </TabsTrigger>
          <TabsTrigger
            value="other"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:text-white data-[state=active]:border-primary-gradient rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
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
