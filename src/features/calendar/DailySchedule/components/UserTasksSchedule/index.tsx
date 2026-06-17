import { HeaderTitle } from "@/shared/components/Header/HeaderTitle";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { TasksCard } from "./components/TasksCard";
import { EmptyTable } from "@/shared/components/EmptyTable";
import type { AgendaTask } from "@/features/calendar/api/services/agendaTypes";

const UserTasksSchedule = ({
  selectedDate,
  tasks,
}: {
  selectedDate: Date;
  tasks: AgendaTask[];
}) => {
  const dateStr = selectedDate
    ? format(selectedDate, "eeee (dd/MM/yyyy)", { locale: ar })
    : "";

  if (tasks.length === 0)
    return (
      <div>
        <HeaderTitle title={`مهام يوم ${dateStr}`} />
        <EmptyTable message={`لا توجد مهام ليوم ${dateStr}`} />
      </div>
    );
  return (
    <div className="space-y-6">
      <HeaderTitle title={`مهام يوم ${dateStr}`} />

      <div className="mt-4 grid grid-cols-1 gap-6">
        {tasks.map((task) => (
          <TasksCard task={task} key={task.id} />
        ))}
      </div>
    </div>
  );
};

export default UserTasksSchedule;
