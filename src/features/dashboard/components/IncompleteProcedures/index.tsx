import PageLayout from '@/components/shared/components/PageLayout'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TableIncompleteProcedures } from './components/TableIncompleteProcedures'
import { ChartIncompleteProcedures } from './components/ChartIncompleteProcedures.tsx'

export const IncompleteProcedures = () => {
    return (
        <PageLayout>
            <Tabs
                defaultValue='info'
                className="w-full"
                dir="rtl"

            >
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">الإجراءات الغير مكتملة</h1>

                    <TabsList
                        className="bg-white rounded-full flex items-center border w-full sm:w-fit h-13!
         border-primary/50 p-0 overflow-hidden mb-6"
                    >
                        <TabsTrigger
                            value="info"
                            className="rounded-full text-sm sm:text-base px-3 sm:px-12 h-full data-[state=active]:bg-primary-gradient! data-[state=active]:text-white bg-transparent transition-all text-secondary/60 font-bold"
                        >
                            عرض كجدول
                        </TabsTrigger>
                        <TabsTrigger
                            value="cases"
                            className="rounded-full text-sm sm:text-base px-3 sm:px-12 h-full data-[state=active]:bg-primary-gradient! data-[state=active]:text-white bg-transparent transition-all text-secondary/60 font-bold"
                        >
                            عرض كرسم بياني
                        </TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="info" className="mt-0">
                    <TableIncompleteProcedures />
                </TabsContent>

                <TabsContent value="cases" className="mt-0">
                    <ChartIncompleteProcedures />
                </TabsContent>
            </Tabs>
        </PageLayout>
    )
}
