import { CardFooter } from '@/components/ui/card'

export const DashboardPaymentChartFooter = () => {
    return (
        <CardFooter className="flex-col gap-2 text-sm pt-2 pb-6 px-6">
            {/* Legends */}
            <div className="grid grid-cols-2 gap-y-4 w-full mb-6 mt-2 text-base text-[#4B5675]">
                <div className="flex items-center justify-start sm:justify-center gap-2 pr-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4B5675]"></span>
                    <span>المستلمة</span>
                </div>
                <div className="flex items-center justify-end sm:justify-center gap-2 pl-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F1F1F4]"></span>
                    <span>متأخرة</span>
                </div>
                <div className="flex items-center justify-center gap-2 ">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D1AD61]"></span>
                    <span>قادمة</span>
                </div>
            </div>

            {/* Footer text */}
            <div className="flex items-center justify-center w-full pt-2">
                <div className="flex flex-row items-center gap-1 font-normal text-[#A1A5B7]">
                    <span>نسبة المدفوعات</span>
                    <span className="text-[#3F4254] font-bold">85%</span>
                    <span className="text-[#3F4254] font-bold">مكتملة</span>
                </div>
            </div>
        </CardFooter>
    )
}
