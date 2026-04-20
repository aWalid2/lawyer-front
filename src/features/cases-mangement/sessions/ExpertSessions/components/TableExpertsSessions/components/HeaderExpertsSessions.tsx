

export const HeaderExpertsSessions = ({ handleOpenModal }: { handleOpenModal: () => void }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
      <h1 className="text-xl font-cairo">الخبراء</h1>
      <button
        type="button"
        onClick={handleOpenModal}
        className="flex shrink-0 items-center justify-center gap-2 bg-[#CBA46226] rounded-md w-full sm:w-[180px] md:w-[200px] h-[50px] transition-colors duration-200 px-2 hover:bg-[#CBA46240]"
      >
        <span className="text-[14px] sm:text-[16px] font-medium whitespace-nowrap text-[#CBA462]">+ إضافة خبير</span>
      </button>
    </div>
  )
}