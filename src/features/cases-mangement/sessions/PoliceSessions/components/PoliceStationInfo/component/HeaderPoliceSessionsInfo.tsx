
import { EditIcon } from "@/shared/icons/Edit";
export const HeaderPoliceSessionsInfo = ({ handleAddClick, handleEditClick, hasData }: { handleAddClick: () => void, handleEditClick: () => void, hasData: boolean }) => {
    return (
        <div className="flex justify-between items-center pb-8">
            <h1 className="text-xl font-cairo">بيانات المخفر</h1>
            <div className="flex gap-3">
                {!hasData && (
                    <button
                        type="button"
                        onClick={handleAddClick}
                        className="flex shrink-0 items-center justify-center gap-2 bg-[#CBA46226] rounded-md w-[114px] h-[50px] hover:bg-[#CBA46240] transition-colors duration-200 px-2 sm:w-auto sm:px-4"
                    >
                        <span className="text-[16px] font-medium whitespace-nowrap text-[#CBA462]">
                            + إضافة
                        </span>
                    </button>
                )}

                {hasData && (
                    <button
                        type="button"
                        onClick={handleEditClick}
                        className="flex shrink-0 items-center justify-center gap-2 bg-[#F1F1F3] rounded-md w-[114px] h-[50px] hover:bg-[#E1E1E6] transition-colors duration-200 px-2 sm:w-auto sm:px-4"
                    >
                        <EditIcon className="size-3" />
                        <span className="text-[16px] font-medium whitespace-nowrap">
                            تعديل
                        </span>
                    </button>
                )}
            </div>
        </div>
    )
}
