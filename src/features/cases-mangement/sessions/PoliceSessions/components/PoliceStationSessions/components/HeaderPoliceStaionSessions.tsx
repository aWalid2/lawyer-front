import { HeaderTitle } from "@/shared/components/HeaderTitle";

interface HeaderPoliceStaionSessionsProps {
  onAdd: () => void;
}

const HeaderPoliceStaionSessions = ({
  onAdd,
}: HeaderPoliceStaionSessionsProps) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 pb-6 sm:flex-row sm:items-center">
      <HeaderTitle innerPage title="جلسات المخفر" />
      <button
        type="button"
        onClick={onAdd}
        className="font-cairo flex h-12.5 w-full items-center justify-center gap-2 rounded-md bg-[#CBA46226] px-6 font-semibold text-[#CBA462] transition-all duration-200 hover:bg-[#CBA46240] sm:w-auto"
      >
        + إضافة جلسة مخفر
      </button>
    </div>
  );
};

export default HeaderPoliceStaionSessions;
