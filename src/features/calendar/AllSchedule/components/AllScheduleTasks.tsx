import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Circle, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import type { AgendaTask } from "../../api/services/agendaTypes";
import { useStyleStatus } from "../../DailySchedule/hooks/useStyleStatus";

interface AllScheduleTasksProps {
  tasks: AgendaTask[];
}

const AllScheduleTasks = ({ tasks }: AllScheduleTasksProps) => {
  const navigate = useNavigate();
  const { taskStatusStyles, taskStatusLabels } = useStyleStatus();

  if (tasks.length === 0) {
    return (
      <p className="text-muted-foreground text-center">
        لا توجد مهام لهذا الشهر
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {tasks.map((task) => {
        const statusClass =
          taskStatusStyles[task.status] ||
          "bg-gray-50 text-gray-700 border-gray-200";
        const statusLabel = taskStatusLabels[task.status] || task.status;

        return (
          <Card
            key={task.id}
            className="border-border/50 cursor-pointer transition-all hover:shadow-md"
            onClick={() => navigate(`/dashboard/user-tasks/${task.id}`)}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="text-secondary text-xl font-bold">
                  {task.task_title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {task.delivery_date && (
                  <div className="text-muted-foreground flex items-center gap-3 text-sm">
                    <div className="bg-secondary/5 rounded-md p-2">
                      <Calendar className="text-primary h-4 w-4" />
                    </div>
                    <span className="text-foreground/80 font-medium">
                      {format(new Date(task.delivery_date), "d MMMM yyyy", {
                        locale: ar,
                      })}
                    </span>
                  </div>
                )}
                {task.assigner && (
                  <div className="text-muted-foreground flex items-center gap-3 text-sm">
                    <div className="bg-secondary/5 rounded-md p-2">
                      <User className="text-primary h-4 w-4" />
                    </div>
                    <span className="text-foreground/80 font-medium">
                      {task.assigner}
                    </span>
                  </div>
                )}
                {task.details && (
                  <div className="text-muted-foreground flex items-center gap-3 text-sm">
                    <div className="bg-secondary/5 rounded-md p-2">
                      <MapPin className="text-primary h-4 w-4" />
                    </div>
                    <span className="text-foreground/80 line-clamp-2 font-medium">
                      {task.details}
                    </span>
                  </div>
                )}
                <div className="text-muted-foreground flex items-center gap-3 text-sm">
                  <div className="bg-secondary/5 rounded-md p-2">
                    <Circle className="text-primary h-4 w-4" />
                  </div>
                  <span
                    className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${statusClass}`}
                  >
                    {statusLabel}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default AllScheduleTasks;
