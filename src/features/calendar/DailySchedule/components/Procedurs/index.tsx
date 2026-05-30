import { ar } from "date-fns/locale";
import { format } from "date-fns";
import { HeaderTitle } from "@/shared/components/HeaderTitle";
import { ProceduresCard } from "./components/ProceduresCard";

const mockProcedures = [
  {
    id: "1",
    title: "مراجعة عقد تأسيس",
    type: "مراجعة عقود",
    time: "10:00 صباحاً",
    client: "شركة الأفق للاستثمار",
    location: "المكتب - قاعة الاجتماعات 1",
    status: "قادم",
  },
  {
    id: "2",
    title: "تقديم صحيفة دعوى",
    type: "إجراء قضائي",
    time: "11:30 صباحاً",
    client: "محمد عبدالله",
    location: "المحكمة العامة",
    status: "مكتمل",
  },
  {
    id: "3",
    title: "استخراج صك وكالة",
    type: "توثيق",
    time: "01:00 ظهراً",
    client: "مؤسسة التقنية العالية",
    location: "كتابة العدل",
    status: "قيد التنفيذ",
  },
];

const ProceduresSchedule = ({ selectedDate }: { selectedDate: Date }) => {
  const dateStr = selectedDate
    ? format(selectedDate, "eeee (dd/MM/yyyy)", { locale: ar })
    : "";
  return (
    <div className="space-y-6">
      <HeaderTitle title={`إجراءات يوم ${dateStr}`} />

      <div className="mt-4 grid grid-cols-1 gap-6">
        {mockProcedures.map((proc) => (
          <ProceduresCard proc={proc} key={proc.id} />
        ))}
      </div>
    </div>
  );
};

export default ProceduresSchedule;
