interface HeaderSectionProps {
    title: string;
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
            return "bg-gray-100 text-gray-700 border-gray-200";
    }
};

export default function HeaderSection({ title, status }: HeaderSectionProps) {
    return (
        <div className="flex items-center justify-between w-full border border-[#D9D9D9] rounded-2xl mt-8 px-6 h-[82px]">
            <h1 className="font-bold text-lg max-sm:text-[10px] flex shrink-0">
                {title}
            </h1>
            <button className={`w-[104px] h-[34px] max-sm:w-[80px] max-sm:h-[30px] max-sm:text-[10px] rounded-2xl ${getStatusStyle(status)}`}>
                {status}
            </button>
        </div>
    );
}