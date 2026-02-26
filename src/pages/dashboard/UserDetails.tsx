
import React from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { ClientCases } from "@/features/clients/components/clientDetails/components/ClientCases";
import { ClientInfo } from "@/features/clients/components/clientDetails/components/ClientInfo";
import { HeaderUserDetails } from "@/features/clients/components/clientDetails/components/HeaderUserDetails";
import PageLayout from "@/components/shared/components/PageLayout";

const UserDetails: React.FC = () => {

  return (

        <PageLayout>
      <HeaderUserDetails />

        <Tabs defaultValue="cases" className="w-full" dir="rtl">
    
            <TabsList className="bg-white rounded-full flex items-center border h-13! border-primary/50 p-0 overflow-hidden mb-6">
              <TabsTrigger
                value="info"
                className="rounded-full px-12 h-full data-[state=active]:bg-primary-gradient! data-[state=active]:text-white bg-transparent transition-all text-secondary/60 font-bold"
              >
                معلومات الموكل
              </TabsTrigger>
              <TabsTrigger
                value="cases"
                className="rounded-full px-12 h-full data-[state=active]:bg-primary-gradient! data-[state=active]:text-white bg-transparent transition-all text-secondary/60 font-bold"
              >
                قضايا الموكل
              </TabsTrigger>
            </TabsList>
          

          <TabsContent value="info" className="mt-0">
            <ClientInfo />
          </TabsContent>

          <TabsContent value="cases" className="mt-0">
          <ClientCases />
          </TabsContent>
        </Tabs>
      </PageLayout>

  );
};

export default UserDetails;
