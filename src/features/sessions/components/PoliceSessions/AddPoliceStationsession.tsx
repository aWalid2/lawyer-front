
import  { useState } from "react";
import edit from '../../../../../public/images/edit.svg';
import deleteIcon from '../../../../../public/images/delete.svg';

// ثوابت الكلاسات (نفس الكلاسات بالضبط)
const CLASSES = {
    inputBase: "w-full border rounded-md p-2 bg-[#FBFBFB]",
    inputMedium: "h-10 md:h-[50px]",
    inputLarge: "h-[50px]",
    inputField: "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px]",
    inputFieldLarge: "w-full border rounded-md p-2 bg-[#FBFBFB] h-[50px]",
    selectTrigger:
        "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px] flex items-center justify-between",
    selectContent: "bg-white z-50 w-full",
    uploadContainer:
        "border border-gray-300 border-dashed border-2 rounded-xl bg-[#FBFBFB] flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition",
    uploadBox: "w-[150px] h-[125px]",
    uploadBoxSmall: "w-24 md:w-[150px] h-24 md:h-[125px]",
    uploadText: "text-sm text-gray-400 flex flex-col gap-2",
    uploadTextSmall:
        "text-xs md:text-sm text-gray-400 flex flex-col gap-1 md:gap-2 px-2",
    fieldWithIcon:
        "w-full border rounded-md p-2 bg-[#FBFBFB] h-10 md:h-[50px] pr-10",
    formSection: "border border-gray-300 p-4 rounded-xl",
    flexRow: "flex flex-col md:flex-row gap-3",
    flexBetween: "flex justify-between items-center",
    sectionPadding: "pt-3 md:pt-5",
    largeSectionPadding: "pt-8 md:pt-14",
    extraLargeSectionPadding: "pt-16",
    labelText: "block mb-5 text-sm",
    sectionTitle: "text-base md:text-lg",
    submitButton:
        "w-full flex items-center gap-2 px-6 py-3 text-white font-cairo rounded-[12px] transition-all whitespace-nowrap w-[137px] h-[50px] justify-center relative overflow-hidden",
};

// واجهة بيانات الجلسات
interface SessionData {
    id: number;
    dateTime: string;
    lawyer: string;
    decision: string;
}

const AddPoliceStationsession = () => {

    // بيانات مؤقتة للجدول
    const [sessionsData] = useState<SessionData[]>([
        {
            id: 1,
            dateTime: "2024-03-15 10:30 ص",
            lawyer: "أحمد محمد",
            decision: "تم التأجيل",
        },
        {
            id: 2,
            dateTime: "2024-03-20 01:00 م",
            lawyer: "محمد علي",
            decision: "تم الحضور",
        },
        {
            id: 3,
            dateTime: "2024-03-25 11:00 ص",
            lawyer: "سارة أحمد",
            decision: "انتظار القرار",
        },
        {
            id: 4,
            dateTime: "2024-03-28 09:00 ص",
            lawyer: "خالد محمود",
            decision: "تم التأجيل",
        },
    ]);

    const getDecisionStyle = (decision: string) => {
        switch (decision) {
            case "تم التأجيل":
                return "";
            case "تم الحضور":
                return "";
            case "انتظار القرار":
                return "";
            default:
                return "";
        }
    };

    return (

        <div className={CLASSES.formSection}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4">
                <h1 className="text-xl font-cairo">جلسات المخفر</h1>
                <button
                    type="button"
                    className="flex shrink-0 items-center justify-center gap-2 bg-[#CBA46226] rounded-md w-full sm:w-[180px] md:w-[200px] h-[50px] transition-colors duration-200 px-2 hover:bg-[#CBA46240]"
                >
                    <span className="text-[14px] sm:text-[16px] font-medium whitespace-nowrap text-[#CBA462]">+ إضافة جلسة مخفر</span>
                </button>
            </div>

            {/* الجدول */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border-r border-[#E6E6E6]">
                    {/* رأس الجدول */}
                    <thead>
                        <tr className="bg-[#FCFCFC] border-b-2 border-[#F1F1F4]">
                            <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] w-[60px]">#</th>
                            <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] w-[200px]">تاريخ ووقت الجلسة</th>
                            <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] w-[200px]">المحامي المسؤول</th>
                            <th className="p-3 text-center text-sm font-semibold text-[#4B5675] border-l border-[#F1F1F4] w-[150px]">قرار الجلسة</th>
                            <th className="p-3 text-center text-sm font-semibold text-[#4B5675] w-[150px]">الإجراءات</th>
                        </tr>
                    </thead>

                    {/* جسم الجدول */}
                    <tbody>
                        {sessionsData.map((session, index) => (
<tr
    key={session.id}
    className="cursor-pointer transition-colors bg-white border-b border-gray-200 hover:bg-gray-50"
>
    <td className="text-gray-600 border-l border-gray-200 text-center p-3 whitespace-nowrap">
        {index + 1}
    </td>
    <td className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base text-gray-600 border-l border-gray-200 text-center whitespace-nowrap">
        {session.dateTime}
    </td>
    <td className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base font-medium text-gray-800 border-l border-gray-200 text-center whitespace-nowrap">
        {session.lawyer}
    </td>
    <td className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base text-gray-600 border-l border-gray-200 text-center whitespace-nowrap">
        <span className={`inline-flex items-center justify-center px-3 py-1 rounded-lg text-xs md:text-sm whitespace-nowrap ${getDecisionStyle(session.decision)}`}>
            {session.decision}
        </span>
    </td>
    <td className="p-1.5 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base">
        <div className="flex items-center justify-center gap-2 md:gap-3 flex-nowrap">
            <button title="تعديل" className="hover:scale-110 transition shrink-0">
                <img src={edit} alt="edit" className="max-sm:w-5  max-sm:h-5  max-md:w-5 max-md:h-5" />
            </button>
            <button title="حذف" className="hover:scale-110 transition shrink-0">
                <img src={deleteIcon} alt="delete" className="max-sm:w-5 max-sm:h-5 max-md:w-5 max-md:h-5" />
            </button>
        </div>
    </td>
</tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* رسالة إذا كانت البيانات فارغة */}
            {sessionsData.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                    لا توجد جلسات لعرضها
                </div>
            )}
        </div>
    );
};

export default AddPoliceStationsession;