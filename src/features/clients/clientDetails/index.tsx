
import { HeaderUserDetails } from './HeaderUserDetails'
import { Tabs } from '@/components/ui/tabs'
import { TabsList } from '@/components/ui/tabs'
import { TabsTrigger } from '@/components/ui/tabs'
import { TabsContent } from '@/components/ui/tabs'
import { ClientInfo } from './components/ClientInfo'
import { ClientCases } from './components/ClientCases'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useGetClientCases } from './api/hooks/useGetClientCases'
import LoadingPage from '@/shared/components/LoadingPage'
import { Error } from '@/shared/components/Error'

export const ClientDetails = () => {
    const [activeTab, setActiveTab] = useState("cases");
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams<{ id: string }>();
    const { data: clientCases, isPending: isClientCasesPending, isError: isClientCasesError } = useGetClientCases({ id: id! });


    if (isClientCasesPending) {
        return <LoadingPage />
    }
    if (isClientCasesError) {
        return <Error />
    }

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
                    <ClientInfo isEditing={isEditing} clientData={clientCases} />
                </TabsContent>

                <TabsContent value="cases" className="mt-0">
                    <ClientCases clientData={clientCases || []} />
                </TabsContent>
            </Tabs></>
    )
}
