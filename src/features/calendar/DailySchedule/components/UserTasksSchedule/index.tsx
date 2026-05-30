import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DayCard } from "../DayCard";
import { format } from "date-fns";
import { ar } from "date-fns/locale";

const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00"];
const rowsCount = 12;

interface Event {
  id: string;
  title: string;
  lawyer: string;
  location: string;
  startTime: string; // e.g. "10:00"
  endTime: string; // e.g. "11:00"
}

const UserTasksSchedule = ({
  selectedDate,
  events,
}: {
  selectedDate: Date;
  events: Event[];
}) => {
  const dateStr = selectedDate
    ? format(selectedDate, "eeee (dd/MM/yyyy)", { locale: ar })
    : "";
  return (
    <Card className="shadow-primary mt-4 h-full border-none">
      <CardHeader className="flex flex-row items-center justify-between px-6 pb-4">
        <HeaderTitle title={`مواعيد يوم ${dateStr}`} />
      </CardHeader>
      <CardContent className="custom-scrollbar overflow-x-auto p-0">
        <div className="min-w-[800px] p-6">
          {/* Time Headers */}
          <div
            className="mb-4 grid pb-4"
            style={{ gridTemplateColumns: `repeat(${times.length}, 1fr)` }}
          >
            {times.map((time) => (
              <div
                key={time}
                className="text-paragraph text-center text-sm font-medium"
              >
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
                gridTemplateRows: `repeat(${rowsCount}, minmax(80px, 1fr))`,
              }}
            >
              {Array.from({ length: rowsCount * times.length }).map((_, i) => {
                const rowIndex = Math.floor(i / times.length);
                const isLastRow = rowIndex === rowsCount - 1;

                return (
                  <div
                    key={i}
                    className={`border-r bg-white ${!isLastRow ? "border-b" : ""} `}
                  ></div>
                );
              })}
            </div>

            {/* Events overlay */}
            <div className="pointer-events-none absolute inset-0 p-0">
              <div
                className="relative grid h-full w-full"
                style={{
                  gridTemplateColumns: `repeat(${times.length}, 1fr)`,
                  gridTemplateRows: `repeat(${rowsCount}, 1fr)`,
                }}
              >
                {events.map((event) => {
                  const colIndex = times.indexOf(event.startTime);
                  if (colIndex === -1) return null;

                  // Find which row this event should occupy if multiple events start at the same time
                  const rowIndex = events
                    .filter((e) => e.startTime === event.startTime)
                    .indexOf(event);

                  return (
                    <DayCard
                      key={event.id}
                      event={event}
                      colIndex={colIndex}
                      rowIndex={rowIndex}
                    />
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

export default UserTasksSchedule;
