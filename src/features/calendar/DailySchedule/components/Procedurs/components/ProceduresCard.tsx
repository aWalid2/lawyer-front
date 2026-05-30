import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin, User } from "lucide-react";

interface IProcedure {
  id: string;
  title: string;
  type: string;
  time: string;
  client: string;
  location: string;
  status: string;
}

export const ProceduresCard = ({ proc }: { proc: IProcedure }) => {
  return (
    <Card
      key={proc.id}
      className="border-border/50 transition-all hover:shadow-md"
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-secondary text-xl font-bold">
            {proc.title}
          </CardTitle>
          <div className="flex items-center justify-between pt-2">
            <span
              className={`rounded-md px-2 py-1 text-xs font-bold ${
                proc.status === "مكتمل"
                  ? "bg-green-100 text-green-700"
                  : proc.status === "قيد التنفيذ"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-blue-100 text-blue-700"
              }`}
            >
              {proc.status}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <div className="bg-secondary/5 rounded-md p-2">
              <Clock className="text-primary h-4 w-4" />
            </div>
            <span className="text-foreground/80 font-medium">{proc.time}</span>
          </div>
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <div className="bg-secondary/5 rounded-md p-2">
              <User className="text-primary h-4 w-4" />
            </div>
            <span className="text-foreground/80 font-medium">
              {proc.client}
            </span>
          </div>
          <div className="text-muted-foreground flex items-center gap-3 text-sm">
            <div className="bg-secondary/5 rounded-md p-2">
              <MapPin className="text-primary h-4 w-4" />
            </div>
            <span className="text-foreground/80 font-medium">
              {proc.location}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
