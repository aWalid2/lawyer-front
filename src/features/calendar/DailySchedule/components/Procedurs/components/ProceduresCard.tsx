import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatusArabic } from "@/shared/utils/getProceduresDescionsArabic";
import { MapPin } from "lucide-react";
import { useState } from "react";
import { ProcedureDetailsDialog } from "./ProcedureDetailsDialog";

interface IProcedure {
  id: number | string;
  title: string;
  type: string;
  client: string;
  location: string;
  status: string;
}

export const ProceduresCard = ({ proc }: { proc: IProcedure }) => {
  const [dialogOpen, setDialogOpen] = useState(false);

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
                <MapPin className="text-primary h-4 w-4" />
              </div>
              <span className="text-foreground/80 font-medium">
                {getStatusArabic(proc.status)}
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
