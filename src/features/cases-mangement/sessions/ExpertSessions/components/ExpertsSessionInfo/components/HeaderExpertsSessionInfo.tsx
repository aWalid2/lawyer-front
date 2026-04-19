import Frame from "@/public/images/Frame.svg";
import React from "react";

interface HeaderExpertsSessionInfoProps {
    handleEditClick: () => void;
}

export const HeaderExpertsSessionInfo: React.FC<HeaderExpertsSessionInfoProps> = ({ handleEditClick }) => {
    return (
        <div className="flex justify-between items-center pb-8">
            <h1 className="text-xl font-cairo">بيانات الخبراء</h1>

            <button
                type="button"
                onClick={handleEditClick}
                className="flex shrink-0 items-center justify-center gap-2 bg-[#F1F1F3] rounded-md w-[114px] h-[50px] hover:bg-[#E1E1E6] transition-colors duration-200 px-2 sm:w-auto sm:px-4"
            >
                <img src={Frame} alt="" className="w-5 h-5 sm:w-4 sm:h-4" />
                <span className="text-[16px] font-medium whitespace-nowrap">
                    تعديل
                </span>
            </button>
        </div>
    );
};