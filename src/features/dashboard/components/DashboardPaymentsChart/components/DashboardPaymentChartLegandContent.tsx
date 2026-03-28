import type { ChartConfig } from '@/components/ui/chart'

export const DashboardPaymentChartLegandContent = ({ chartConfig }: { chartConfig: ChartConfig }) => {
    return (


        <div className="grid grid-cols-2 gap-y-4 w-full mb-6 mt-2 text-base text-[#4B5675]">

            {Object.entries(chartConfig).map(([key, item]) => (
                <div key={key} className="flex items-center justify-start sm:justify-center gap-2 pr-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span>{item.label}</span>
                </div>
            ))}

        </div>




    )
}
