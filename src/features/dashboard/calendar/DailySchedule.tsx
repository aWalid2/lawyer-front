import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

interface Event {
  id: string;
  title: string;
  lawyer: string;
  location: string;
  startTime: string; // e.g. "10:00"
  endTime: string;   // e.g. "11:00"
}

interface DailyScheduleProps {
  selectedDate: Date | undefined;
}

const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];

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
  }
];

const DailySchedule = ({ selectedDate }: DailyScheduleProps) => {
  const dateStr = selectedDate ? format(selectedDate, "eeee (dd/MM/yyyy)", { locale: ar }) : "";

  return (
    <Card className="border-none shadow-primary h-full">
      <CardHeader className="flex flex-row items-center justify-between  pb-4 px-6">
        <div className="flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-secondary cursor-pointer" />
          <CardTitle className="text-secondary text-lg font-bold">
            مواعيد يوم {dateStr}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto custom-scrollbar">
        <div className="min-w-[800px] p-6">
          {/* Time Headers */}
          <div className="grid grid-cols-7  pb-4 mb-4">
            {times.map((time) => (
              <div key={time} className="text-center text-paragraph text-sm font-medium">
                {time}
              </div>
            ))}
          </div>

          {/* Grid Rows (Time Slots) */}
          <div className="relative">
            <div className="grid grid-cols-7 grid-rows-8 border-l ">
              {Array.from({ length: 8 * 7 }).map((_, i) => (
                <div key={i} className="border-r border-b h-20 bg-white"></div>
              ))}
            </div>

            {/* Events overlay */}
            <div className="absolute inset-0 p-0 pointer-events-none">
              <div className="grid grid-cols-7 grid-rows-8 h-full w-full relative">
                {mockEvents.map((event) => {
                  const colIndex = times.indexOf(event.startTime);
                  if (colIndex === -1) return null;

                  // Find which row this event should occupy if multiple events start at the same time
                  const rowIndex = mockEvents
                    .filter(e => e.startTime === event.startTime)
                    .indexOf(event);

                  return (
                    <div
                      key={event.id}
                      className="pointer-events-auto bg-[#fdf8f0] border border-primary/10 p-2 flex flex-col justify-center items-center text-center shadow-sm hover:brightness-95 transition-all"
                      style={{
                        gridColumnStart: colIndex + 1,
                        gridRowStart: rowIndex + 1,
                      }}
                    >
                      <h4 className="text-secondary font-bold text-xs mb-1 line-clamp-1">{event.title}</h4>
                      <p className="text-paragraph text-[10px] line-clamp-1">{event.lawyer}</p>
                      <p className="text-paragraph text-[10px] line-clamp-1">{event.location}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DailySchedule;
