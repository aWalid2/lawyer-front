import { HeaderTitle } from "@/shared/components/HeaderTitle";

export const HeaderExpertsSessions = ({
  handleOpenModal,
}: {
  handleOpenModal: () => void;
}) => {
  return (
    <div className="flex flex-col items-start justify-between gap-4 pb-4 sm:flex-row sm:items-center">
      <HeaderTitle innerPage title="جلسات الخبراء" />
      <button
        type="button"
        onClick={handleOpenModal}
        className="flex h-12.5 w-full shrink-0 items-center justify-center gap-2 rounded-md bg-[#CBA46226] px-2 transition-colors duration-200 hover:bg-[#CBA46240] sm:w-45 md:w-50"
      >
        <span className="text-[14px] font-medium whitespace-nowrap text-[#CBA462] sm:text-[16px]">
          + إضافة خبير
        </span>
      </button>
    </div>
  );
};
