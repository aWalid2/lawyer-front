import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { EventsGrid } from "./components/EventsGrid";
import { times } from "@/shared/constants/shcedule";

const rowsCount = 18;

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
    <Card>
      <CardHeader>
        <HeaderTitle title={`مواعيد يوم ${dateStr}`} />
      </CardHeader>
      <CardContent className="overflow-x-auto custom-scrollbar">
        <div className="min-w-[2400px] p-6">
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
                <EventsGrid events={events} times={times} />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserTasksSchedule;
