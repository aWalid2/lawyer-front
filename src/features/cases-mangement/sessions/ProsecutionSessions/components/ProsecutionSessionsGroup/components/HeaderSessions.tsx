import { HeaderTitle } from "@/shared/components/HeaderTitle";

export const HeaderSessions = ({ handleAdd }: { handleAdd: () => void }) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 pb-4 sm:flex-row sm:items-center">
      <HeaderTitle innerPage title="جلسات النيابة العامة" />
      <button
        type="button"
        onClick={handleAdd}
        className="flex h-[50px] w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#CBA46226] px-2 transition-colors duration-200 hover:bg-[#CBA46240] sm:w-[180px] md:w-[200px]"
      >
        <span className="text-[14px] font-medium whitespace-nowrap text-[#CBA462] sm:text-[16px]">
          + إضافة جلسة نيابة
        </span>
      </button>
    </div>
  );
};
