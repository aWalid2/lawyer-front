
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import { ClientCases } from './components/ClientCases'
import { ClientInfo } from './components/ClientInfo'
import { HeaderUserDetails } from './HeaderUserDetails'

export const ClientDetails = () => {
    const [activeTab, setActiveTab] = useState("cases");
    const [isEditing, setIsEditing] = useState(false);





    return (
        <>      <HeaderUserDetails
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
                    <ClientInfo isEditing={isEditing} />
                </TabsContent>

                <TabsContent value="cases" className="mt-0">
                    <ClientCases />
                </TabsContent>
            </Tabs></>
    )
}
