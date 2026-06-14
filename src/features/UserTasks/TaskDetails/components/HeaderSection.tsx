interface HeaderSectionProps {
  status: string;
}

const getStatusStyle = (status: string): string => {
  const statusValue = status.trim();
  switch (statusValue) {
    case "مُنجزة":
      return "bg-[#11B3241A] text-[#0B6E1F] border-[#11B32433]";
    case "متأخرة":
      return "bg-[#C600001A] text-[#C60000] border-[#C6000033]";
    case "قيد التنفيذ":
      return "bg-[#DBC33B1A] text-[#9E7F0F] border-[#DBC33B33]";
    default:
      return "bg-[#FFA50029] text-[#FF8C00] border-[#FFA50033]";
  }
};

export default function HeaderSection({ status }: HeaderSectionProps) {
  return (
    <div className="mt-8 flex h-[82px] w-full items-center justify-between rounded-2xl border border-[#D9D9D9] px-6">
      <h1 className="flex shrink-0 text-lg font-bold max-sm:text-[10px]">
        حالة المهمة
      </h1>
      <button
        className={`h-[34px] w-[104px] rounded-2xl max-sm:h-[30px] max-sm:w-[80px] max-sm:text-[10px] ${getStatusStyle(status)}`}
      >
        {status}
      </button>
    </div>
  );
}
