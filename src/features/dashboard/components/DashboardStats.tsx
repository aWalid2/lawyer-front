import { ActiveCaseIcon } from "@/shared/icons/ActiveCase";
import { SettingsLawIcon } from "@/shared/icons/SettingsLaw";
import { TextIcon } from "@/shared/icons/Text";
import { WalletIcon } from "@/shared/icons/Wallet";
import { Card } from "@/components/ui/card";

const stats = [
  {
    title: "850",
    label: "القضايا النشطة",
    icon: <ActiveCaseIcon className=" text-[#11B324]" />,
    bg: "bg-[#11B324]/20",
  },
  {
    title: "32",
    label: "المهام قيد التنفيذ",
    icon: <TextIcon className=" text-[#5570F1]" />,
    bg: "bg-[#5570F1]/20",
  },
  {
    title: "23",
    label: "القضايا المعلقة",
    icon: <SettingsLawIcon className=" text-primary" />,
    bg: "bg-primary/20",
  },
  {
    title: "45",
    label: "المدفوعات المتأخرة",
    icon: <WalletIcon className=" text-[#BD4453]" />,
    bg: "bg-[#BD4453]/20",
  },
];

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="flex flex-row items-center justify-between p-6 w-full shadow-primary border-0">
          <div className="flex flex-col text-left rtl:text-right">
            <span className="text-xl sm:text-2xl font-semibold">{stat.title}</span>
            <span className="text-sm sm:text-base text-[#4C4F52] font-normal mt-1">{stat.label}</span>
          </div>
          <div className={`p-3 rounded-full flex items-center justify-center w-12 h-12 ${stat.bg}`}>
            {stat.icon}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats
