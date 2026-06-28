import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ClientCases } from "./components/ClientCases";
import ClientDetailsInfo from "./components/ClientDetailsInfo";
import { HeaderUserDetails } from "./components/HeaderUserDetails";
import { useGetClient } from "./api/hooks/useGetClient";
import { useParams } from "react-router-dom";
import LoadingPage from "@/shared/components/LoadingPage";
import { Error } from "@/shared/components/Error";
import { ContractDetails } from "./components/ContractDetails";

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
        <TabsList className="border-primary/50 mb-6 flex h-13! w-full items-center overflow-hidden rounded-full border bg-white p-0 max-[786px]:h-auto! max-[786px]:w-full! max-[786px]:flex-col! max-[786px]:rounded-2xl! sm:w-fit">
          <TabsTrigger
            value="info"
            className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white max-[786px]:h-auto! max-[786px]:w-full! max-[786px]:flex-none! max-[786px]:rounded-2xl! max-[786px]:py-3 sm:px-12 sm:text-base"
          >
            معلومات الموكل
          </TabsTrigger>
          <TabsTrigger
            value="cases"
            className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white max-[786px]:h-auto! max-[786px]:w-full! max-[786px]:flex-none! max-[786px]:rounded-2xl! max-[786px]:py-3 sm:px-12 sm:text-base"
          >
            قضايا الموكل
          </TabsTrigger>
          <TabsTrigger
            value="contracts"
            className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white max-[786px]:h-auto! max-[786px]:w-full! max-[786px]:flex-none! max-[786px]:rounded-2xl! max-[786px]:py-3 sm:px-12 sm:text-base"
          >
            عقود الموكل
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-0">
          <ClientDetailsInfo />
        </TabsContent>

        <TabsContent value="cases" className="mt-0">
          <ClientCases />
        </TabsContent>

        <TabsContent value="contracts" className="mt-0">
          <ContractDetails contracts={client?.contracts} clientId={id} />
        </TabsContent>
      </Tabs>
    </>
  );
};
