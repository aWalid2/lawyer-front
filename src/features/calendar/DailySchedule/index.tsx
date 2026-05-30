import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProceduresSchedule from "./components/Procedurs";
import UserTasksSchedule from "./components/UserTasksSchedule";
import PageLayout from "@/shared/components/PageLayout";

interface Event {
  id: string;
  title: string;
  lawyer: string;
  location: string;
  startTime: string; // e.g. "10:00"
  endTime: string; // e.g. "11:00"
}

interface DailyScheduleProps {
  selectedDate: Date | undefined;
}

const mockEvents: Event[] = [
  {
    id: "1",
    title: "جلسة رقم : 58780",
    lawyer: "المحامي: بسام أحمد",
    location: "(محكمة المرفأ)",
    startTime: "08:00",
    endTime: "09:00",
  },
  {
    id: "2",
    title: "جلسة رقم : 58780",
    lawyer: "المحامي: بسام أحمد",
    location: "(محكمة المرفأ)",
    startTime: "10:00",
    endTime: "11:00",
  },
  {
    id: "3",
    title: "جلسة رقم : 58780",
    lawyer: "المحامي: بسام أحمد",
    location: "(محكمة المرفأ)",
    startTime: "12:00",
    endTime: "13:00",
  },
  {
    id: "4",
    title: "جلسة رقم : 58780",
    lawyer: "المحامي: بسام أحمد",
    location: "(محكمة المرفأ)",
    startTime: "10:00",
    endTime: "11:00",
  },
];
const DailySchedule = ({ selectedDate }: DailyScheduleProps) => {
  return (
    <PageLayout>
      <Tabs defaultValue={"userTasks"} className="w-full" dir="rtl">
        <TabsList className="border-primary/50 mb-6 flex h-13! w-full items-center overflow-hidden rounded-full border bg-white p-0 sm:w-fit">
          <TabsTrigger
            value="procedures"
            className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white sm:px-12 sm:text-base"
          >
            الإجراءات
          </TabsTrigger>
          <TabsTrigger
            value="userTasks"
            className="data-[state=active]:bg-primary-gradient! text-secondary/60 h-full rounded-full bg-transparent px-3 text-sm font-bold transition-all data-[state=active]:text-white sm:px-12 sm:text-base"
          >
            المهام
          </TabsTrigger>
        </TabsList>

        <TabsContent value="procedures" className="mt-0">
          <ProceduresSchedule selectedDate={selectedDate!} />
        </TabsContent>

        <TabsContent value="userTasks" className="mt-0">
          <UserTasksSchedule selectedDate={selectedDate!} events={mockEvents} />
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default DailySchedule;
