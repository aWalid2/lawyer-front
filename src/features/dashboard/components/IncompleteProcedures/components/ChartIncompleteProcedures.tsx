
import { Card, CardContent } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts'


const chartData = [
    { status: "تأخير في الدفع", total: 12 },
    { status: "نقص توكيل", total: 42 },
    { status: "معلفة", total: 38 },
    { status: "أخري", total: 51 },

]

const chartConfig = {
    total: {
        label: "إجمالي المدفوعات",
        color: "var(--color-primary)",
    },
}


const PRIMARY = "var(--color-primary)"
const PRIMARY_LIGHT = "color-mix(in srgb, var(--color-primary) 40%, transparent)"

interface CustomBarProps {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    index?: number;
}

const CustomBar = (props: CustomBarProps) => {
    const { x, y, width, height, index = 0 } = props
    const fill = index % 2 === 0 ? PRIMARY_LIGHT : PRIMARY

    return (
        <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={fill}
            rx={4}
            ry={4}
        />
    )
}


export const ChartIncompleteProcedures = () => {
    return (

        <div className="h-[400px] w-full mt-4">
            <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="5 5" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="status"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                            dy={10}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#6B7280", fontSize: 12 }}
                            dx={-10}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                            dataKey="total"
                            shape={<CustomBar />}
                            barSize={80}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
    )
}