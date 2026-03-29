import React, { useState, useEffect } from "react";
import PageLayout from "@/components/shared/components/PageLayout";
import { HeaderTitle } from "@/components/shared/components/HeaderTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ExpertSessions from "@/features/cases-mangement/sessions/components/ExpertSessions";
import { HeaderSearch } from "@/components/shared/components/HeaderSearch";
import TableCases from "./componnents/tableCases";
import { TableClients } from "./componnents/tableClint";
import { TableLawyers } from "./componnents/lawyers";

const GlobalSearch: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 776);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const orientation = isMobile ? "vertical" : "horizontal";

  return (
    <PageLayout >
      <div className="flex  items-center justify-between mb-6">
        <HeaderTitle title="البحث العام" />
      </div>
      <div  className="mb-6 justify-between items-center flex">
        <HeaderSearch placeholder="ابحث عن قضية، موكل، محامي، خبير، أو جلسة..." className="max-w-full! ms-0! me-0!" 
        onChange={()=> {
          // Handle search input change
        }}
        value=""
        />
        <button className="bg-primary-gradient text-white px-4 py-2 rounded-[12px] text-base font-semibold w-[81px] h-[50px] ">
          بحث
        </button>
      </div>
      <Tabs
        defaultValue="all"
        dir="rtl"
        orientation={orientation}
        className="flex-col"
      >
        <TabsList className="bg-transparent gap-4 p-0 h-auto  flex  justify-center w-full ">
          <TabsTrigger
            value="all"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:text-white data-[state=active]:border-primary-gradient rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
          >
            الكل
          </TabsTrigger>
          <TabsTrigger
            value="cases"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:text-white data-[state=active]:border-primary-gradient rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
          >
           القضايا
          </TabsTrigger>
          <TabsTrigger
            value="clients"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:text-white data-[state=active]:border-primary-gradient rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
          >
           الموكلين
          </TabsTrigger>
          <TabsTrigger
            value="lawyers"
            className="border-primary/40 border text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:text-white data-[state=active]:border-primary-gradient rounded-[12px] px-4 max-w-34 py-2.5 h-auto text-base font-semibold transition-all"
          >
            المحامين
          </TabsTrigger>
        </TabsList>

        <div className="mt-2 sm:mt-6">
          <TabsContent value="all">
          </TabsContent>
          <TabsContent value="cases">
            <TableCases />
          </TabsContent>
          <TabsContent value="clients">
            <TableClients />
          </TabsContent>
          <TabsContent value="lawyers">
            <TableLawyers />
          </TabsContent>
        </div>
      </Tabs>
    </PageLayout>
  );
};

export default GlobalSearch;
