import { TrendingUp } from 'lucide-react'

export const PieChartTrendingUpIcon = () => {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center -mt-2">
            <div className="w-14 h-14 rounded-full bg-[#F4F0F7] flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#4A2A51]" strokeWidth={2} />
            </div>
        </div>
    )
}
