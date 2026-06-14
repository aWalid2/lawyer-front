import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Circle, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStyleStatus } from "../../DailySchedule/hooks/useStyleStatus";
import { formatDateToYYYYMMDD } from "@/shared/utils";
import { usePagination } from "@/shared/hooks/usePagination";
import { Pagination } from "@/shared/components/Pagination";

interface ProcedureItem {
  id: number | string;
  title: string;
  location: string;
  status: string;
  date: string;
}

interface AllScheduleProceduresProps {
  procedures: ProcedureItem[];
}

const ITEMS_PER_PAGE = 6;

const AllScheduleProcedures = ({ procedures }: AllScheduleProceduresProps) => {
  const navigate = useNavigate();
  const { taskStatusStyles, taskStatusLabels } = useStyleStatus();
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    currentData: paginatedProcedures,
  } = usePagination(procedures, ITEMS_PER_PAGE);

  if (procedures.length === 0) {
    return (
      <p className="text-muted-foreground text-center">
        لا توجد إجراءات لهذا الشهر
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {paginatedProcedures.map((proc) => {
          const statusClass =
            taskStatusStyles[proc.status] ||
            "bg-gray-50 text-gray-700 border-gray-200";
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
                  {proc.date && (
                    <div className="text-muted-foreground flex items-center gap-3 text-sm">
                      <div className="bg-secondary/5 rounded-md p-2">
                        <Calendar className="text-primary h-4 w-4" />
                      </div>
                      <span className="text-foreground/80 font-medium">
                        {formatDateToYYYYMMDD(proc.date)}
                      </span>
                    </div>
                  )}
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
        })}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default AllScheduleProcedures;
