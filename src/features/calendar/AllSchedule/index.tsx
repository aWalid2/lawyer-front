import { HeaderTitle } from "@/shared/components/HeaderTitle";
import AllScheduleCard from "./components/AllScheduleCard";
import HeaderActions from "./components/HeaderActions";

const MOCK_SCHEDULES = [
  {
    id: 1,
    title: "جلسة محكمة استئناف",
    date: "15 مايو 2024",
    time: "10:00 صباحاً",
    location: "محكمة الرياض الكبرى",
    client: "شركة الأفق للاستثمار",
    type: "جلسة محكمة",
  },
  {
    id: 2,
    title: "اجتماع مع موكل",
    date: "16 مايو 2024",
    time: "01:30 ظهراً",
    location: "مقر المكتب - قاعة الاجتماعات",
    client: "محمد عبدالله",
    type: "اجتماع",
  },
  {
    id: 3,
    title: "تقديم مذكرة دفاع",
    date: "18 مايو 2024",
    time: "09:00 صباحاً",
    location: "المحكمة التجارية",
    client: "مؤسسة التقنية العالية",
    type: "إجراء قانوني",
  },
  {
    id: 4,
    title: "استشارة قانونية",
    date: "20 مايو 2024",
    time: "04:00 عصراً",
    location: "عبر الهاتف",
    client: "سعيد القحطاني",
    type: "استشارة",
  },
];

export const AllScheduleFeatures = () => {
  return (
    <>
      <div className="mb-8 flex w-full items-center justify-between">
        <HeaderTitle innerPage title="جدول المواعيد" />
        <HeaderActions />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {MOCK_SCHEDULES.map((schedule) => (
          <AllScheduleCard key={schedule.id} schedule={schedule} />
        ))}
      </div>
    </>
  );
};
