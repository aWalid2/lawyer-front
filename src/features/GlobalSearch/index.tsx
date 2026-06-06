import React, { useState, useEffect, useRef } from "react";
import PageLayout from "@/shared/components/PageLayout";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HeaderSearch } from "@/shared/components/HeaderSearch";
import TableCases from "./componnents/tableCases";
import { TableClients } from "./componnents/tableClient";
import { TableSessions } from "./componnents/Sessions";

const GlobalSearch: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [activeTab, setActiveTab] = useState("cases");
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 776);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const orientation = isMobile ? "vertical" : "horizontal";

  const handleSearch = (value: string) => {
    const trimmed = value.trim();
    if (trimmed) {
      setSubmittedSearch(trimmed);
    }
  };

  const handleButtonClick = () => {
    const input =
      searchContainerRef.current?.querySelector<HTMLInputElement>("input");
    if (input?.value) {
      handleSearch(input.value);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setSubmittedSearch("");
  };

  return (
    <PageLayout>
      <div className="mb-6 flex items-center justify-between">
        <HeaderTitle title="البحث العام" />
      </div>
      <div ref={searchContainerRef} className="mb-6 flex items-center gap-2">
        <HeaderSearch
          placeholder={`${activeTab === "cases" ? "ابحث عن قضية..." : activeTab === "clients" ? "ابحث عن موكل..." : "ابحث عن جلسة..."}`}
          className="ms-0! me-0! max-w-full!"
          onSearch={handleSearch}
        />
        <button
          onClick={handleButtonClick}
          className="bg-primary-gradient h-[50px] w-[81px] shrink-0 rounded-[12px] px-4 py-2 text-base font-semibold text-white"
        >
          بحث
        </button>
      </div>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        dir="rtl"
        orientation={orientation}
        className="flex-col"
      >
        <TabsList className="flex h-auto w-full justify-center gap-4 bg-transparent p-0">
          <TabsTrigger
            value="cases"
            className="border-primary/40 text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:border-primary-gradient h-auto max-w-34 rounded-[12px] border px-4 py-2.5 text-base font-semibold transition-all data-[state=active]:text-white"
          >
            القضايا
          </TabsTrigger>
          <TabsTrigger
            value="clients"
            className="border-primary/40 text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:border-primary-gradient h-auto max-w-34 rounded-[12px] border px-4 py-2.5 text-base font-semibold transition-all data-[state=active]:text-white"
          >
            الموكلين
          </TabsTrigger>
          <TabsTrigger
            value="sessions"
            className="border-primary/40 text-primary/70 data-[state=active]:bg-primary-gradient data-[state=active]:border-primary-gradient h-auto max-w-34 rounded-[12px] border px-4 py-2.5 text-base font-semibold transition-all data-[state=active]:text-white"
          >
            الجلسات
          </TabsTrigger>
        </TabsList>

        <div className="mt-2 sm:mt-6">
          <TabsContent value="cases">
            <TableCases searchTerm={submittedSearch} />
          </TabsContent>
          <TabsContent value="clients">
            <TableClients searchTerm={submittedSearch} />
          </TabsContent>
          <TabsContent value="sessions">
            <TableSessions searchTerm={submittedSearch} />
          </TabsContent>
        </div>
      </Tabs>
    </PageLayout>
  );
};

export default GlobalSearch;
