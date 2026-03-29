import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { DayCard } from "./DayCard";

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
const rowsCount = 12;

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
    <Card className="border-none shadow-primary h-full mt-4">
      <CardHeader className="flex flex-row items-center justify-between  pb-4 px-6">
        <HeaderTitle title={`مواعيد يوم ${dateStr}`} />
      </CardHeader>
      <CardContent className="p-0 overflow-x-auto custom-scrollbar">
        <div className="min-w-[800px] p-6">
          {/* Time Headers */}
          <div
            className="grid pb-4 mb-4"
            style={{ gridTemplateColumns: `repeat(${times.length}, 1fr)` }}
          >
            {times.map((time) => (
              <div key={time} className="text-center text-paragraph text-sm font-medium">
                {time}
              </div>
            ))}
          </div>

          {/* Grid Rows (Time Slots) */}
          <div className="relative">
            <div
              className="grid border-l"
              style={{
                gridTemplateColumns: `repeat(${times.length}, 1fr)`,
                gridTemplateRows: `repeat(${rowsCount}, minmax(80px, 1fr))`
              }}
            >
              {Array.from({ length: rowsCount * times.length }).map((_, i) => {
                const rowIndex = Math.floor(i / times.length);
                const isLastRow = rowIndex === rowsCount - 1;

                return (
                  <div
                    key={i}
                    className={`
                      border-r bg-white
                      ${!isLastRow ? "border-b" : ""}
                    `}
                  ></div>
                );
              })}
            </div>

            {/* Events overlay */}
            <div className="absolute inset-0 p-0 pointer-events-none">
              <div
                className="grid h-full w-full relative"
                style={{
                  gridTemplateColumns: `repeat(${times.length}, 1fr)`,
                  gridTemplateRows: `repeat(${rowsCount}, 1fr)`
                }}
              >
                {mockEvents.map((event) => {
                  const colIndex = times.indexOf(event.startTime);
                  if (colIndex === -1) return null;

                  // Find which row this event should occupy if multiple events start at the same time
                  const rowIndex = mockEvents
                    .filter(e => e.startTime === event.startTime)
                    .indexOf(event);

                  return (
                    <DayCard key={event.id} event={event} colIndex={colIndex} rowIndex={rowIndex} />
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
