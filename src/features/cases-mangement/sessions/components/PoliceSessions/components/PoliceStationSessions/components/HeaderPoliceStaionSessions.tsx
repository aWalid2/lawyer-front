import React from 'react'

interface HeaderPoliceStaionSessionsProps {
    onAdd: () => void;
}

const HeaderPoliceStaionSessions = ({ onAdd }: HeaderPoliceStaionSessionsProps) => {
    return (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6">
            <h1 className="text-[18px] font-semibold text-secondary font-cairo text-right w-full sm:w-auto">
                جلسات المخفر
            </h1>
            <button
                type="button"
                onClick={onAdd}
                className="flex items-center justify-center gap-2 bg-[#CBA46226] rounded-md h-12.5 w-full sm:w-auto px-6 transition-all duration-200 hover:bg-[#CBA46240] text-[#CBA462] font-semibold font-cairo"
            >
                + إضافة جلسة مخفر
            </button>
        </div>
    )
}

export default HeaderPoliceStaionSessions