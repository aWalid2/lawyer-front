import { ar } from "date-fns/locale";
import { format } from "date-fns";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { ProceduresCard } from "./components/ProceduresCard";
import { EmptyTable } from "@/shared/components/EmptyTable";

interface IProcedure {
  id: number | string;
  title: string;
  type: string;
  time: string;
  client: string;
  location: string;
  status: string;
}

const ProceduresSchedule = ({
  selectedDate,
  procedures,
}: {
  selectedDate: Date;
  procedures: IProcedure[];
}) => {
  const dateStr = selectedDate
    ? format(selectedDate, "eeee (dd/MM/yyyy)", { locale: ar })
    : "";

  if (procedures.length === 0)
    return (
      <div>
        <HeaderTitle title={`إجراءات يوم ${dateStr}`} />
        <EmptyTable message={`لا توجد إجراءات ليوم ${dateStr}`} />;
      </div>
    );
  return (
    <div className="space-y-6">
      <HeaderTitle title={`إجراءات يوم ${dateStr}`} />

      <div className="mt-4 grid grid-cols-1 gap-6">
        {procedures.map((proc) => (
          <ProceduresCard proc={proc} key={proc.id} />
        ))}
      </div>
    </div>
  );
};

export default ProceduresSchedule;
