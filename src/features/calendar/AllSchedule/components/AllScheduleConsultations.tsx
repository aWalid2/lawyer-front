import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon, Phone, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import type { Consultation } from "@/features/consultations/MainConsultations/types";

interface AllScheduleConsultationsProps {
  consultations: Consultation[];
}

const AllScheduleConsultations = ({
  consultations,
}: AllScheduleConsultationsProps) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {consultations.length === 0 ? (
        <p className="text-muted-foreground col-span-full text-center">
          لا توجد استشارات لهذا الشهر
        </p>
      ) : (
        consultations.map((item) => {
          const clientName = item.client
            ? `${item.client.first_name} ${item.client.last_name || ""}`.trim()
            : "-";

          return (
            <Card
              key={item.id}
              className="border-border/50 cursor-pointer transition-all hover:shadow-md"
              onClick={() => navigate(`/dashboard/consultations/${item.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-secondary text-xl font-bold">
                    {item.consultation_title}
                  </CardTitle>
                  <span className="bg-primary/10 text-primary rounded-full px-2.5 py-0.5 text-xs font-medium">
                    استشارة
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {item.consultation_date && (
                    <div className="text-muted-foreground flex items-center gap-3 text-sm">
                      <div className="bg-secondary/5 rounded-md p-2">
                        <CalendarIcon className="text-primary h-4 w-4" />
                      </div>
                      <span className="text-foreground/80 font-medium">
                        {format(
                          new Date(item.consultation_date),
                          "dd MMMM yyyy",
                          { locale: ar },
                        )}
                      </span>
                    </div>
                  )}
                  <div className="text-muted-foreground flex items-center gap-3 text-sm">
                    <div className="bg-secondary/5 rounded-md p-2">
                      <User className="text-primary h-4 w-4" />
                    </div>
                    <span className="text-foreground/80 font-medium">
                      {clientName}
                    </span>
                  </div>
                  <div className="text-muted-foreground flex items-center gap-3 text-sm">
                    <div className="bg-secondary/5 rounded-md p-2">
                      <Phone className="text-primary h-4 w-4" />
                    </div>
                    <span className="text-foreground/80 font-medium">
                      {item.consultation_type || "-"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default AllScheduleConsultations;
