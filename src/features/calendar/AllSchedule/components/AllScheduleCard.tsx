import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProcedureDetailsDialog } from "../../DailySchedule/components/Procedurs/components/ProcedureDetailsDialog";

interface ScheduleItem {
  id: number | string;
  title: string;
  date: string;
  time: string;
  location: string;
  client: string;
  type: string;
  kind: "task" | "procedure";
}

const AllScheduleCard = ({ schedule }: { schedule: ScheduleItem }) => {
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClick = () => {
    if (schedule.kind === "task") {
      navigate(`/dashboard/user-tasks/${schedule.id}`);
    } else {
      setDialogOpen(true);
    }
  };

  return (
    <>
      <Card
        className="border-border/50 cursor-pointer transition-all hover:shadow-md"
        onClick={handleClick}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <CardTitle className="text-secondary text-xl font-bold">
              {schedule.title}
            </CardTitle>
            <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
              {schedule.type}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="text-muted-foreground flex items-center gap-3 text-sm">
              <div className="bg-secondary/5 rounded-md p-2">
                <CalendarIcon className="text-primary h-4 w-4" />
              </div>
              <span className="text-foreground/80 font-medium">
                {schedule.date}
              </span>
            </div>
            <div className="text-muted-foreground flex items-center gap-3 text-sm">
              <div className="bg-secondary/5 rounded-md p-2">
                <Clock className="text-primary h-4 w-4" />
              </div>
              <span className="text-foreground/80 font-medium">
                {schedule.time}
              </span>
            </div>

            {schedule.location && (
              <div className="text-muted-foreground flex items-center gap-3 text-sm">
                <div className="bg-secondary/5 rounded-md p-2">
                  <MapPin className="text-primary h-4 w-4" />
                </div>
                <span className="text-foreground/80 font-medium">
                  {schedule.location}
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {schedule.kind === "procedure" && (
        <ProcedureDetailsDialog
          procedureId={schedule.id}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </>
  );
};

export default AllScheduleCard;
