import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import { useState } from "react";
import { ProcedureDetailsDialog } from "./ProcedureDetailsDialog";

interface IProcedure {
  id: number | string;
  title: string;
  type: string;
  time: string;
  client: string;
  location: string;
  status: string;
}

export const ProceduresCard = ({ proc }: { proc: IProcedure }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  console.log("Rendering ProceduresCard for:", proc);

  return (
    <>
      <Card
        key={proc.id}
        className="border-border/50 cursor-pointer transition-all hover:shadow-md"
        onClick={() => setDialogOpen(true)}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <CardTitle className="text-secondary text-xl font-bold">
              {proc.title}
            </CardTitle>
            <div className="flex items-center justify-between pt-2">
              <span
                className={`rounded-md px-2 py-1 text-xs font-bold ${
                  proc.status === "مكتمل" || proc.status === "done"
                    ? "bg-green-100 text-green-700"
                    : proc.status === "قيد التنفيذ" ||
                        proc.status === "in_progress"
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
              <span className="text-foreground/80 font-medium">
                {proc.time}
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

      <ProcedureDetailsDialog
        procedureId={proc.id}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};
