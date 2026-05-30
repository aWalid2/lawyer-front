import UserTasksSchedule from "./components/UserTasksSchedule";

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
  return <UserTasksSchedule selectedDate={selectedDate!} events={mockEvents} />;
};

export default DailySchedule;
