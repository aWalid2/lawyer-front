import { ActiveCaseIcon } from "@/shared/icons/ActiveCase";
import { SettingsLawIcon } from "@/shared/icons/SettingsLaw";
import { TextIcon } from "@/shared/icons/Text";
import { Users2 } from "lucide-react";
import { DashboardStatsCard } from "./components/DashboardStatsCard";
import { useGetCasesCount } from "./api/hooks/useGetCasesCount";
import { useGetNotCompleteProcedures } from "./api/hooks/useGetNotCompleteProcedures";
import { useGetNotCompleteTasks } from "./api/hooks/useGetNotCompleteTasks";
import { useGetClientCounts } from "./api/hooks/useGetClientCounts";

const DashboardStats = () => {
  const { data: casesCount } = useGetCasesCount();
  const { data: clientCounts } = useGetClientCounts();
  const { data: notCompleteTasks } = useGetNotCompleteTasks();
  const { data: notCompleteProcedures } = useGetNotCompleteProcedures();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <DashboardStatsCard
        title="عدد قضايا المكتب"
        count={casesCount || 0}
        icon={<ActiveCaseIcon className="text-[#11B324]" />}
        iconBg="bg-[#11B324]/20"
      />
      <DashboardStatsCard
        title="عدد الموكلين"
        count={clientCounts || 0}
        icon={<Users2 className="text-secondary" />}
        iconBg="bg-secondary/10"
      />
      <DashboardStatsCard
        title="اجراءات قيد التنفيذ"
        count={notCompleteProcedures || 0}
        icon={<TextIcon className="text-[#5570F1]" />}
        iconBg="bg-[#5570F1]/20"
      />
      <DashboardStatsCard
        title="المهام غير المكتملة"
        count={notCompleteTasks || 0}
        icon={<SettingsLawIcon className="text-primary" />}
        iconBg="bg-primary/20"
      />
    </div>
  );
};

export default DashboardStats;
