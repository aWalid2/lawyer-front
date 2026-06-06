import { Card } from "@/components/ui/card";
import { ActiveCaseIcon } from "@/shared/icons/ActiveCase";
import { SettingsLawIcon } from "@/shared/icons/SettingsLaw";
import { TextIcon } from "@/shared/icons/Text";
import { Users2 } from "lucide-react";

const stats = [
  {
    title: "850",
    label: " عدد قضايا المكتب",
    icon: <ActiveCaseIcon className="text-[#11B324]" />,
    bg: "bg-[#11B324]/20",
  },
  {
    title: "45",
    label: "عدد الموكلين  ",
    icon: <Users2 className="text-secondary" />,
    bg: "bg-secondary/10",
  },
  {
    title: "32",
    label: "اجراءات قيد التنفيذ",
    icon: <TextIcon className="text-[#5570F1]" />,
    bg: "bg-[#5570F1]/20",
  },
  {
    title: "23",
    label: "المهام غير المكتملة",
    icon: <SettingsLawIcon className="text-primary" />,
    bg: "bg-primary/20",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="shadow-primary dark:bg-backgroundDark flex w-full flex-row items-center justify-between border-0 p-6"
        >
          <div className="flex flex-col text-left rtl:text-right">
            <span className="text-xl font-semibold sm:text-2xl">
              {stat.title}
            </span>
            <span className="mt-1 text-sm font-normal text-[#4C4F52] sm:text-base">
              {stat.label}
            </span>
          </div>
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full p-3 ${stat.bg}`}
          >
            {stat.icon}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
