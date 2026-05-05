import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ClientCases } from "./components/ClientCases";
import ClientDetailsInfo from "./components/ClientDetailsInfo";
import { HeaderUserDetails } from "./components/HeaderUserDetails";
import { useGetClient } from "./api/hooks/useGetClient";
import { useParams } from "react-router-dom";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";

export const ClientDetails = () => {
  const [activeTab, setActiveTab] = useState("info");
  const { id } = useParams();
  const { data: client, isPending, isError, error } = useGetClient(id!);

  if (isPending) return <LoadingPage />;
  if (isError) return <Error error={error} />;

  return (
    <>
      <HeaderUserDetails activeTab={activeTab} client={client} />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
        dir="rtl"
      >
        <TabsList className="border-primary/50 mb-6 flex h-13! w-full items-center overflow-hidden rounded-full border bg-white p-0 sm:w-fit">
          <TabsTrigger
            value="info"
            className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white sm:px-12 sm:text-base"
          >
            معلومات الموكل
          </TabsTrigger>
          <TabsTrigger
            value="cases"
            className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white sm:px-12 sm:text-base"
          >
            قضايا الموكل
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-0">
          <ClientDetailsInfo />
        </TabsContent>

        <TabsContent value="cases" className="mt-0">
          <ClientCases />
        </TabsContent>
      </Tabs>
    </>
  );
};
