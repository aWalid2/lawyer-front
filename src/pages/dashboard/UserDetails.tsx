import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import { ClientCases } from "@/features/clients/components/clientDetails/components/ClientCases";
import { ClientInfo } from "@/features/clients/components/clientDetails/components/ClientInfo";
import { HeaderUserDetails } from "@/features/clients/components/clientDetails/components/HeaderUserDetails";
import PageLayout from "@/components/shared/components/PageLayout";

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState("cases");
  const [isEditing, setIsEditing] = useState(false);

  // Mock data - in a real app, this would be fetched based on 'id'
  const clientData = {
    clientCode: `#${id || "123456"}`,
    clientName: "أحمد محمد علي",
    phone: "123456789",
    countryCode: "+20",
    civilId: "290010100001",
    nationality: "مصري",
    country: "مصر",
    address: "القاهرة، مدينة نصر",
    email: "ahmed@example.com",
    registrationDate: "2024-01-01",
  };

  return (
    <PageLayout>
      <HeaderUserDetails
        activeTab={activeTab}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
        dir="rtl"
      >
        <TabsList
          className="bg-white rounded-full flex items-center border w-full sm:w-fit h-13!
         border-primary/50 p-0 overflow-hidden mb-6"
        >
          <TabsTrigger
            value="info"
            className="rounded-full text-sm sm:text-base px-3 sm:px-12 h-full data-[state=active]:bg-primary-gradient! data-[state=active]:text-white bg-transparent transition-all text-secondary/60 font-bold"
          >
            معلومات الموكل
          </TabsTrigger>
          <TabsTrigger
            value="cases"
            className="rounded-full text-sm sm:text-base px-3 sm:px-12 h-full data-[state=active]:bg-primary-gradient! data-[state=active]:text-white bg-transparent transition-all text-secondary/60 font-bold"
          >
            قضايا الموكل
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-0">
          <ClientInfo isEditing={isEditing} clientData={clientData} />
        </TabsContent>

        <TabsContent value="cases" className="mt-0">
          <ClientCases />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default UserDetails;
