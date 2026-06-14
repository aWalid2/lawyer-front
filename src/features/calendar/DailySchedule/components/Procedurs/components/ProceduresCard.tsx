import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStyleStatus } from "../../../hooks/useStyleStatus";

interface IProcedure {
  id: number | string;
  title: string;
  type: string;
  client: string;
  location: string;
  status: string;
}

export const ProceduresCard = ({ proc }: { proc: IProcedure }) => {
  const navigate = useNavigate();
  const { taskStatusStyles, taskStatusLabels } = useStyleStatus();
  const statusClass =
    taskStatusStyles[proc.status] || "bg-gray-50 text-gray-700 border-gray-200";
  const statusLabel = taskStatusLabels[proc.status] || proc.status;
  return (
    <Card
      key={proc.id}
      className="border-border/50 cursor-pointer transition-all hover:shadow-md"
      onClick={() => navigate(`/dashboard/user-tasks/${proc.id}`)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-secondary text-xl font-bold">
            {proc.title}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <div className="bg-secondary/5 rounded-md p-2">
              <MapPin className="text-primary h-4 w-4" />
            </div>
            <span className="text-foreground/80 font-medium">
              {proc.location}
            </span>
          </div>
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
};
