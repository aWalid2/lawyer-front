import React from 'react'

export const HeaderExpertSessions = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
            <h1 className="text-[18px] font-semibold text-secondary font-cairo">جلسات الخبراء</h1>
            <button
                className="flex items-center justify-center gap-2 bg-[#CBA46226] rounded-md h-12.5 w-full sm:w-auto px-6 transition-colors duration-200 hover:bg-[#CBA46240] text-[#CBA462] font-semibold font-cairo"
            >
                + إضافة جلسة خبراء
            </button>
        </div>
    )
}
